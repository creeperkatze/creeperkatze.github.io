<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="glass-effect rounded-lg border-2 p-4 max-w-3xl">
            <div class="min-h-40 min-w-64 flex items-center justify-center mx-auto align-middle">
                <div v-if="jokeData" class="mb-4">
                    <h1 v-if="jokeData.type === 'single'">{{ jokeData.joke }}</h1>
                    <div v-else>
                        <h1 class="md:text-4xl text-2xl mb-4">{{ jokeData.setup }}</h1>
                        <h2 class="md:text-3xl text-xl">{{ jokeData.delivery }}</h2>
                    </div>
                </div>
                <div v-else>
                    <div v-if="error" class="mb-4">
                        <p v-if="error" class="text-red-600">Error: {{ error }}</p>
                    </div>
                    <IconLoading :alt="$t('page.joke.loading')" class="center w-16"/>
                </div>
            </div>
            <hr class="mt-4 mb-4">
            <Button :rainbowBackground="true" @click="getJoke">{{ $t('button.new_joke') }}</Button>
        </div>
        <p class="my-4">{{ $t("page.joke.credits_part1") }}<a href='https://sv443.net/jokeapi/v2/' target='_blank'>{{
            $t("page.joke.credits_part2") }}</a></p>
    </div>
</template>


<script setup>
definePageMeta({
    title: 'page.joke.title',
    description: 'page.joke.description',
    image: '/images/seo/joke.jpg'
})

const { locale } = useI18n()
const { jokeData, error, fetchJoke } = useJoke();

onMounted(() =>
{
    getJoke();
});

const getJoke = async () =>
{
    await fetchJoke(locale.value);
};
</script>