<template>
    <GoogleAd adSlot="1247762080" customClass="mb-8" />
    <div class="max-w-screen-md mx-auto">
        <h1>{{ $t("page.idiot_test.heading") }}</h1>
        <p class="mb-4 whitespace-pre-wrap">{{ $t("page.idiot_test.text") }}</p>
        <Quiz :questions="questions" :inputPlaceholder="$t('page.idiot_test.input')" :submitAlt="$t('button.submit')"
            :adEvery="5"
            :rankThresholds="rankThresholds"
            :rankLabel="rankLabel"
            :shareTitle="$t('page.idiot_test.share.title')"
            :shareTextTemplate="$t('page.idiot_test.share.text')">
            <template #progress="{ percentageAnswered }">
                <div
                    class="sticky top-24 max-w-xl mx-auto p-4 glass-effect border-gray-400 border-2 rounded-lg mb-4 z-10">
                    <div class="w-full bg-neutral-500 h-2 rounded-full">
                        <div class="bg-white h-2 rounded-full" :style="{ width: percentageAnswered + '%' }" />
                    </div>
                    <p class="mt-2 text-center">
                        {{ $t("page.idiot_test.progress") }}{{ percentageAnswered }}%
                    </p>
                </div>
            </template>

            <template #question="{ question, index, checkAnswer, registerAnswerEl }">
                <li class="border-2 rounded-lg p-2 mb-5" :class="{
                    'border-green-600 opacity-50': question.isCorrect,
                    'border-red-600 opacity-50': !question.isCorrect && question.isCorrect != undefined,
                }">
                    <div class="relative flex items-start" :class="{ 'opacity-50': question.isCorrect !== undefined }">
                        <p class="absolute left-0 text-left">{{ index + 1 }}.</p>
                        <p class="pl-8 text-left">
                            {{ question.text }}
                        </p>
                    </div>
                    <div class="answers flex flex-shrink justify-center gap-2">
                        <input :ref="(el) => registerAnswerEl(index, el)" v-model="question.answer" type="text"
                            :placeholder="$t('page.idiot_test.input')"
                            class="bg-transparent text-white no-outline min-w-0 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                            :disabled="question.isCorrect !== undefined" @keydown.enter="checkAnswer(index)">
                        <button
                            class="no-outline min-w-0 px-4 rounded-lg border-2 hover:scale-90 text-neutral-400 hover:border-white hover:text-white disabled:opacity-50 disabled:pointer-events-none"
                            :disabled="question.isCorrect !== undefined" @click="checkAnswer(index)">
                            <IconSubmit :alt="$t('button.submit')" />
                        </button>
                    </div>
                    <p v-if="question.isCorrect != undefined" :class="{
                        'text-green-600': question.isCorrect,
                        'text-red-600': !question.isCorrect && question.isCorrect != undefined,
                    }">{{ question.explanation }}</p>
                </li>
            </template>

            <template #infeed-ad>
                <GoogleAd adSlot="7204401620" customClass="mb-5" type="infeed" layout-key="-fb+5w+4e-db+86" />
            </template>

            <template #results="{ questions: quizQuestions, score, percentageCorrect, rank, shareSupported, share }">
                <section id="results" class="mt-4">
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mb-4">{{ $t("page.idiot_test.results") }}</h1>
                    <h3>{{ $t("page.idiot_test.score") }}{{ score }} / {{ quizQuestions.length }}</h3>
                    <h3>{{ $t("page.idiot_test.percentage") }}{{ percentageCorrect }}%</h3>
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mt-4">{{ $t("page.idiot_test.rank_title") }}</h1>
                    <p class="mb-4">{{ $t("page.idiot_test.disclaimer") }}</p>
                    <div class="bg-yellow-400 mb-2 rounded-lg p-2 border-2 border-yellow-600">
                        <div class="relative">
                            <h1 class="text-black">{{ $t("page.idiot_test.rank.name." + rank) }}</h1>
                            <button v-if="shareSupported"
                                class="absolute top-0 right-0 no-outline w-10 h-10 px-2 rounded-lg border-2 text-black border-black bg-purple-500 hover:bg-purple-700 hover-lift-button disabled:opacity-50 disabled:pointer-events-none"
                                @click="share()">
                                <IconShare :alt="$t('button.share')" />
                            </button>
                        </div>
                        <h4 class="mb-4 text-black">{{ $t("page.idiot_test.rank.description." + rank) }}</h4>
                        <img :src="`/images/idiot-test/${rank}.jpg`"
                            class="mb-2 rounded-lg w-full center"
                            :alt="$t('page.idiot_test.rank.name.' + rank)">
                    </div>
                </section>
            </template>
        </Quiz>
    </div>
    <GoogleAd adSlot="1659158767" customClass="mt-8" />
</template>

<script setup>
definePageMeta({
    title: "page.idiot_test.title",
    description: "page.idiot_test.description",
    image: "/images/seo/idiot-test.jpg"
});

const { tm, t, rt } = useI18n();

const rankThresholds = {
    4: [100, 100],
    3: [75, 99],
    2: [60, 74],
    1: [25, 59],
    0: [0, 24],
};

const rankLabel = (rank) => t("page.idiot_test.rank.name." + rank);

const questions = reactive(Object.keys(tm("idiot_test.questions")).map((key) =>
{
    return {
        id: key,
        type: "input",
        text: t(`idiot_test.questions.${key}.text`),
        correctAnswers: toRaw(tm(`idiot_test.questions.${key}.correctAnswers`)).map(answer => rt(answer)),
        explanation: t(`idiot_test.questions.${key}.explanation`),
    };
}));
</script>