<!--  -->
<template>
    <NuxtLayout />
    <h1 class="text-red-600">{{ error?.statusCode }}</h1>
    <h5 class="text-red-600 mb-5">{{ error?.statusMessage }}</h5>
    <h2 v-if="error?.statusCode === 404" class="mb-5">
        {{ $t("error.404") }}
    </h2>
    <h2 v-else class="mb-5">
        {{ $t("error.else") }}
    </h2>
    <img src="/images/error/soggy-cat-cat.gif" class="center w-[400px] mb-5">
    <Button link="/" buttonTextKey="button.home" />
</template>

<script setup lang="ts">

import type { NuxtError } from '#app'

useHead({
    title: '404 | Creeperkatze',
})

useSeoMeta({
    title: "404 | Creeperkatze",
    ogTitle: "404 | Creeperkatze",
    twitterTitle: "404 | Creeperkatze",
    description: "Even this cute cat couldn't find the page you were looking for ;(",
    ogDescription: "Even this cute cat couldn't find the page you were looking for ;(",
    twitterDescription: "Even this cute cat couldn't find the page you were looking for ;(",
})

defineProps({
    error: Object as () => NuxtError
})

</script>