<template>
    <Button link="/blog">{{ $t('button.back') }}</Button>
    <div class="flex center items-center p-4 rounded-lg border-2 bg-white border-gray-400 mt-4 max-w-screen-md">
        <ContentDoc>
            <template v-slot="{ doc }">
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
                <h1>Blog not found</h1>
            </template>
            <template #empty>
                <h1>Blog is empty</h1>
            </template>
        </ContentDoc>
    </div>
</template>

<script setup>

const currentPath = useRoute().path; // Get the current route path dynamically
const { data: page } = await useAsyncData(`current-page-${currentPath}`, () =>
    queryContent(currentPath).findOne()
);

definePageMeta({
    title: 'page.blog.title',
    description: 'page.blog.description',
    image: '/images/seo/blog.jpg'
})

useHead({
    title: `${page.value?.title} | Blog | Creeperkatze`
});

useSeoMeta({
    title: `${page.value?.title} | Blog | Creeperkatze`,
    ogTitle: `${page.value?.title} | Blog | Creeperkatze`,
    twitterTitle: `${page.value?.title} | Blog | Creeperkatze`,
    description: page.value?.description,
    ogDescription: page.value?.description,
    twitterDescription: page.value?.description,
})

</script>