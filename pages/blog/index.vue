<template>
    <h1>{{ $t("page.blog.heading") }}</h1>
    <div class="flex center items-justify-center mt-4 max-w-screen-md">
        <ContentList v-slot="{ list }" path="/blog/">
            <NuxtLink v-for="article in list" :key="article._path" :to="article._path">
                <div class="text-left mb-4 p-4 rounded-lg border-2 transition ease-in-out bg-white text-black hover:border-black hover:bg-green-600">
                    <div class="flex items-center justify-between">
                        <h2>{{ article.title }}</h2>
                        <p class="text-gray-400 ml-4">{{ article.date }}</p>
                    </div>
                    <hr>
                    <p>{{ article.description }}</p>
                </div>
            </NuxtLink>
        </ContentList>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'page.blog.title',
    description: 'page.blog.description',
    image: '/images/seo/blog.jpg'
})

</script>