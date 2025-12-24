<template>
    <div>
        <slot
            name="progress"
            v-if="!allQuestionsAnswered"
            :percentageAnswered="percentageAnswered"
            :answered="answered"
            :total="quizQuestions.length"
        />

        <ul>
            <template v-for="(question, index) in quizQuestions" :key="question.id ?? index">
                <slot
                    name="question"
                    :question="question"
                    :index="index"
                    :checkAnswer="checkAnswer"
                    :submitAnswer="submitAnswer"
                    :registerAnswerEl="registerAnswerEl"
                >
                    <li class="border-2 rounded-lg p-2">
                        <div class="relative flex items-start" :class="{ 'opacity-50': question.isCorrect !== undefined }">
                            <p class="absolute left-0 text-left">{{ index + 1 }}.</p>
                            <p class="pl-8 text-left">
                                {{ question.text }}
                            </p>
                        </div>

                        <div v-if="question.type === 'input'" class="answers flex flex-shrink justify-center gap-2">
                            <input
                                :ref="(el) => registerAnswerEl(index, el)"
                                v-model="question.answer"
                                type="text"
                                :placeholder="question.placeholder ?? props.inputPlaceholder"
                                class="bg-transparent text-white no-outline min-w-0 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                                :disabled="question.isCorrect !== undefined"
                                @keydown.enter="checkAnswer(index)"
                            >
                            <button
                                class="no-outline min-w-0 px-4 rounded-lg border-2 hover-lift-button text-neutral-400 hover:border-white hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                                :disabled="question.isCorrect !== undefined"
                                @click="checkAnswer(index)"
                            >
                                <IconSubmit :alt="props.submitAlt" />
                            </button>
                        </div>

                        <div v-else-if="question.type === 'choice'" class="answers flex flex-wrap justify-center gap-2">
                            <button
                                v-for="(option, optionIndex) in (question.options ?? [])"
                                :key="optionIndex"
                                class="no-outline min-w-0 px-4 pt-2 pb-2 rounded-lg border-2 hover-lift-button text-neutral-400 hover:border-white hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                                :disabled="question.isCorrect !== undefined"
                                @click="submitAnswer(index, String(optionIndex))"
                            >
                                {{ option }}
                            </button>
                        </div>

                        <p v-if="question.isCorrect != undefined">{{ question.explanation }}</p>
                    </li>
                </slot>

                <li v-if="shouldRenderInfeedAd(index)">
                    <slot name="infeed-ad" :index="index" />
                </li>
            </template>
        </ul>

        <slot
            name="results"
            v-if="allQuestionsAnswered"
            :questions="quizQuestions"
            :score="score"
            :answered="answered"
            :percentageAnswered="percentageAnswered"
            :percentageCorrect="percentageCorrect"
            :rank="rank"
            :shareSupported="shareSupported"
            :share="share"
            :calculateRank="calculateRank"
        />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
    questions: {
        type: Array,
        required: true,
    },
    rankThresholds: {
        type: Object,
        default: null,
    },
    rankLabel: {
        type: Function,
        default: null,
    },
    shareTitle: {
        type: String,
        default: '',
    },
    shareTextTemplate: {
        type: String,
        default: '',
    },
    inputPlaceholder: {
        type: String,
        default: '',
    },
    submitAlt: {
        type: String,
        default: '',
    },
    adEvery: {
        type: Number,
        default: 0,
    },
    correctSoundSrc: {
        type: String,
        default: '/audio/correct.mp3',
    },
    wrongSoundSrc: {
        type: String,
        default: '/audio/wrong.mp3',
    },
    autoUpdateHashOnComplete: {
        type: Boolean,
        default: true,
    },
    resultsHash: {
        type: String,
        default: '#results',
    },
})

const router = useRouter()

const quizQuestions = reactive([])

const resetQuestions = (questions) =>
{
    quizQuestions.splice(0, quizQuestions.length, ...questions.map((question) => ({
        ...question,
        answer: undefined,
        isCorrect: undefined,
    })))
}

resetQuestions(props.questions)

watch(
    () => props.questions,
    (newQuestions) =>
    {
        resetQuestions(newQuestions)
    },
    { deep: false }
)

const score = computed(() =>
    quizQuestions.reduce((total, question) => total + (question.isCorrect ? 1 : 0), 0)
)

const answered = computed(() =>
    quizQuestions.reduce((total, question) => total + (question.isCorrect !== undefined ? 1 : 0), 0)
)

const percentageAnswered = computed(() =>
{
    const totalQuestions = quizQuestions.length
    return totalQuestions === 0 ? 0 : Math.round((answered.value / totalQuestions) * 100)
})

