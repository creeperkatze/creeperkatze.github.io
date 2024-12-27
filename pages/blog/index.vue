<template>
    <h1>{{ $t("page.blog.heading") }}</h1>
    <div class="flex center items-justify-center mt-4 max-w-screen-md">
        <ContentList v-slot="{ list }" path="/blog/">
            <NuxtLink v-for="article in list.slice().reverse()" :key="article._path" :to="localePath(article._path)">
                <div
                    class="text-left mb-4 pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 transition ease-in-out bg-white text-black hover:border-black hover:bg-green-600 group">
                    <div class="flex items-center justify-between">
                        <h2>{{ article.title }}</h2>
                        <p class="text-gray-400 ml-4">{{ article.date }}</p>
                    </div>
                    <hr>
                    <p>{{ article.description }}</p>
                    <div class="mt-2 flex flex-wrap">
                        <span v-for="tag in article.tags" :key="tag"
                            class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                            #{{ $t(`page.blog.tag.${tag}`) }}
                        </span>
                        <span
                            class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                            <img :src="images[article.lang]" :alt="article.lang" class="w-6 rounded-full">
                        </span>
                    </div>
                </div>
            </NuxtLink>
        </ContentList>
    </div>
</template>

<script setup>
import { filename } from 'pathe/utils';

const glob = import.meta.glob('@/assets/images/flags/*.svg', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const localePath = useLocalePath()

definePageMeta({
    title: 'page.blog.title',
    description: 'page.blog.description',
    image: '/images/seo/blog.jpg'
})

</script>