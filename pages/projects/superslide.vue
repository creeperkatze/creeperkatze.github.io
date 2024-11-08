<!-- eslint-disable vue/no-multiple-template-root -->
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

<style>
/* Keyframes for the flip animation */
@keyframes flip
{
    0%
    {
        transform: rotateX(0);
    }

    50%
    {
        transform: rotateX(-90deg);
    }

    100%
    {
        transform: rotateX(0);
    }
}

/* Custom styles for the flipping effect */
.flip-digit
{
    perspective: 1000px;
}

.flip-inner
{
    position: relative;
    width: 3rem;
    height: 4rem;
    background-color: #f3f4f6;
    /* Tailwind gray-200 */
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #b91c1c;
    /* Tailwind red-700 */
    font-size: 2.5rem;
    font-weight: bold;
    animation: flip 1s ease-in-out infinite;
    backface-visibility: hidden;
    transform-style: preserve-3d;
}

/* Backside of the flip effect */
.flip-inner span
{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.flip-inner .top
{
    z-index: 2;
    transform-origin: 50% 100%;
}

.flip-inner .bottom
{
    z-index: 1;
    transform-origin: 50% 0;
}
</style>