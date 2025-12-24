<template>
    <GoogleAd adSlot="9507131339" customClass="mb-8" />
    <div class="mx-auto max-w-3xl">
        <div class="relative text-center">
            <h1 class="christmas-stripes-title">{{ $t('page.christmas-quiz.heading') }}</h1>
            <h1 class="christmas-stripes-title-stroke" aria-hidden="true">{{ $t('page.christmas-quiz.heading') }}</h1>
        </div>
        <p class="mb-4 whitespace-pre-wrap">{{ $t("page.christmas-quiz.text") }}</p>
        <Quiz
            :questions="questions"
            :adEvery="5"
            :rankThresholds="rankThresholds"
            :rankLabel="rankLabel"
            :shareTitle="$t('page.christmas-quiz.share.title')"
            :shareTextTemplate="$t('page.christmas-quiz.share.text')"
        >
            <template #progress="{ percentageAnswered }">
                <div
                    class="sticky top-24 max-w-xl mx-auto p-4 bg-red-600 rounded-lg mb-8 z-10 candycane-border outline outline-2">
                    <div class="w-full bg-white h-2 rounded-full outline outline-2">
                        <div class="h-2 rounded-full candycane-progress" :style="{ width: percentageAnswered + '%' }" />
                    </div>
                    <p class="mt-2 text-center text-white">
                        {{ $t("page.idiot_test.progress") }}{{ percentageAnswered }}%
                    </p>
                </div>
            </template>

            <template #question="{ question, index, submitAnswer }">
                <li class="bg-yellow-400 mb-10 border-2 rounded-lg p-2 christmas-border">
                    <div class="relative flex items-start pb-2"
                        :class="{ 'opacity-50': question.isCorrect !== undefined }">
                        <p class="absolute left-0 text-left text-black">{{ index + 1 }}.</p>
                        <p class="pl-8 text-left text-black">
                            {{ question.text }}
                        </p>
                    </div>

                    <div class="answers justify-center gap-2" :class="{
                        'grid grid-cols-1 md:grid-cols-2': (question.options?.length ?? 0) === 2,
                        'grid grid-cols-1 md:grid-cols-3': (question.options?.length ?? 0) === 3,
                        'grid grid-cols-1 md:grid-cols-4': (question.options?.length ?? 0) === 4,
                        'flex flex-wrap': ![2, 3, 4].includes(question.options?.length ?? 0),
                    }">
                        <button v-for="(option, optionIndex) in (question.options ?? [])" :key="optionIndex"
                            class="text-black border-black hover:bg-yellow-600 min-w-0 px-2 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none md:flex-grow"
                            :class="{
                                'bg-green-600': (question.isCorrect && question.answer == String(optionIndex) || !question.isCorrect && (question.correctAnswers?.[0] == String(optionIndex))) && question.isCorrect != undefined,
                                'bg-red-600': !question.isCorrect && question.answer == String(optionIndex) && question.isCorrect != undefined,
                            }" :disabled="question.isCorrect !== undefined"
                            @click="submitAnswer(index, String(optionIndex))">
                            {{ option }}
                        </button>
                    </div>

                    <p v-if="question.isCorrect != undefined" :class="{
                        'text-green-600': question.isCorrect,
                        'text-red-600': !question.isCorrect && question.isCorrect != undefined,
                    }">{{ question.explanation }}</p>
                </li>
            </template>

            <template #infeed-ad>
                <GoogleAd adSlot="1022136650" customClass="mb-10" type="infeed" layoutKey="-fb+5w+4e-db+86" />
            </template>

            <template #results="{ questions: quizQuestions, score, percentageCorrect, rank, shareSupported, share }">
                <section id="results" class="mt-4">
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mb-4">{{ $t("page.christmas-quiz.results") }}</h1>
                    <h3>{{ $t("page.christmas-quiz.score") }}{{ score }} / {{ quizQuestions.length }}</h3>
                    <h3>{{ $t("page.christmas-quiz.percentage") }}{{ percentageCorrect }}%</h3>
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mt-4 mb-6">{{ $t("page.christmas-quiz.rank_title") }}</h1>
                    <div class="bg-red-600 mb-2 rounded-lg p-2 border-8 christmas-border outline-offset-[100px]">
                        <div class="relative">
                            <h1>{{ $t("page.christmas-quiz.rank.name." + rank) }}</h1>
                            <button v-if="shareSupported"
                                class="absolute top-0 right-0 no-outline w-10 h-10 px-2 rounded-lg border-2 text-black border-black bg-yellow-400 hover:bg-yellow-600 hover-lift-button disabled:opacity-50 disabled:pointer-events-none"
                                @click="share()">
                                <IconShare :alt="$t('button.share')" />
                            </button>
                        </div>
                        <h4 class="mb-4">{{ $t("page.christmas-quiz.rank.description." + rank) }}</h4>
                        <img :src="`/images/christmas-quiz/${rank}.jpg`"
                            class="mb-2 rounded-lg w-full center"
                            :alt="$t('page.christmas-quiz.rank.name.' + rank)">
                    </div>
                </section>
            </template>
        </Quiz>
    </div>
    <GoogleAd adSlot="9148038688" customClass="mt-8" />
</template>

<script setup>
definePageMeta({
    title: "page.christmas-quiz.title",
    description: "page.christmas-quiz.description",
    image: "/images/seo/christmas-quiz.jpg"
});

const rankThresholds = {
    4: [100, 100],
    3: [75, 99],
    2: [60, 74],
    1: [25, 59],
    0: [0, 24],
};

const { tm, t, rt } = useI18n();

const rankLabel = (rank) => t("page.christmas-quiz.rank.name." + rank);

const questions = reactive(Object.keys(tm("christmas-quiz.questions")).map((key) =>
{
    return {
        id: key,
        type: "choice",
        text: t(`christmas-quiz.questions.${key}.text`),
        options: toRaw(tm(`christmas-quiz.questions.${key}.answers`)).map(answer => rt(answer)),
        correctAnswers: [t(`christmas-quiz.questions.${key}.correctAnswer`)],
        explanation: t(`christmas-quiz.questions.${key}.explanation`),
    };
}));
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