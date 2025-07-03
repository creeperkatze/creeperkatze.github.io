<template>
    <h1 class="mb-4">{{ $t('page.generators.heading') }}</h1>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <div class="grid grid-cols-2 grid-rows-2 gap-2 max-w-md max-h-[400px]">
            <SmallCard :link="localePath('/generators/joke/')" image="/images/seo/joke.jpg"
                :alt="$t('page.projects.project.joke.title')" :title="$t('page.projects.project.joke.title')" />
            <SmallCard :link="localePath('/generators/cat/')" image="/images/seo/cat.jpg"
                :alt="$t('page.projects.project.cat.title')" :title="$t('page.projects.project.cat.title')" />
            <SmallCard :link="localePath('/generators/dog/')" image="/images/seo/dog.jpg"
                :alt="$t('page.projects.project.dog.title')" :title="$t('page.projects.project.dog.title')" />
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