<template>
    <Button link="/blog" button-text-key="button.back" />
    <div class="flex center items-center p-4 rounded-lg border-2 bg-white border-gray-400 mt-4 max-w-[1000px]">
        <ContentDoc>
            <template v-slot="{ doc }">
                <article>
                    <div class="flex items-center justify-between">
                        <h1 class="text-left">{{ doc.title }}</h1>
                        <p class="text-right text-gray-400 ml-4">{{ doc.date }}</p>
                    </div>
                    <h4 class="text-left text-gray-400">{{ doc.description }}</h4>
                    <hr class="rounded border-1 mb-4 border-gray-400">
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

<script setup lang="ts">

const currentPath = useRoute().path; // Get the current route path dynamically
const { data: page } = await useAsyncData(`current-page-${currentPath}`, () =>
    queryContent(currentPath).findOne()
);

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