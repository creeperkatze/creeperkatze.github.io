<template>
    <Button link="/blog/">{{ $t('button.back') }}</Button>
    <div class="flex center items-center pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 bg-white mt-4 max-w-3xl">
        <template v-if="blog">
            <article>
                <div class="flex items-center justify-between">
                    <h1 class="text-left truncate">{{ blog.title }}</h1>
                    <p class="text-right text-gray-400 ml-4">{{ new Date(blog.date).toLocaleDateString() }}</p>
                </div>
                <h4 class="text-left text-gray-400">{{ blog.description }}</h4>
                <div class="mt-2 mb-4 flex flex-wrap">
                    <span v-for="tag in blog.tags" :key="tag"
                        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                        #{{ $t(`page.blog.tag.${tag}`) }}
                    </span>
                    <span
                        class="inline-flex items-center bg-gray-200 rounded-full px-3 py-1 text-sm text-gray-700 mr-2 group-hover:bg-green-700">
                        <img :src="images[blog.lang]" :alt="blog.lang" class="w-6 rounded-full">
                    </span>
                </div>
                <hr class="mb-4">
                <ContentRenderer :value="blog" class="text-left" />
            </article>
        </template>
        <template v-else>
            <h1>{{ $t('page.blog.not_found') }}</h1>
        </template>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { filename } from 'pathe/utils';

const glob = import.meta.glob('@/assets/images/flags/*.svg', { eager: true });
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
);

const path = useUnlocalePath(useRoute().path);

const { data: blog } = await useAsyncData("blog", () => {
    return queryCollection(`blogs`)
        .path(path)
        .first()
})

function useUnlocalePath() {
    const path = useRoute().path;
    for (const locale of useI18n().availableLocales) {
        const prefix = "/" + locale;
        if (path.startsWith(prefix)) {
            return path.slice(prefix.length);
        }
    }
    return path;
}

definePageMeta({
    title: 'page.blog.title',
    description: 'page.blog.description',
    image: '/images/seo/blog.jpg'
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