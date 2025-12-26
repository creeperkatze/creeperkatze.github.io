<template>
    <h1 class="mb-4">{{ $t('navbar.generators') }}</h1>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <div class="grid grid-cols-2 gap-2">
            <SmallCard :link="localePath('/tools/generators/joke/')" image="/images/seo/joke.jpg"
                :alt="$t('page.projects.project.joke.title')" :title="$t('page.projects.project.joke.title')" />
            <SmallCard :link="localePath('/tools/generators/quote/')" image="/images/seo/quote.jpg"
                :alt="$t('page.projects.project.quote.title')" :title="$t('page.projects.project.quote.title')" />
            <SmallCard :link="localePath('/tools/generators/cat/')" image="/images/seo/cat.jpg"
                :alt="$t('page.projects.project.cat.title')" :title="$t('page.projects.project.cat.title')" />
            <SmallCard :link="localePath('/tools/generators/dog/')" image="/images/seo/dog.jpg"
                :alt="$t('page.projects.project.dog.title')" :title="$t('page.projects.project.dog.title')" />
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()

definePageMeta({
    title: 'navbar.generators',
    description: 'page.tools.description',
    image: '/images/logo_512.png'
})
</script>
