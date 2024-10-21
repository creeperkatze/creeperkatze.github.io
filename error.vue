<template>
    <Navbar />
    <h1>{{ error?.statusCode }}</h1>
    <h4 class="mb-5">{{ error?.statusMessage }}</h4>
    <h2 v-if="error?.statusCode === 404" class="mb-5">
        Even this cute cat couldn't find the page you were looking for ;(
    </h2>
    <h2 v-else class="mb-5">
        This cute cat is puzzled. An error occured ;(
    </h2>
    <img src="~/assets/images/error/soggy-cat-cat.gif" class="center w-[400px] mb-5" />
    <a href="/">
        <h3>Home</h3>
    </a>
    <Footer />
</template>

<script setup lang="ts">

import type { NuxtError } from '#app'

const props = defineProps({
  error: Object as () => NuxtError
})

useHead({
    title: '404 | Creeperkatze',
    htmlAttrs: {
        lang: 'en'
    },
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico'
        }
    ]
})

useSeoMeta({
    title: "404 | Creeperkatze",
    description: "Creeperkatze's website",
    ogTitle: "Creeperkatze",
    ogDescription: "Creeperkatze's website",
    ogImage: "/seo/Logo128.png",
    twitterTitle: "Creeperkatze",
    twitterDescription: "Creeperkatze's website",
    twitterImage: "/seo/Logo128.png",
    twitterCard: 'summary'
})
</script>