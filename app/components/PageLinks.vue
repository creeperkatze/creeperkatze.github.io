<template>
    <div class="max-w-3xl pt-8 mx-auto">
        <h2 class="mb-4">{{ $t('page.fun.also_try') }}</h2>
        <div class="flex justify-center mx-auto flex-col w-fit">
            <div class="grid grid-cols-2 gap-2">
                <SmallCard
                    v-for="page in otherPages"
                    :key="page.link"
                    :link="localePath(page.link)"
                    :image="page.image"
                    :alt="$t(page.alt)"
                    :title="$t(page.title)"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    currentPage: {
        type: String,
        required: true
    }
})

const localePath = useLocalePath()

const allPages = [
    {
        link: '/fun/idiot-test/',
        image: '/images/seo/idiot-test.jpg',
        alt: 'page.idiot-test.title',
        title: 'page.idiot_test.heading',
        id: 'idiot-test'
    },
    {
        link: '/fun/christmas-quiz/',
        image: '/images/seo/christmas-quiz.jpg',
        alt: 'page.christmas-quiz.title',
        title: 'page.christmas-quiz.heading',
        id: 'christmas-quiz'
    },
    {
        link: '/fun/common-knowledge-quiz/',
        image: '/images/seo/common-knowledge-quiz.jpg',
        alt: 'page.common-knowledge-quiz.title',
        title: 'page.common-knowledge-quiz.heading',
        id: 'common-knowledge-quiz'
    },
    {
        link: '/fun/new-year-quiz/',
        image: '/images/seo/new-year-quiz.jpg',
        alt: 'page.new-year-quiz.title',
        title: 'page.new-year-quiz.heading',
        id: 'new-year-quiz'
    },
    {
        link: '/fun/reaction-time/',
        image: '/images/seo/reaction-time.jpg',
        alt: 'page.reaction-time.title',
        title: 'page.reaction-time.heading',
        id: 'reaction-time'
    }
]

const otherPages = computed(() => {
    return allPages.filter(page => page.id !== props.currentPage)
})
</script>
