<template>
    <h1 class="mb-4">{{ $t('page.tools.heading') }}</h1>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <div class="grid grid-cols-3 gap-2">
            <SmallCard :link="localePath('/tools/password-generator/')" image="/images/seo/password-generator.jpg"
                :alt="$t('page.tools.tool.password-generator.title')" :title="$t('page.tools.tool.password-generator.title')" />
            <SmallCard :link="localePath('/tools/text-converter/')" image="/images/seo/text-converter.jpg"
                :alt="$t('page.tools.tool.text-converter.title')" :title="$t('page.tools.tool.text-converter.title')" />
            <SmallCard :link="localePath('/tools/font-changer/')" image="/images/seo/font-changer.jpg"
                :alt="$t('page.tools.tool.font-changer.title')" :title="$t('page.tools.tool.font-changer.title')" />
            <SmallCard :link="localePath('/tools/unit-converter/')" image="/images/seo/unit-converter.jpg"
                :alt="$t('page.tools.tool.unit-converter.title')" :title="$t('page.tools.tool.unit-converter.title')" />
            <SmallCard :link="localePath('/tools/stopwatch/')" image="/images/seo/stopwatch.jpg"
                :alt="$t('page.tools.tool.stopwatch.title')" :title="$t('page.tools.tool.stopwatch.title')" />
            <SmallCard :link="localePath('/tools/encoder-decoder/')" image="/images/seo/encoder-decoder.jpg"
                :alt="$t('page.tools.tool.encoder-decoder.title')" :title="$t('page.tools.tool.encoder-decoder.title')" />
            <SmallCard :link="localePath('/tools/color-converter/')" image="/images/seo/color-converter.jpg"
                :alt="$t('page.tools.tool.color-converter.title')" :title="$t('page.tools.tool.color-converter.title')" />
            <SmallCard :link="localePath('/tools/ascii-art-creator/')" image="/images/seo/ascii-art-creator.jpg"
                :alt="$t('page.tools.tool.ascii-art-creator.title')" :title="$t('page.tools.tool.ascii-art-creator.title')" />
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()

definePageMeta({
    title: 'page.tools.title',
    description: 'page.tools.description',
    image: '/images/logo_512.png'
})
</script>
