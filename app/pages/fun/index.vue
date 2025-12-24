<template>
    <h1 class="mb-4">{{ $t('page.fun.title') }}</h1>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <div class="grid grid-cols-2 grid-rows-2 gap-2 max-w-md max-h-[400px]">
            <SmallCard :link="localePath('/fun/idiot-test/')" image="/images/seo/idiot-test.jpg"
                :alt="$t('page.idiot-test.title')" :title="$t('page.idiot_test.heading')" />
            <SmallCard :link="localePath('/fun/christmas-quiz/')" image="/images/seo/christmas-quiz.jpg"
                :alt="$t('page.christmas-quiz.title')" :title="$t('page.christmas-quiz.heading')" />
            <SmallCard :link="localePath('/fun/common-knowledge-quiz/')" image="/images/seo/common-knowledge-quiz.jpg"
                :alt="$t('page.common-knowledge-quiz.title')" :title="$t('page.common-knowledge-quiz.heading')" />
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()

definePageMeta({
    title: 'page.fun.title',
    description: 'page.fun.description',
    image: '/images/seo/fun.jpg'
})
</script>