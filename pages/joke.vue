<!--  -->
<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="rounded-lg border-2 p-4 max-w-screen-sm">
            <div v-if="joke" class="mb-4">
                <h1 v-if="joke.type === 'single'">{{ joke.joke }}</h1>
                <div v-else>
                    <h1 class="mb-4">{{ joke.setup }}</h1>
                    <h3>{{ joke.delivery }}</h3>
                </div>
            </div>
            <div v-if="error" class="mb-4">
                <h1 class="text-red-600">{{ error }}</h1>
            </div>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <Button link="/joke" :rainbowBackground="true" buttonTextKey="button.new_joke" @click="getJoke" />
        </div>
        <p class="mb-4">{{ $t("joke.credits_part1") }}<a href='https://sv443.net/jokeapi/v2/' target='_blank'>{{ $t("joke.credits_part2") }}</a></p>
    </div>
</template>


<script setup lang="ts">
useHead({
    title: "Joke | Creeperkatze",
})

useSeoMeta({
    title: "Joke | Creeperkatze",
    ogTitle: "Joke | Creeperkatze",
    twitterTitle: "Joke| Creeperkatze",
    description: "Generate a random joke using JokeAPI.",
    ogDescription: "Generate a random joke using JokeAPI.",
    twitterDescription: "Generate a random joke using JokeAPI.",
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