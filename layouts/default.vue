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

update();

function update()
{
    // If the route name cant be resolved, for example when theres a 404 error, 
    // dont use this custom implementation, as it relies on definePageMeta()
    if (route.name == undefined)
    {
        return;
    }

    const translatedTitle = t(route.meta.title) || '';
    console.log(translatedTitle);
    const translatedDescription = t(route.meta.description) || '';
    console.log(translatedDescription);

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
        title: `${translatedTitle}`,
    })

    useSeoMeta({
        title: `${translatedTitle}`,
        ogTitle: `${translatedTitle} | Creeperkatze`,
        twitterTitle: `${translatedTitle} | Creeperkatze`,
        description: translatedDescription,
        ogDescription: translatedDescription,
        twitterDescription: translatedDescription,
        ogImage: image,
        twitterImage: image,
        twitterCard: "summary",
    });
}

watch(route, () => {
    update();
});
</script>