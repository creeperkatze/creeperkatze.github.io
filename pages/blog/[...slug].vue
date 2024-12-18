<template>
    <Button link="/blog">{{ $t('button.back') }}</Button>
    <div class="flex center items-center pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 bg-white border-gray-400 mt-4 max-w-screen-md">
        <ContentDoc :path="path">
            <template #default="{ doc }">
                <article>
                    <div class="flex items-center justify-between">
                        <h1 class="text-left">{{ doc.title }}</h1>
                        <p class="text-right text-gray-400 ml-4">{{ doc.date }}</p>
                    </div>
                    <h4 class="text-left text-gray-400">{{ doc.description }}</h4>
                    <hr>
                    <ContentRenderer :value="doc" class="text-left" />
                </article>
            </template>
            <template #not-found>
                <h1>{{ $t('page.blog.not_found') }}</h1>
            </template>
            <template #empty>
                <h1>{{ $t('page.blog.empty') }}</h1>
            </template>
        </ContentDoc>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const path = useUnlocalePath(useRoute().path);

const { data: page } = await useAsyncData(`current-page-${path}`, () =>
    queryContent(path).findOne()
);

function useUnlocalePath()
{
    const path = useRoute().path;
    for (const locale of useI18n().availableLocales)
    {
        const prefix = "/" + locale;
        if (path.startsWith(prefix))
        {
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

useHead({
    title: `${page.value?.title} | Blog`
});

useSeoMeta({
    title: `${page.value?.title} | Blog`,
    ogTitle: `${page.value?.title} | Blog | Creeperkatze`,
    twitterTitle: `${page.value?.title} | Blog | Creeperkatze`,
    description: page.value?.description,
    ogDescription: page.value?.description,
    twitterDescription: page.value?.description,
});

useSchemaOrg([
    defineWebPage({
        type: "BlogPosting",
    })
]);

</script>