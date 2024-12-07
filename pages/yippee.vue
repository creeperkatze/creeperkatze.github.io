<template>
    <Button link="/yippee" :rainbowBackground="true" @click="playSound">{{ $t('button.yippee') }}</Button>
</template>

<script>

definePageMeta({
    title: 'page.yippee.title',
    description: 'page.yippee.description',
    image: '/images/seo/yippee.png'
})

export default {
    methods: {
        playSound()
        {
            const audio = new Audio('/audio/yippee.mp3');
            audio.play();
        }
    }
}
</script>