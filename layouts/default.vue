<script setup>

</script>

<template>
    <div>
        <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">

        <Head>
            <template v-for="link in head.link" :key="link.id">
                <Link :id="link.id" :rel="link.rel" :href="link.href" :hreflang="link.hreflang" />
            </template>
            <template v-for="meta in head.meta" :key="meta.id">
                <Meta :id="meta.id" :property="meta.property" :content="meta.content" />
            </template>
        </Head>

        <Body>
            <Navbar />
            <main class="page">
                <NuxtPage />
            </main>
            <Footer />
        </Body>

        </Html>
    </div>
</template>

<script setup>

const route = useRoute()
const { t } = useI18n()
const head = useLocaleHead()

const translatedTitle = t(route.meta.title) || 'Creeperkatze';
const translatedDescription = t(route.meta.description) || '';

const image = route.meta.image ? route.meta.image : '/images/seo/default.png';

useHead({
    link: [
        {
            rel: 'icon',
            type: 'image/ico',
            href: '/favicon.ico'
        }
    ],
    meta: [
        { name: 'google-site-verification', content: '2aNXioZyl8kTKYULVcW_ttKMJtgM6xShP2v8bxjWGbY' },
    ],
    title: `${translatedTitle} | Creeperkatze`,
})

useSeoMeta({
    title: `${translatedTitle} | Creeperkatze`,
    ogTitle: `${translatedTitle} | Creeperkatze`,
    twitterTitle: `${translatedTitle} | Creeperkatze`,
    description: translatedDescription,
    ogDescription: translatedDescription,
    twitterDescription: translatedDescription,
    ogImage: image,
    twitterImage: image,
    twitterCard: "summary",
});
</script>