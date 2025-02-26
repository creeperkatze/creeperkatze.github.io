<template>
    <div class="flex justify-center mx-auto flex-col max-w-[940px]">
        <h2 class="text-left mb-2 mt-4">{{ $t('page.projects.subtitle.webdev') }}</h2>
        <hr class="mb-2">
        <div class="flex flex-wrap flex-row gap-2 justify-center">
            <NuxtLink :to="localePath('/blog/first-website/')"
                class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                <div class="rounded-lg bg-black max-w-[450px] max-h-[400px] h-full flex flex-col">
                    <img src="~/assets/images/CardWebsite.png" class="rounded-t-lg object-cover w-full h-[250px]"
                        :alt="$t('page.projects.project.website.title')">
                    <div class="p-5">
                        <h3 class="mb-2 font-bold text-white">{{ $t('page.projects.project.website.title') }}</h3>
                        <p class="mb-3 text-white">{{ $t('page.projects.project.website.description') }}</p>
                    </div>
                </div>
            </NuxtLink>
            <div class="grid grid-cols-2 gap-2 w-[465px] h-[415px]">
                <NuxtLink :to="localePath('/idiot-test/')"
                    class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                    <div class="rounded-lg bg-black h-full flex flex-col">
                        <img src="/images/seo/idiot-test.jpg" class="rounded-t-lg object-cover w-full h-[140px]"
                            :alt="$t('page.projects.project.idiot-test.title')">
                        <h5 class="text-white p-2">{{ $t('page.projects.project.idiot-test.title') }}</h5>
                    </div>
                </NuxtLink>
                <NuxtLink :to="localePath('/christmas-quiz/')"
                    class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                    <div class="rounded-lg bg-black h-full flex flex-col">
                        <img src="/images/seo/christmas-quiz.jpg" class="rounded-t-lg object-cover w-full h-[140px]"
                            :alt="$t('page.projects.project.christmas-quiz.title')">
                        <h5 class="text-white p-2">{{ $t('page.projects.project.christmas-quiz.title') }}</h5>
                    </div>
                </NuxtLink>
                <NuxtLink :to="localePath('/generators/joke/')"
                    class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                    <div class="rounded-lg bg-black h-full flex flex-col">
                        <img src="/images/seo/joke.jpg" class="rounded-t-lg object-cover w-full h-[140px]"
                            :alt="$t('page.projects.project.joke.title')">
                        <h5 class="text-white p-2">{{ $t('page.projects.project.joke.title') }}</h5>
                    </div>
                </NuxtLink>
                <NuxtLink :to="localePath('/generators/cat/')"
                    class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                    <div class="rounded-lg bg-black h-full flex flex-col">
                        <img src="/images/seo/cat.jpg" class="rounded-t-lg object-cover w-full h-[140px]"
                            :alt="$t('page.projects.project.cat.title')">
                        <h5 class="text-white p-2">{{ $t('page.projects.project.cat.title') }}</h5>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
</script>