<template>
    <Button link="/blog/">{{ $t('button.back') }}</Button>
    <div class="flex center items-center pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 glass-effect mt-4 max-w-5xl">
        <template v-if="blog">
            <article>
                <div class="flex items-center justify-between">
                    <h1 class="text-left truncate">{{ blog.title }}</h1>
                    <p class="text-right text-gray-400 ml-4">{{ new Date(blog.date).toLocaleDateString(locale) }}</p>
                </div>
                <h4 class="text-left text-gray-400">{{ blog.description }}</h4>
                <div class="mt-2 mb-4 flex flex-wrap">
                    <span v-for="tag in blog.tags" :key="tag"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                        #{{ $t(`page.blog.tag.${tag}`) }}
                    </span>
                    <span
                        class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                        <img :src="`/images/flags/${blog.lang}.svg`" :alt="blog.lang" class="w-6 rounded-full">
                    </span>
                </div>
                <hr class="mb-4">
                <ContentRenderer :value="blog" class="text-left content" />
            </article>
        </template>
        <template v-else>
            <h1>{{ $t("page.blog.not_found") }}</h1>
        </template>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const { locale } = useI18n();
const route = useRoute();

const path = computed(() => getUnlocalizedPath(route.path));

const { data: blog } = await useAsyncData(
    `blog-${path.value}-${locale.value}`,
    () => queryCollection("blogs").path(path.value).first(),
    { watch: [path, locale] }
);

function getUnlocalizedPath(currentPath) {
    for (const loc of useI18n().availableLocales) {
        const prefix = "/" + loc;
        if (currentPath.startsWith(prefix)) {
            return currentPath.slice(prefix.length);
        }
    }
    return currentPath;
}

definePageMeta({
    title: "page.blog.title",
    description: "page.blog.description",
    image: "/images/seo/blog.jpg"
})

useSeoMeta({
    title: `${blog.value?.title} | Blog | Creeperkatze`,
    ogTitle: `${blog.value?.title} | Blog | Creeperkatze`,
    twitterTitle: `${blog.value?.title} | Blog | Creeperkatze`,
    description: blog.value?.description,
    ogDescription: blog.value?.description,
    twitterDescription: blog.value?.description,
});

useSchemaOrg([
    defineWebPage({
        type: "BlogPosting",
    })
]);
</script>