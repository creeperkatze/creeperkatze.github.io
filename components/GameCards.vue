<template>
    <div class="flex justify-center mx-auto flex-col max-w-[940px]">
        <h2 class="text-left mb-2">{{ $t('page.games.subtitle.games') }}</h2>
        <hr class="mb-2">
        <div class="flex flex-wrap flex-row gap-2 justify-center">
            <NuxtLink :to="localePath('/games/superslide/')"
                class="no-underline relative rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                <div class="rounded-lg bg-black max-w-[450px] max-h-[400px] h-full flex flex-col">
                    <img src="~/assets/images/superslide/SplashBackgroundGameTitle.png"
                        class="rounded-t-lg object-cover w-full h-[250px]"
                        :alt="$t('page.superslide.title')">

                    <div v-if="event.name !== 'none'"
                        class="absolute top-1 px-2 py-1 rounded-tl-md rounded-br-md min-w-1/2 pt-2 pb-2 flex justify-between space-x-4 glint overflow-hidden fancy-box-shadow"
                        :style="{ backgroundColor: event.color }">
                        <span class="text-left event-text text-black">{{ $t("superslide.event." + event.name) }}</span>
                        <span class="text-right event-text text-black">{{ countdown }}</span>
                    </div>

                    <div class="p-5">
                        <h3 class="mb-2 font-bold text-white">{{ $t("page.games.project.superslide.title") }}</h3>
                        <p class="mb-3 text-white">{{ $t("page.games.project.superslide.description") }}</p>
                    </div>
                </div>
            </NuxtLink>
            <NuxtLink :to="localePath('/games/flappy-christmas/')"
                class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                <div class="rounded-lg bg-black max-w-[450px] max-h-[400px] h-full flex flex-col">
                    <img src="~/assets/images/flappy-christmas/Cover.png"
                        class="rounded-t-lg object-cover w-full h-[250px]"
                        :alt="$t('page.games.project.flappy_christmas.title')">
                    <div class="p-5">
                        <h3 class="mb-2 font-bold text-white">{{ $t("page.games.project.flappy_christmas.title") }}
                        </h3>
                        <p class="mb-3 text-white">{{ $t("page.games.project.flappy_christmas.description") }}</p>
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const localePath = useLocalePath()

const event = ref({ name: 'none', endTimestamp: null });
const countdown = ref('');

const fetchEventData = async () => {
    let response;

    try {
        response = await fetch('/api/superslide/event');
    } catch (error) {
        console.warn('Superslide API response failed:', error);
        return; // Exit early if the request fails
    }

    try {
        event.value = await response.json();
    }
    catch (error) {
        console.warn('Failed to parse JSON response:', error);
    }
};

// Calculate remaining time
const getCountdown = () => {
    if (event.value.endTimestamp) {
        const now = new Date().getTime();
        const timeLeft = event.value.endTimestamp - now;

        if (timeLeft > 0) {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            return `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
    return '';
};

// Fetch event data and initialize remaining time
onMounted(async () => {
    /*
    await fetchEventData();
    countdown.value = getCountdown();

    // Update the remaining time every second
    setInterval(() =>
    {
        countdown.value = getCountdown();
    });
    */
});
</script>

<style>
.animated-border
{
    background:
        linear-gradient(90deg, black 50%, transparent 0) repeat-x,
        linear-gradient(90deg, black 50%, transparent 0) repeat-x,
        linear-gradient(0deg, black 50%, transparent 0) repeat-y,
        linear-gradient(0deg, black 50%, transparent 0) repeat-y;
    background-size: 16px 4px, 16px 4px, 4px 16px, 4px 16px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    animation: linearGradientMove .3s infinite linear;
}

@keyframes linearGradientMove
{
    100%
    {
        background-position: 16px 0, -16px 100%, 0 -16px, 100% 16px;
    }
}

.fancy-box-shadow
{
    box-shadow: 0px 2px 0 black
}

.glint::before
{
    content: "";
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    rotate: -45deg;
    animation: glint 2s ease-in-out infinite;
}

@keyframes glint
{
    0%
    {
        left: -100%;
        transition-property: left;
    }

    80%,
    100%
    {
        left: 100%;
        transition-property: left;
    }
}
</style>