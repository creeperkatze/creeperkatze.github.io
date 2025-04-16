<template>
    <div class="lg:pb-0 pb-32">
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
                <slot />
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
const title = computed(() => route.meta.title ? t(route.meta.title) : undefined);
const description = computed(() => route.meta.description ? t(route.meta.description) : undefined);
const image = computed(() => route.meta.image ?? undefined);

update();

function update() {
    useHead({
        link: [
            {
                rel: "icon",
                type: "image/png",
                href: "/images/icon.png"
            }
        ],
        meta: [
            { name: 'google-site-verification', content: '2aNXioZyl8kTKYULVcW_ttKMJtgM6xShP2v8bxjWGbY' },
            { 'property': 'og:site_name', content: 'Creeperkatze' }
        ]
    })

    useSeoMeta({
        title: title.value ? `${title.value} | Creeperkatze` : "Creeperkatze",
        ogTitle: title.value ? `${title.value} | Creeperkatze` : "Creeperkatze",
        twitterTitle: title.value ? `${title.value} | Creeperkatze` : "Creeperkatze",
        description: description.value ? description.value : undefined,
        ogDescription: description.value ? description.value : undefined,
        twitterDescription: description.value ? description.value : undefined,
        ogImage: image,
        twitterImage: image,
        twitterCard: "summary"
    })
}

watch(route, () => {
    update();
});
</script>