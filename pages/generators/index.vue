<template>
    <h1 class="mb-4">{{ $t('page.generators.heading') }}</h1>
    <div class="flex flex-wrap flex-row gap-2 justify-center">
        <div class="grid grid-cols-2 gap-2 w-[465px] h-[210px]">
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
            <NuxtLink :to="localePath('/generators/dog/')"
                class="no-underline rounded-xl transition ease-in-out hover:scale-95 border-4 p-1 hover:border-black">
                <div class="rounded-lg bg-black h-full flex flex-col">
                    <img src="/images/seo/dog.jpg" class="rounded-t-lg object-cover w-full h-[140px]"
                        :alt="$t('page.projects.project.dog.title')">
                    <h5 class="text-white p-2">{{ $t('page.projects.project.dog.title') }}</h5>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()

definePageMeta({
    title: 'page.generators.title',
    description: 'page.generators.description',
    image: '/images/seo/generators.jpg'
})
</script>