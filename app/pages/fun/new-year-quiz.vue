<template>
    <GoogleAd adSlot="1652993368" customClass="mb-8" />
    <div class="mx-auto max-w-3xl">
        <h1 class="mb-2">{{ $t('page.new-year-quiz.heading') }}</h1>
        <p class="mb-4 whitespace-pre-wrap">{{ $t('page.new-year-quiz.text') }}</p>

        <Quiz
            :questions="questions"
            :adEvery="5"
            :rankThresholds="rankThresholds"
            :rankLabel="rankLabel"
            :shareTitle="$t('page.new-year-quiz.share.title')"
            :shareTextTemplate="$t('page.new-year-quiz.share.text')"
        >
            <template #progress="{ percentageAnswered }">
                <div class="sticky top-24 max-w-xl mx-auto p-4 glass-effect border-gray-400 border-2 rounded-lg mb-6 z-10">
                    <div class="w-full bg-neutral-500 h-2 rounded-full">
                        <div class="bg-white h-2 rounded-full" :style="{ width: percentageAnswered + '%' }" />
                    </div>
                    <p class="mt-2 text-center">
                        {{ $t('page.new-year-quiz.progress') }}{{ percentageAnswered }}%
                    </p>
                </div>
            </template>

            <template #question="{ question, index, submitAnswer }">
                <li class="border-2 rounded-lg p-2 mb-5" :class="{
                    'border-green-600 opacity-50': question.isCorrect,
                    'border-red-600 opacity-50': !question.isCorrect && question.isCorrect != undefined,
                }">
                    <div class="relative flex items-start pb-3">
                        <p class="absolute left-0 text-left">{{ index + 1 }}.</p>
                        <p class="pl-8 text-left">
                            {{ question.text }}
                        </p>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <button
                            v-for="(option, optionIndex) in (question.options ?? [])"
                            :key="optionIndex"
                            class="no-outline min-w-0 px-3 py-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none text-neutral-300"
                            :class="{
                                'hover:border-white hover:text-white hover:scale-95': question.isCorrect === undefined,
                                'bg-red-600 text-white': (!question.isCorrect && question.answer == String(optionIndex)) && question.isCorrect !== undefined,
                                'bg-green-600 text-white': (
                                    ((question.isCorrect && question.answer == String(optionIndex)) ||
                                    (!question.isCorrect && (question.correctAnswers?.[0] == String(optionIndex))))
                                ) && question.isCorrect !== undefined,
                            }"
                            :disabled="question.isCorrect !== undefined"
                            @click="submitAnswer(index, String(optionIndex))"
                        >
                            {{ option }}
                        </button>
                    </div>

                    <p
                        v-if="question.isCorrect != undefined"
                        class="mt-3"
                        :class="{
                            'text-green-600': question.isCorrect,
                            'text-red-600': !question.isCorrect,
                        }"
                    >
                        {{ question.explanation }}
                    </p>
                </li>
            </template>

            <template #infeed-ad>
                <GoogleAd adSlot="8026830021" customClass="mb-6" type="infeed" layoutKey="-fb+5w+4e-db+86" />
            </template>

            <template #results="{ questions: quizQuestions, score, percentageCorrect, rank, shareSupported, share }">
                <section id="results" class="mt-4">
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mb-4">{{ $t('page.new-year-quiz.results') }}</h1>
                    <h3>{{ $t('page.new-year-quiz.score') }}{{ score }} / {{ quizQuestions.length }}</h3>
                    <h3>{{ $t('page.new-year-quiz.percentage') }}{{ percentageCorrect }}%</h3>
                    <hr class="rounded border-[1px] mt-4 mb-4">
                    <h1 class="mt-4">{{ $t('page.new-year-quiz.rank_title') }}</h1>
                    <p class="mb-4">{{ $t('page.new-year-quiz.disclaimer') }}</p>
                    <div class="bg-yellow-400 mb-2 rounded-lg p-2 border-2 border-yellow-600">
                        <div class="relative">
                            <h1 class="text-black">{{ $t('page.new-year-quiz.rank.name.' + rank) }}</h1>
                            <button
                                v-if="shareSupported"
                                class="absolute top-0 right-0 no-outline w-10 h-10 px-2 rounded-lg border-2 text-black border-black bg-purple-500 hover:bg-purple-700 hover-lift-button disabled:opacity-50 disabled:pointer-events-none"
                                @click="share()"
                            >
                                <IconShare :alt="$t('button.share')" />
                            </button>
                        </div>
                        <h4 class="mb-4 text-black">{{ $t('page.new-year-quiz.rank.description.' + rank) }}</h4>
                        <img
                            :src="`/images/new-year-quiz/${rank}.jpg`"
                            class="mb-2 rounded-lg w-full center"
                            :alt="$t('page.new-year-quiz.rank.name.' + rank)"
                        >
                    </div>
                </section>
            </template>
        </Quiz>
    </div>
    <GoogleAd adSlot="9339911697" customClass="mt-8" />
</template>

<script setup>
definePageMeta({
    title: 'page.new-year-quiz.title',
    description: 'page.new-year-quiz.description',
    image: '/images/seo/new-year-quiz.jpg',
})

const rankThresholds = {
    4: [100, 100],
    3: [75, 99],
    2: [60, 74],
    1: [25, 59],
    0: [0, 24],
}

const { tm, t, rt } = useI18n()

const rankLabel = (rank) => t('page.new-year-quiz.rank.name.' + rank)

const questions = reactive(Object.keys(tm('new-year-quiz.questions')).map((key) =>
{
    return {
        id: key,
        type: 'choice',
        text: t(`new-year-quiz.questions.${key}.text`),
        options: toRaw(tm(`new-year-quiz.questions.${key}.answers`)).map((answer) => rt(answer)),
        correctAnswers: [t(`new-year-quiz.questions.${key}.correctAnswer`)],
        explanation: t(`new-year-quiz.questions.${key}.explanation`),
    }
}))
</script>