const percentageCorrect = computed(() =>
{
    const totalQuestions = quizQuestions.length
    return totalQuestions === 0 ? 0 : Math.round((score.value / totalQuestions) * 100)
})

const allQuestionsAnswered = computed(() =>
    quizQuestions.every((question) => question.isCorrect !== undefined)
)

watch(allQuestionsAnswered, (newValue) =>
{
    if (!props.autoUpdateHashOnComplete) return

    if (newValue)
    {
        router.replace({ name: router.currentRoute.name, hash: props.resultsHash })
    }
})

const answerEls = ref([])

const shareSupported = ref(false)

function registerAnswerEl(index, el)
{
    answerEls.value[index] = el || null
}

function shouldRenderInfeedAd(index)
{
    const n = props.adEvery
    if (!n || n <= 0) return false
    if ((index + 1) % n !== 0) return false
    return index !== quizQuestions.length - 1
}

let correctSound
let wrongSound

onMounted(() =>
{
    correctSound = new Audio(props.correctSoundSrc)
    wrongSound = new Audio(props.wrongSoundSrc)

    if (typeof navigator !== 'undefined')
    {
        shareSupported.value = !!navigator.share
    }
})

function calculateRank(percentage)
{
    const thresholds = props.rankThresholds
    if (!thresholds) return 0

    for (const [rank, range] of Object.entries(thresholds))
    {
        const min = Array.isArray(range) ? range[0] : undefined
        const max = Array.isArray(range) ? range[1] : undefined

        if (typeof min !== "number" || typeof max !== "number") continue

        if (percentage >= min && percentage <= max)
        {
            return Number(rank)
        }
    }
    return 0
}

const rank = computed(() => calculateRank(percentageCorrect.value))

function buildShareText()
{
    const template = props.shareTextTemplate
    if (!template) return ''

    const rankValue = rank.value
    const rankText = typeof props.rankLabel === "function"
        ? props.rankLabel(rankValue)
        : String(rankValue)

    return template
        .replace("%rank%", String(rankText))
        .replace("%rankNumber%", String(rankValue))
        .replace("%score%", String(score.value))
        .replace("%questionsLength%", String(quizQuestions.length))
        .replace("%percentage%", String(percentageCorrect.value))
}

const share = async () =>
{
    if (!shareSupported.value) return

    try
    {
        const title = props.shareTitle || undefined
        const text = buildShareText() || undefined
        const url = typeof window !== "undefined"
            ? window.location.href.split('#')[0]
            : undefined

        await navigator.share({ title, text, url })
    } catch (error)
    {
        console.error("Error sharing:", error)
    }
}

function playSound(isCorrect)
{
    const sound = isCorrect ? correctSound : wrongSound
    if (!sound) return

    sound.currentTime = 0
    sound.play()
}

function getCorrectAnswers(question)
{
    if (Array.isArray(question.correctAnswers))
    {
        return question.correctAnswers
    }

    if (question.correctAnswer !== undefined && question.correctAnswer !== null)
    {
        return [String(question.correctAnswer)]
    }

    return []
}

function validateAnswer(userAnswer, correctAnswers)
{
    if (!userAnswer || !correctAnswers || correctAnswers.length === 0)
    {
        return false
    }

    const normalizedInput = String(userAnswer).toLowerCase().trim()

    return correctAnswers.some((correctAnswer) =>
    {
        const normalizedCorrect = String(correctAnswer).toLowerCase().trim()

        if (normalizedInput === normalizedCorrect)
        {
            return true
        }

        if (normalizedCorrect.length > 2 && normalizedInput.includes(normalizedCorrect))
        {
            return true
        }

        return false
    })
}

function focusNextUnanswered(afterIndex)
{
    const nextIndex = quizQuestions.findIndex((question, i) => i > afterIndex && question.isCorrect === undefined)
    if (nextIndex === -1) return

    const el = answerEls.value[nextIndex]
    if (el && typeof el.focus === "function")
    {
        el.focus()
    }
}

function submitAnswer(index, answer)
{
    const question = quizQuestions[index]
    if (!question) return
    if (question.isCorrect !== undefined) return

    question.answer = answer

    const correctAnswers = getCorrectAnswers(question)
    const isCorrect = validateAnswer(answer, correctAnswers)

    question.isCorrect = isCorrect
    playSound(isCorrect)
    focusNextUnanswered(index)
}

function checkAnswer(index)
{
    const question = quizQuestions[index]
    if (!question) return

    submitAnswer(index, question.answer)
}

defineExpose({
    quizQuestions,
    score,
    answered,
    percentageAnswered,
    percentageCorrect,
    allQuestionsAnswered,
    rank,
    calculateRank,
    shareSupported,
    share,
    submitAnswer,
    checkAnswer,
    registerAnswerEl,
    validateAnswer,
})
</script>
