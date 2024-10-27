<template>
    <div class="flex flex-wrap flex-row gap-4 max-w-[920px] mx-auto">
        <NuxtLink to="/projects/superslide" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg src="/images/superslide/SplashBackgroundGameTitle.png" format="webp" width="450" class="rounded-t-lg object-cover w-full" alt="Superslide" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Superslide</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.superslide")}}</p>
                </div>
            </div>
        </NuxtLink>
        <NuxtLink to="/projects/flappy-christmas" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg src="/images/flappy-christmas/Cover.png" format="webp" width="450" class="rounded-t-lg object-cover w-full" alt="Flappy Christmas" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Flappy Christmas</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.flappy_christmas")}}</p>
                </div>
            </div>
        </NuxtLink>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg src="/images/CardComingSoon.png" format="webp" width="450" class="rounded-t-lg object-cover w-full" alt="Coming Soon" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">{{ $t("project_descriptions.coming_soon")}}</h3>
                </div>
            </div>
        </a>
    </div>
</template>