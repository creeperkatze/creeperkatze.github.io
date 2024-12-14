<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="bg-white rounded-lg border-2 p-4 max-w-screen-sm">
            <div class="min-h-40 min-w-64 flex items-center justify-center m-auto align-middle">
                <div v-if="joke" class="mb-4">
                    <h1 v-if="joke.type === 'single'">{{ joke.joke }}</h1>
                    <div v-else>
                        <h1 class="mb-4">{{ joke.setup }}</h1>
                        <h3>{{ joke.delivery }}</h3>
                    </div>
                </div>
                <div v-else>
                    <div v-if="error" class="mb-4">
                        <h1 class="text-red-600">{{ error }}</h1>
                    </div>
                    <img v-else src="~/assets/icons/loading.svg" class="center w-16 center">
                </div>
            </div>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <Button link="/joke" :rainbowBackground="true" @click="getJoke">{{ $t('button.new_joke') }}</Button>
        </div>
        <p class="mb-4">{{ $t("page.joke.credits_part1") }}<a href='https://sv443.net/jokeapi/v2/' target='_blank'>{{
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

const { joke, error, fetchJoke } = useJoke();

onMounted(() =>
{
    getJoke();
});

const getJoke = async () =>
{
    await fetchJoke(locale.value);
};
</script>