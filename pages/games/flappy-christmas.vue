<template>
    <img src="~/assets/images/flappy-christmas/FlappyChristmas.png" alt="Flappy Christmas" format="webp" width="800" class="center mb-5">

    <div v-if="consent" class="center rounded-lg w-full max-w-xl mx-4">
        <iframe frameborder="0"
            src="https://itch.io/embed/2438601?bg_color=FFFFFF&amp;fg_color=ff0000&amp;link_color=f5ce00&amp;border_color=bebebe"
            width="552" height="167" class="max-w-full"><a href="https://creeperkatze.itch.io/flappy-christmas">Flappy Christmas by
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