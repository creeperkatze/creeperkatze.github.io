<template>
    <NuxtLayout />
    <h1 class="text-red-600">{{ error?.statusCode }}</h1>
    <h5 class="text-red-600 mb-5">{{ error?.statusMessage }}</h5>
    <h2 v-if="error?.statusCode === 404" class="mb-5">
        Even this cute cat couldn't find the page you were looking for ;(
    </h2>
    <h2 v-else class="mb-5">
        This cute cat is puzzled. An error occured ;(
    </h2>
    <img src="/images/error/soggy-cat-cat.gif" class="center w-[400px] mb-5" />
    <Button link="/" buttonTextKey="button.home" />
</template>

<script setup lang="ts">

import type { NuxtError } from '#app'

useHead({
    title: '404| Creeperkatze',
})

const props = defineProps({
  error: Object as () => NuxtError
})
</script>