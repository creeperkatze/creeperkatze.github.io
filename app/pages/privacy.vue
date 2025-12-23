<template>
    <div class="flex center items-center pt-4 pb-4 px-2 md:px-4 rounded-lg border-2 glass-effect mt-4 max-w-5xl">
        <ContentRenderer v-if="page" :value="page" class="text-left content" :prose=true />
        <h1 v-else>Error</h1>
    </div>
</template>

<script setup>
const { locale } = useI18n()

definePageMeta({
    title: "page.privacy.title",
    description: "page.privacy.description",
    image: "/images/icon_bg.png"
})

const { data: page, refresh } = await useAsyncData(() => queryCollection('legal').path(`/privacy`).first())

watch(locale, () => {
    refresh()
})

refresh()
</script>