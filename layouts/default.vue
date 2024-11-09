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
    ],
    meta: [
        { name: 'google-site-verification', content: '2aNXioZyl8kTKYULVcW_ttKMJtgM6xShP2v8bxjWGbY' }
    ]
})

useSeoMeta({
    title: "Creeperkatze",
    description: "Creeperkatze's Website",
    ogTitle: "Creeperkatze",
    ogDescription: "Creeperkatze's Website",
    ogImage: "/images/Logo128.png",
    twitterTitle: "Creeperkatze",
    twitterDescription: "Creeperkatze's Website",
    twitterImage: "/images/Logo128.png",
    twitterCard: 'summary',
    ogSiteName: "Creeperkatze",
    ogType: "website",
})

const { locale, setLocale } = useI18n()
</script>