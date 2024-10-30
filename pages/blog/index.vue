<template>
    <h1>{{ $t("blog.title") }}</h1>
    <div class="flex center items-justify-center mt-4 max-w-[800px]">
        <ContentList path="/blog/" v-slot="{ list }">
            <NuxtLink v-for="article in list" :key="article._path" :to="article._path">
                <div class="text-left mb-4 p-4 rounded-lg border-2 transition ease-in-out bg-white text-black border-black hover:bg-green-600">
                    <div class="flex items-center justify-between">
                        <h2>{{ article.title }}</h2>
                        <p class="text-gray-400 ml-4">{{ article.date }}</p>
                    </div>
                    <hr class="rounded border-1 border-gray-400">
                    <p>{{ article.description }}</p>
                </div>
            </NuxtLink>
        </ContentList>
    </div>
</template>

<script setup lang="ts">

useHead({
    title: "Blog | Creeperkatze",
})

useSeoMeta({
    description: "Creeperkatze's Blog",
    ogDescription: "Creeperkatze's Blog",
    twitterDescription: "Creeperkatze's Blog",
})

</script>