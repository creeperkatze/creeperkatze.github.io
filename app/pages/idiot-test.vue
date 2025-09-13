<template>
    <GoogleAd adSlot="1247762080" adStyle="display:block" :responsive="true" />
    <div class="max-w-screen-md mx-auto">
        <h1>{{ $t("page.idiot_test.heading") }}</h1>
        <p class="mb-4 whitespace-pre-wrap">{{ $t("page.idiot_test.text") }}</p>
        <div v-if="!allQuestionsAnswered"
            class="sticky top-24 max-w-xl mx-auto p-4 glass-effect border-gray-400 border-2 rounded-lg mb-4 z-10">
            <div class="w-full bg-neutral-500 h-2 rounded-full">
                <div class="bg-white h-2 rounded-full" :style="{ width: percentageAnswered + '%' }" />
            </div>
            <p class="mt-2 text-center">
                {{ $t("page.idiot_test.progress") }}{{ percentageAnswered }}%
            </p>
        </div>
        <ul class="space-y-4">
            <li v-for="(question, index) in questions" :key="index" class="border-2 rounded-lg p-2" :class="{
                'border-green-600': question.isCorrect,
                'border-red-600': !question.isCorrect && question.isCorrect != undefined,
            }">
                <div class="relative flex items-start" :class="{ 'opacity-50': question.isCorrect !== undefined }">
                    <p class="absolute left-0 text-left">{{ index + 1 }}.</p>
                    <p class="pl-8 text-left">
                        {{ question.text }}
                    </p>
                </div>
                <div class="answers flex flex-shrink justify-center gap-2">
                    <input v-model="question.answer" type="text" :placeholder="$t('page.idiot_test.input')"
                        class="bg-transparent text-white no-outline min-w-0 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                        :class="{
                        }" :disabled="question.isCorrect !== undefined" @keydown.enter="checkAnswer(index)">
                    <button
                        class="no-outline min-w-0 px-4 rounded-lg border-2 hover-lift-button text-neutral-400 hover:border-white hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                        :disabled="question.isCorrect !== undefined" @click="checkAnswer(index)">
                        <IconSubmit :alt="$t('button.submit')" />
                    </button>
                </div>
                <p v-if="question.isCorrect != undefined" :class="{
                    'text-green-600': question.isCorrect,
                    'text-red-600': !question.isCorrect && question.isCorrect != undefined,
                }">{{ question.explanation }}</p>
            </li>
        </ul>

        <section v-if="allQuestionsAnswered" id="results" class="mt-4">
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mb-4">{{ $t("page.idiot_test.results") }}</h1>
            <h3>{{ $t("page.idiot_test.score") }}{{ score }} / {{ questions.length }}</h3>
            <h3>{{ $t("page.idiot_test.percentage") }}{{ percentageCorrect }}%</h3>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mt-4">{{ $t("page.idiot_test.rank_title") }}</h1>
            <p class="mb-4">{{ $t("page.idiot_test.disclaimer") }}</p>
            <div class="bg-yellow-400 mb-2 rounded-lg p-2 border-2 border-yellow-600">
                <div class="relative">
                    <h1 class="text-black">{{ $t("page.idiot_test.rank.name." + rank) }}</h1>
                    <button v-if="shareSupported"
                        class="absolute top-0 right-0 no-outline w-10 h-10 px-2 rounded-lg border-2 text-black border-black bg-purple-500 hover:bg-purple-700 hover-lift-button disabled:opacity-50 disabled:pointer-events-none"
                        @click="share">
                        <IconShare :alt="$t('button.share')" />
                    </button>
                </div>
                <h4 class="mb-4 text-black">{{ $t("page.idiot_test.rank.description." + rank) }}</h4>
                <img :src="`/images/idiot-test/${rank}.jpg`" class="mb-2 rounded-lg w-full center"
                    :alt="$t('page.idiot_test.rank.name.' + rank)">
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { filename } from 'pathe/utils';

definePageMeta({
    title: "page.idiot_test.title",
    description: "page.idiot_test.description",
    image: "/images/seo/idiot-test.jpg"
});

const router = useRouter();

const shareSupported = ref(false);

