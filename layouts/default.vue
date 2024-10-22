<template>
    <Navbar />
    <NuxtPage />
    <Footer />
</template>

<script setup lang="ts">

useHead({
    title: '| Creeperkatze',
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
    title: "Creeperkatze",
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