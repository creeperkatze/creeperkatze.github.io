<template>
    <NuxtImg src="/images/flappy-christmas/FlappyChristmas.png" alt="Flappy Christmas"
        class="center mb-5" />

    <div v-if="consent" class="border-2 center rounded-lg w-full max-w-xl">
        <iframe frameborder="0"
            src="https://itch.io/embed/2438601?border_width=0&amp;bg_color=464646&amp;fg_color=ffffff&amp;link_color=f5ce00"
            width="572" height="165"><a href="https://creeperkatze.itch.io/flappy-christmas">Flappy Christmas by
                Creeperkatze</a></iframe>
    </div>
    <div v-else class="mx-4">
        <ConsentPanel />
    </div>
</template>

<script setup>
definePageMeta({
    title: 'page.flappy_christmas.title',
    description: 'page.flappy_christmas.description',
    image: '/images/seo/flappy-christmas.png'
})

const { consent } = useConsent();
</script>