let correctSound;
let wrongSound;

onMounted(() =>
{
    correctSound = new Audio("/audio/correct.mp3");
    wrongSound = new Audio("/audio/wrong.mp3");

    shareSupported.value = !!navigator.share;
});

const { tm, t, rt } = useI18n();

const questions = reactive(Object.keys(tm('idiot_test.questions')).map((key) =>
{
    return {
        text: t(`idiot_test.questions.${key}.text`),
        correctAnswers: toRaw(tm(`idiot_test.questions.${key}.correctAnswers`)).map(answer => rt(answer)),
        explanation: t(`idiot_test.questions.${key}.explanation`),
        answer: undefined,
        isCorrect: undefined,
    };
}));

const score = computed(() =>
    questions.reduce((total, question) => total + (question.isCorrect ? 1 : 0), 0)
);

const answered = computed(() =>
    questions.reduce((total, question) => total + (question.isCorrect !== undefined ? 1 : 0), 0)
);

const percentageAnswered = computed(() =>
{
    const totalQuestions = questions.length;
    return totalQuestions === 0 ? 0 : Math.round((answered.value / totalQuestions) * 100);
});

const percentageCorrect = computed(() =>
{
    const totalQuestions = questions.length;
    return totalQuestions === 0 ? 0 : Math.round((score.value / totalQuestions) * 100);
});


const rank = computed(() =>
{
    const percentage = percentageCorrect.value;
    const rankThresholds = {
        4: [100, 100],
        3: [75, 99],
        2: [60, 74],
        1: [25, 59],
        0: [0, 24],
    };

    for (const [rank, [min, max]] of Object.entries(rankThresholds))
    {
        if (percentage >= min && percentage <= max)
        {
            return Number(rank);
        }
    }
    return 0;
});

const allQuestionsAnswered = computed(() =>
    questions.every((question) => question.isCorrect !== undefined)
);

watch(allQuestionsAnswered, (newValue) =>
{
    if (newValue)
    {
        router.replace({ name: router.currentRoute.name, hash: '#results' });
    }
});

function checkAnswer(index)
{
    let sound;

    if (validateAnswer(questions[index].answer, questions[index].correctAnswers))
    {
        questions[index].isCorrect = true;
        sound = correctSound;
    } else
    {
        questions[index].isCorrect = false;
        sound = wrongSound;
    }

    sound.currentTime = 0; // Restart sound
    sound.play();

    const nextIndex = questions.findIndex((question, i) => i > index && question.isCorrect === undefined);
    if (nextIndex !== -1)
    {
        const nextInput = document.querySelectorAll("input")[nextIndex];
        if (nextInput)
        {
            nextInput.focus();
        }
    }
}

function validateAnswer(userAnswer, correctAnswers)
{
    if (!userAnswer || !correctAnswers || correctAnswers.length === 0)
    {
        return false;
    }

    const normalizedInput = userAnswer.toLowerCase().trim();

    return correctAnswers.some(correctAnswer =>
    {
        const normalizedCorrect = correctAnswer.toLowerCase().trim();

        // 1. Exact match (always check for exact match)
        if (normalizedInput === normalizedCorrect)
        {
            console.log("Answer was an exact match");
            return true;
        }

        // 2. Check if normalizedCorrect is contained within normalizedInput
        // Only do this if the correct answer is longer than 2 characters
        if (normalizedCorrect.length > 2 && normalizedInput.includes(normalizedCorrect))
        {
            console.log("Answer was included");
            return true;
        }

        console.log("Answer was not found");
        return false;
    });
}

const share = async () =>
{
    try
    {
        const title = t("page.idiot_test.share.title");
        const text = t("page.idiot_test.share.text")
            .replace("%rank%", t("page.idiot_test.rank.name." + rank.value))
            .replace("%score%", score.value)
            .replace("%questionsLength%", questions.length);
        const url = window.location.href.split('#')[0];

        await navigator.share({
            title: title,
            text: text,
            url: url,
        });

        console.log(`Shared successfully! Title: ${title}, Text: ${text}, URL: ${url}`);
    } catch (error)
    {
        console.error("Error sharing:", error);
    }
};
</script>