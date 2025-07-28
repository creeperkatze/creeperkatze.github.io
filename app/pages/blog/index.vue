<template>
    <h1>{{ $t("page.blog.heading") }}</h1>
    <div class="flex center items-justify-center mt-4 max-w-3xl">
        <NuxtLink v-for="blog in blogs" :key="blog.path" :to="localePath(blog.path)">
            <div
                class="text-left mb-4 pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 transition ease-in-out glass-effect group hover:border-gift hover-lift">
                <div class="flex items-center justify-between">
                    <h2 class="truncate">{{ blog.title }}</h2>
                    <p class="text-gray-400 ml-4">{{ new Date(blog.date).toLocaleDateString(locale) }}</p>
                </div>
                <hr>
                <p>{{ blog.description }}</p>
                <div class="mt-2 flex flex-wrap">
                    <span v-for="tag in blog.tags" :key="tag"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-gift">
                        #{{ $t(`page.blog.tag.${tag}`) }}
                    </span>
                    <span
                        class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-gift">
                        <img :src="`/images/flags/${blog.lang}.svg`" :alt="blog.lang" class="w-6 rounded-full">
                    </span>
                </div>
            </div>
        </NuxtLink>
    </div>
</template>

<script setup>
import { filename } from 'pathe/utils';

const { locale } = useI18n();
const localePath = useLocalePath()

const { data: blogs } = await useAsyncData("blog-list", () => {
    return queryCollection('blogs')
        .select('path', 'title', 'description', 'date', 'lang', 'tags')
        .where('path', '<>', '/blog')
        .order('date', 'DESC')
        .all()
})

definePageMeta({
    title: 'page.blog.title',
    description: 'page.blog.description',
    image: '/images/seo/blog.jpg'
})
</script>