<template>
    <img src="~/assets/images/LogoBanner.png" width="800" class="center pixelated mb-5">
    <p class="mb-5 whitespace-pre-line">
        {{ $t("welcome") }}
    </p>
    <h2 class="mb-5">{{ $t("index.title_projects") }}</h2>
    <Projects />
</template>

<script setup lang="ts">
useHead({
    title: 'Home | Creeperkatze',
})
</script>