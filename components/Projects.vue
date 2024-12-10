<template>
    <div class="flex flex-wrap flex-row gap-2 max-w-[940px] mx-auto">
        <NuxtLink :to="localePath('/projects/superslide')"
            class="no-underline relative rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
            <div class="rounded-lg bg-black max-w-[450px] h-[400px]">
                <img src="~/assets/images/superslide/SplashBackgroundGameTitle.png" format="webp" width="450"
                    class="rounded-t-lg object-cover w-full" alt="Superslide">

                <div v-if="event.name !== 'none'"
                    class="absolute top-1 px-2 py-1 rounded-tl-md rounded-br-md min-w-1/2 pt-2 pb-2 flex justify-between space-x-4 glint overflow-hidden fancy-box-shadow"
                    :style="{ backgroundColor: event.color }">
                    <span class="text-left event-text text-black">{{ $t("superslide.event." + event.name) }}</span>
                    <span class="text-right event-text text-black">{{ countdown }}</span>
                </div>

                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Superslide</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.superslide") }}</p>
                </div>
            </div>
        </NuxtLink>
        <NuxtLink :to="localePath('/projects/flappy-christmas')"
            class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
            <div class="rounded-lg bg-black max-w-[450px] h-[400px]">
                <img src="~/assets/images/flappy-christmas/Cover.png" format="webp" width="450"
                    class="rounded-t-lg object-cover w-full" alt="Flappy Christmas">
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Flappy Christmas</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.flappy_christmas") }}</p>
                </div>
            </div>
        </NuxtLink>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank"
            class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
            <div class="rounded-lg bg-black max-w-[450px] h-[400px]">
                <img src="~/assets/images/CardComingSoon.png" format="webp" width="450"
                    class="rounded-t-lg object-cover w-full" alt="Coming Soon">
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">{{ $t("project_descriptions.coming_soon") }}</h3>
                </div>
            </div>
        </a>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const localePath = useLocalePath()

const event = ref({ name: 'none', endTimestamp: null });
const countdown = ref('');

const fetchEventData = async () =>
{
    // Fetch event data on component mount
    const response = await fetch('/api/superslide/event');

    if (!response.ok)
    {
        console.warn(`Superslide API response failed ${response.status}`);
    }
    event.value = await response.json();
}

// Calculate remaining time
const getCountdown = () =>
{
    if (event.value.endTimestamp)
    {
        const now = new Date().getTime();
        const timeLeft = event.value.endTimestamp - now;

        if (timeLeft > 0)
        {
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
onMounted(async () =>
{
    await fetchEventData();
    countdown.value = getCountdown();

    // Update the remaining time every second
    const interval = setInterval(() =>
    {
        countdown.value = getCountdown();
    }, 1000);

    // Clear the interval on component unmount
    onUnmounted(() =>
    {
        clearInterval(interval);
    });
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