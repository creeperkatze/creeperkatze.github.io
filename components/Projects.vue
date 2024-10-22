<template>
    <div class="grid grid-cols-2 gap-4 justify-items-center mx-auto max-w-[1000px]">
        <NuxtLink to="/superslide" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-full">
                <img class="rounded-t-lg object-cover w-full"
                    src="~/assets/images/superslide/SplashBackgroundGameTitle.png" alt="SUPERSLIDE" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Superslide</h3>
                    <p class="mb-3 text-white">Slide through epic levels, spend your time in endless mode and climb the
                        leaderboards!</p>
                </div>
            </div>
        </NuxtLink>
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" class="no-underline">
            <div class="rounded-lg bg-black transition ease-in-out hover:-translate-y-2 max-w-[450px] h-full">

                <img class="rounded-t-lg object-cover w-full"
                    src="~/assets/images/CardComingSoon.png" alt="Coming Soon" />
                <div class="p-5">
                    <h3 class="mb-2 font-bold text-white">Coming Soon</h3>
                </div>
            </div>
        </a>
    </div>
</template>