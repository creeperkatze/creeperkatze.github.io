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

        <Body class="relative min-h-screen pb-48">
            <Navbar />
            <main class="page mt-12">
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

// i18n thinks it can just set the canonical link incorrectly
head.value.link = head.value.link?.filter(link => link.rel !== 'canonical')

update();

function update() {
    useHead({
        link: [
            {
                rel: "icon",
                type: "image/png",
                href: "/images/Logo.png"
            }
        ],
        meta: [
            { name: 'google-site-verification', content: '2aNXioZyl8kTKYULVcW_ttKMJtgM6xShP2v8bxjWGbY' }
        ],
    })

    useSeoMeta({
        title: title.value ? `${title.value}` : "",
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