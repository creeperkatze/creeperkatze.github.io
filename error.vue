<template>
    <Navbar />
    <h1 class="mb-5">Even this cute cat couldn't find the page you were looking for ;(</h1>
    <img src="~/assets/images/error/soggy-cat-cat.gif" class="center w-[400px] mb-5" />
    <a href="/">
        <h3>Home</h3>
    </a>
    <Footer />
</template>

<script setup lang="ts">
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