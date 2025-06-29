<template>
    <div class="mx-auto max-w-3xl">
        <div class="relative text-center">
            <h1 class="christmas-stripes-title">{{ $t('page.christmas-quiz.heading') }}</h1>
            <h1 class="christmas-stripes-title-stroke" aria-hidden="true">{{ $t('page.christmas-quiz.heading') }}</h1>
        </div>
        <p class="mb-4 whitespace-pre-wrap">{{ $t("page.christmas-quiz.text") }}</p>
        <div v-if="!allQuestionsAnswered"
            class="sticky top-24 max-w-xl mx-auto p-4 bg-red-600 rounded-lg mb-8 z-10 candycane-border outline outline-2">
            <div class="w-full bg-white h-2 rounded-full outline outline-2">
                <div class="h-2 rounded-full candycane-progress"
                    :style="{ width: percentageAnswered + '%' }" />
            </div>
            <p class="mt-2 text-center text-white">
                {{ $t("page.idiot_test.progress") }}{{ percentageAnswered }}%
            </p>
        </div>
        <ul class="space-y-10">
            <li v-for="(question, index) in questions" :key="index"
                class="bg-yellow-400 border-2 rounded-lg p-2 christmas-border">
                <div class="relative flex items-start pb-2" :class="{ 'opacity-50': question.isCorrect !== undefined }">
                    <p class="absolute left-0 text-left text-black">{{ index + 1 }}.</p>
                    <p class="pl-8 text-left text-black">
                        {{ question.text }}
                    </p>
                </div>
                <div class="answers grid grid-cols-1 md:grid-cols-4 justify-center gap-2">
                    <button
                        class="text-black border-black hover:bg-yellow-600 min-w-0 px-2 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none md:flex-grow"
                        :class="{
                            'bg-green-600': (question.isCorrect && question.answer == '0' || !question.isCorrect && question.correctAnswer == '0') && question.isCorrect != undefined,
                            'bg-red-600': !question.isCorrect && question.answer == '0' && question.isCorrect != undefined,
                        }" :disabled="question.isCorrect !== undefined" @click="checkAnswer(index, '0')">
                        {{ question.answers[0] }}
                    </button>
                    <button
                        class="text-black border-black hover:bg-yellow-600 min-w-0 px-2 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none md:flex-grow"
                        :class="{
                            'bg-green-600': (question.isCorrect && question.answer == '1' || !question.isCorrect && question.correctAnswer == '1') && question.isCorrect != undefined,
                            'bg-red-600': !question.isCorrect && question.answer == '1' && question.isCorrect != undefined,
                        }" :disabled="question.isCorrect !== undefined" @click="checkAnswer(index, '1')">
                        {{ question.answers[1] }}
                    </button>
                    <button
                        class="text-black border-black hover:bg-yellow-600 min-w-0 px-2 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none md:flex-grow"
                        :class="{
                            'bg-green-600': (question.isCorrect && question.answer == '2' || !question.isCorrect && question.correctAnswer == '2') && question.isCorrect != undefined,
                            'bg-red-600': !question.isCorrect && question.answer == '2' && question.isCorrect != undefined,
                        }" :disabled="question.isCorrect !== undefined" @click="checkAnswer(index, '2')">
                        {{ question.answers[2] }}
                    </button>
                    <button
                        class="text-black border-black hover:bg-yellow-600 min-w-0 px-2 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none md:flex-grow"
                        :class="{
                            'bg-green-600': (question.isCorrect && question.answer == '3' || !question.isCorrect && question.correctAnswer == '3') && question.isCorrect != undefined,
                            'bg-red-600': !question.isCorrect && question.answer == '3' && question.isCorrect != undefined,
                        }" :disabled="question.isCorrect !== undefined" @click="checkAnswer(index, '3')">
                        {{ question.answers[3] }}
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
            <h1 class="mb-4">{{ $t("page.christmas-quiz.results") }}</h1>
            <h3>{{ $t("page.christmas-quiz.score") }}{{ score }} / {{ questions.length }}</h3>
            <h3>{{ $t("page.christmas-quiz.percentage") }}{{ percentageCorrect }}%</h3>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mt-4 mb-6">{{ $t("page.christmas-quiz.rank_title") }}</h1>
            <div class="bg-red-600 mb-2 rounded-lg p-2 border-8 christmas-border outline-offset-[100px]">
                <div class="relative">
                    <h1>{{ $t("page.christmas-quiz.rank.name." + rank) }}</h1>
                    <button v-if="shareSupported"
                        class="absolute top-0 right-0 no-outline w-10 h-10 px-2 rounded-lg border-2 text-black border-black bg-yellow-400 hover:bg-yellow-600 hover-lift-button disabled:opacity-50 disabled:pointer-events-none"
                        @click="share">
                        <IconShare :alt="$t('button.share')"/>
                    </button>
                </div>
                <h4 class="mb-4">{{ $t("page.christmas-quiz.rank.description." + rank) }}</h4>
                <img :src="`/images/christmas-quiz/${rank}.jpg`" class="mb-2 rounded-lg w-full center"
                    :alt="$t('page.christmas-quiz.rank.name.' + rank)">
            </div>
        </section>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { filename } from 'pathe/utils'

