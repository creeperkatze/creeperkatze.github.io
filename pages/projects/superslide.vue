<template>
    <NuxtImg src="/images/superslide/GameTitle1024.png" alt="Superslide" format="webp" width="800"
        class="center mb-5" />

    <div v-if="consent" class="center rounded-lg w-full max-w-xl mx-4">
        <iframe frameborder="0"
            src="https://itch.io/embed/2402263?bg_color=ffffff&amp;fg_color=222222&amp;link_color=327345&amp;border_color=bebebe"
            width="552" height="167" class="w-full max-w-xl">
            <a href="https://creeperkatze.itch.io/superslide">Superslide by Creeperkatze</a>
        </iframe>
    </div>

    <div v-else class="mx-4">
        <ConsentPanel />
    </div>
</template>

<script setup lang="ts">

useHead({
    title: 'Superslide | Creeperkatze',
})

useSeoMeta({
    title: "Superslide | Creeperkatze",
    ogTitle: "Superslide | Creeperkatze",
    twitterTitle: "Superslide | Creeperkatze",
    description: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
    ogDescription: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
    twitterDescription: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
    ogImage: "/images/superslide/GameIcon.png",
    twitterImage: "/images/superslide/GameIcon.png",
})

const { consent } = useConsent();

</script>