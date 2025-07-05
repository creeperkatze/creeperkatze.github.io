<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="glass-effect rounded-lg border-2 p-4 max-w-3xl">
            <div class="min-h-40 min-w-64 flex items-center justify-center mx-auto align-middle">
                <figure v-if="quoteData" class="mb-4">
                    <blockquote class="mb-4" :cite="quoteData.sourceLink">
                        <IconQuote class="w-8 h-8 text-gray-400 mb-2" />
                        <h1>{{ quoteData.quote }}</h1>
                    </blockquote>
                    <figcaption>
                        <h2>—{{ quoteData.authorName }}</h2>
                    </figcaption>
                </figure>
                <div v-else>
                    <div v-if="error" class="mb-4">
                        <p v-if="error" class="text-red-600">Error: {{ error }}</p>
                    </div>
                    <IconLoading :alt="$t('page.quote.loading')" class="center w-16" />
                </div>
            </div>
            <hr class="mt-4 mb-4">
            <Button :rainbowBackground="true" @click="getQuote">{{ $t('button.new_quote') }}</Button>
        </div>
        <p class="my-4">{{ $t("page.quote.credits_part1") }}<a href='https://www.zitat-service.de/'
                target='_blank'>{{
                    $t("page.quote.credits_part2") }}</a></p>
    </div>
</template>


<script setup>
definePageMeta({
    title: 'page.quote.title',
    description: 'page.quote.description',
    image: '/images/seo/quote.jpg'
})

const { locale } = useI18n()
const { quoteData, error, fetchQuote } = useQuote();

onMounted(() => {
    getQuote();
});

const getQuote = async () => {
    await fetchQuote(locale.value);
};
</script>