definePageMeta({
    title: "page.christmas-quiz.title",
    description: "page.christmas-quiz.description",
    image: "/images/seo/christmas-quiz.jpg"
});

const router = useRouter();

const shareSupported = ref(false);

let correctSound;
let wrongSound;

const rankThresholds = {
    4: [100, 100],
    3: [75, 99],
    2: [60, 74],
    1: [25, 59],
    0: [0, 24],
};

onMounted(() => {
    correctSound = new Audio("/audio/correct.mp3");
    wrongSound = new Audio("/audio/wrong.mp3");

    shareSupported.value = !!navigator.share;

    /*

    // Automatically test one rank at a time
    const rankToTest = 4; // Change this value to test different ranks
    const percentage = rankThresholds[rankToTest][0] + 1;
    console.log(`Testing rank ${rankToTest} with percentage ${percentage}`);
    questions.forEach((question, index) => {
        question.isCorrect = index < Math.round((percentage / 100) * questions.length);
    });
    console.log(`Rank: ${rankToTest}, Calculated Rank: ${rank.value}`);

    */
});

const { tm, t, rt } = useI18n();

const questions = reactive(Object.keys(tm('christmas-quiz.questions')).map((key) =>
{
    return {
        text: t(`christmas-quiz.questions.${key}.text`),
        answers: toRaw(tm(`christmas-quiz.questions.${key}.answers`)).map(answer => rt(answer)),
        correctAnswer: t(`christmas-quiz.questions.${key}.correctAnswer`),
        explanation: t(`christmas-quiz.questions.${key}.explanation`),
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

function checkAnswer(index, answer)
{
    let sound;

    questions[index].answer = answer

    if (questions[index].correctAnswer == answer)
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
}

const share = async () =>
{
    try
    {
        const title = t("page.christmas-quiz.share.title");
        const text = t("page.christmas-quiz.share.text")
            .replace("%rank%", t("page.christmas-quiz.rank.name." + rank.value))
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

<style>
.christmas-stripes-title
{
    position: relative;
    background: repeating-linear-gradient(-45deg, rgba(255, 0, 0, 1), rgba(255, 0, 0, 1) 5%, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 1) 10%);
    background-size: 50% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    z-index: 1;
    display: inline-block;
}

.christmas-stripes-title-stroke
{
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    color: black;
    z-index: 0;
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    display: inline-block;
    width: 100%;
    white-space: nowrap;
}

.christmas-border
{
    border: 15px solid transparent;
    border-image: url(/images/christmas-quiz/border.png) 20% round;
    border-image-outset: 8px;
}

.candycane-border
{
    border: 10px solid transparent;
    border-image: url(/images/christmas-quiz/border-candycane.png) 20% round;
    border-image-outset: 1px;
}

.candycane-progress
{
    background-image: url(/images/christmas-quiz/progress-candycane.png);
}
</style>