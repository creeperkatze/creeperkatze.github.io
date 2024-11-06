<template>
    <NuxtImg src="/images/flappy-christmas/FlappyChristmas.png" format="webp" width="800" class="center mb-5" />

    <div v-if="consent" class="center rounded-lg w-full max-w-xl mx-4">
        <iframe frameborder="0"
            src="https://itch.io/embed/2438601?bg_color=FFFFFF&amp;fg_color=ff0000&amp;link_color=f5ce00&amp;border_color=bebebe"
            width="552" height="167"><a href="https://creeperkatze.itch.io/flappy-christmas">Flappy Christmas by
                Creeperkatze</a></iframe>
    </div>

    <div v-else class="mx-4">
        <ConsentPanel />
    </div>
</template>

<script setup lang="ts">

useHead({
    title: 'Flappy Christmas | Creeperkatze',
})

useSeoMeta({
    title: "Flappy Christmas | Creeperkatze",
    ogTitle: "Flappy Christmas | Creeperkatze",
    twitterTitle: "Flappy Christmas | Creeperkatze",
    description: "Jump through the chimneys!",
    ogDescription: "Jump through the chimneys!",
    twitterDescription: "Jump through the chimneys!",
    ogImage: "/images/flappy-christmas/Icon.png",
    twitterImage: "/images/flappy-christmas/Icon.png",
})

const { consent } = useConsent();

</script>