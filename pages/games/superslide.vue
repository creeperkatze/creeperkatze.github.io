<template>
    <NuxtImg src="/images/superslide/GameTitle1024.png" alt="Superslide"
        class="center mb-5" />
    <div class="center rounded-lg w-full h-full max-h-screen max-w-screen mx-4">
        <div v-if="consent">
            <div v-if="disclaimerVisible">
                <div class="glass-effect center rounded-lg w-full max-w-3xl border-2">
                    <p class="p-4">{{ $t('page.superslide.disclaimer.text') }}</p>
                    <div class="mb-4 center w-64 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black bg-yellow-400 border-black hover:bg-yellow-600 hover:cursor-pointer"
                        @click="acknowledgeDisclaimer">
                        {{ $t("page.superslide.disclaimer.button") }}
                    </div>
                </div>
            </div>
            <iframe v-else frameborder="0" src="https://itch.io/embed-upload/12251132?color=000000" allow="fullscreen"
                class="center max-w-full max-h-full" width="1000" height="600"><a
                    href="https://creeperkatze.itch.io/superslide">Play
                    Superslide
                    on itch.io</a></iframe>
        </div>
        <div v-else>
            <ConsentPanel />
        </div>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'page.superslide.title',
    description: 'page.superslide.description',
    image: '/images/seo/superslide.png'
})

const { consent } = useConsent();
const disclaimerVisible = ref(true);

function acknowledgeDisclaimer()
{
    disclaimerVisible.value = false; // Hide the disclaimer
}
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