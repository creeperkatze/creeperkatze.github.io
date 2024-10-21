<template>
    <img src="~/assets/images/LogoBanner.png" width="800" class="center pixelated mb-5">
    <p class="mb-5">
        Hello! I'm Creeperkatze<br>
        A Unity game developer from Germany, with my current big project being Superslide.<br>
        This website is still in early developement, and will change drastically over time.
    </p>
    <h2 class="mb-5">My projects</h2>
    <div class="grid grid-cols-2 gap-2 justify-center bg-center max-w-4xl mx-auto">
        <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2">
            <a href="/superslide">
                <img class="rounded-t-lg" src="~/assets/images/superslide/SplashBackgroundGameTitle.png" alt="SUPERSLIDE" />
            </a>
            <div class="p-5">
                <a href="/superslide">
                    <h3 class="mb-2 font-bold text-white">Superslide</h3>
                </a>
                <p class="mb-3 text-white">Slide through epic levels, spend your time in endless mode and climb the leaderboards!</p>
            </div>
        </div>
        <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                <img class="rounded-t-lg" src="~/assets/images/CardComingSoon.png" alt="Coming Soon"/>
            </a>
            <div class="p-5">
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
                    <h3 class="mb-2 font-bold text-white">Coming Soon</h3>
                </a>
                <p class="mb-3 text-white"></p>
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Home | Creeperkatze',
})
</script>