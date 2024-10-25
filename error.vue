<template>
    <NuxtLayout />
    <h1>{{ error?.statusCode }}</h1>
    <h4 class="mb-5">{{ error?.statusMessage }}</h4>
    <h2 v-if="error?.statusCode === 404" class="mb-5">
        Even this cute cat couldn't find the page you were looking for ;(
    </h2>
    <h2 v-else class="mb-5">
        This cute cat is puzzled. An error occured ;(
    </h2>
    <img src="~/assets/images/error/soggy-cat-cat.gif" class="center w-[400px] mb-5" />
    <NuxtLink to="/" class="no-outline"><UIButton class="text-white bg-green-600 rounded-lg text-sm px-5 py-2.5 me-2 mb-2 transition-transform duration-200 hover:bg-green-800">Home</UIButton></NuxtLink>
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