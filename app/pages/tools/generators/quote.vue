<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="glass-effect rounded-lg border-2 p-4 max-w-3xl">
            <div class="min-h-40 min-w-64 flex items-center justify-center mx-auto align-middle">
                <figure v-if="quoteData" class="mb-4">
                    <blockquote class="mb-4" :cite="quoteData.sourceLink">
                        <IconQuote class="w-8 h-8 text-gray-400 mb-2" />
                        <h1 class="md:text-4xl text-2xl">{{ quoteData.quote }}</h1>
                    </blockquote>
                    <figcaption>
                        <h2 class="md:text-3xl text-xl">—{{ quoteData.authorName }}</h2>
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
        <p class="my-4">{{ $t("page.quote.credits_part1") }}<a href='https://www.zitat-service.de/' target='_blank'>{{
            $t("page.quote.credits_part2") }}</a></p>
        <GoogleAd adSlot="6271028052" class="mb-8" />   
    </div>
</template>


<script setup>
definePageMeta({
    title: 'page.quote.title',
    description: 'page.quote.description',
    image: '/images/seo/quote.jpg'
});

const { locale } = useI18n();

const quoteData = ref(null);
const error = ref(null);

const fetchQuote = async (lang) =>
{
    quoteData.value = null;
    try
    {
        const data = await $fetch(`https://api.zitat-service.de/v1/quote?language=${encodeURIComponent(lang)}`);
        quoteData.value = data;
    }
    catch (err)
    {
        error.value = (err).message || 'An unknown error occurred.';
        quoteData.value = null;
    }
};

onMounted(() =>
{
    getQuote();
});

const getQuote = async () =>
{
    await fetchQuote(locale.value);
};
</script>