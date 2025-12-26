<template>
    <h1 class="mb-4">{{ $t('page.tools.heading') }}</h1>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <div class="grid grid-cols-2 gap-2">
            <SmallCard :link="localePath('/tools/password-generator/')" image="/images/seo/password-generator.jpg"
                :alt="$t('page.tools.tool.password-generator.title')" :title="$t('page.tools.tool.password-generator.title')" />
            <SmallCard :link="localePath('/tools/case-converter/')" image="/images/seo/case-converter.jpg"
                :alt="$t('page.tools.tool.case-converter.title')" :title="$t('page.tools.tool.case-converter.title')" />
            <SmallCard :link="localePath('/tools/unit-converter/')" image="/images/seo/unit-converter.jpg"
                :alt="$t('page.tools.tool.unit-converter.title')" :title="$t('page.tools.tool.unit-converter.title')" />
            <SmallCard :link="localePath('/tools/stopwatch/')" image="/images/seo/stopwatch.jpg"
                :alt="$t('page.tools.tool.stopwatch.title')" :title="$t('page.tools.tool.stopwatch.title')" />
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
