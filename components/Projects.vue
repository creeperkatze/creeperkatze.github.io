<template>
    <div class="flex flex-wrap justify-start gap-4 justify-items-center mx-auto max-w-[1000px]">
        <NuxtLink to="/projects/superslide" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg format="webp" class="rounded-t-lg object-cover w-full"
                    src="/images/superslide/SplashBackgroundGameTitle.png" alt="SUPERSLIDE" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Superslide</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.superslide")}}</p>
                </div>
            </div>
        </NuxtLink>
        <NuxtLink to="/projects/flappy-christmas" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg format="webp" class="rounded-t-lg object-cover w-full"
                    src="/images/flappy-christmas/Cover.png" alt="SUPERSLIDE" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Flappy Christmas</h3>
                    <p class="mb-3 text-white">{{ $t("project_descriptions.flappy_christmas")}}</p>
                </div>
            </div>
        </NuxtLink>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-[400px]">
                <NuxtImg format="webp" class="rounded-t-lg object-cover w-full" src="/images/CardComingSoon.png" alt="Coming Soon" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">{{ $t("project_descriptions.coming_soon")}}</h3>
                </div>
            </div>
        </a>
    </div>
</template>