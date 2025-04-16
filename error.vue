<template>
    <NuxtLayout>
        <h1 class="text-red-600">{{ error?.statusCode }}</h1>
        <h5 class="text-red-600 mb-5">{{ error?.statusMessage }}</h5>
        <h2 v-if="error?.statusCode === 404" class="mb-5">
            {{ $t("page.error.404") }}
        </h2>
        <h2 v-else class="mb-5">
            {{ $t("page.error.else") }}
        </h2>
        <img src="~/assets/images/error/soggy-cat-cat.gif" :alt="$t('page.error.image.cat')"
            class="center w-[400px] mb-5">
        <Button link="/">{{ $t('button.home') }}</Button>
    </NuxtLayout>
</template>

<script setup>
const { t } = useI18n()

defineProps({
    error: {
        type: Object,
        required: true,
    },
});

useHead({
    title: '404 | Creeperkatze',
})

const localizedDescription = t('page.error.404');

useSeoMeta({
    title: '404 | Creeperkatze',
    ogTitle: '404 | Creeperkatze',
    twitterTitle: '404 | Creeperkatze',
    description: localizedDescription,
    ogDescription: localizedDescription,
    twitterDescription: localizedDescription,
    ogImage: '/images/seo/error.png',
    twitterImage: '/images/seo/error.png',
    twitterCard: "summary",
});
</script>