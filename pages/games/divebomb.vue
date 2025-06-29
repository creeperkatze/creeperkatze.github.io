<template>
    <NuxtImg src="/images/divebomb/LogoBanner.png" alt="Divebomb racing logo"
        class="center mb-5" />
    <div class="center rounded-lg w-full h-full max-h-screen max-w-screen mx-4">
        <h1>{{ $t("page.divebomb.coming_soon") }}</h1>
    </div>
</template>

<script setup>
definePageMeta({
    title: 'page.divebomb.title',
    description: 'page.divebomb.description',
})
</script>