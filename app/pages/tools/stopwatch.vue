<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.stopwatch.title') }}</h1>
        <div class="w-full max-w-md p-8 glass-effect rounded-lg flex flex-col items-center space-y-6">
            <div class="text-6xl font-mono font-bold tracking-wider text-white">
                {{ formattedTime }}
            </div>
            
            <div class="flex space-x-4">
                <Button @click="toggleTimer">
                    {{ isRunning ? $t('page.tools.tool.stopwatch.stop') : $t('page.tools.tool.stopwatch.start') }}
                </Button>
                <Button @click="resetTimer">
                    {{ $t('page.tools.tool.stopwatch.reset') }}
                </Button>
            </div>
        </div>
    </div>

    <GoogleAd adSlot="1932797606" customClass="mt-8" />
</template>

<script setup>
const time = ref(0)
const isRunning = ref(false)
let interval = null

const formattedTime = computed(() => {
    const minutes = Math.floor(time.value / 60000)
    const seconds = Math.floor((time.value % 60000) / 1000)
    const milliseconds = Math.floor((time.value % 1000) / 10)
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
})

const toggleTimer = () => {
    if (isRunning.value) {
        clearInterval(interval)
    } else {
        const startTime = Date.now() - time.value
        interval = setInterval(() => {
            time.value = Date.now() - startTime
        }, 10)
    }
    isRunning.value = !isRunning.value
}

const resetTimer = () => {
    clearInterval(interval)
    isRunning.value = false
    time.value = 0
}

onUnmounted(() => {
    clearInterval(interval)
})

definePageMeta({
    title: 'page.tools.tool.stopwatch.title',
    description: 'page.tools.tool.stopwatch.description',
    image: '/images/seo/stopwatch.jpg'
})
</script>
