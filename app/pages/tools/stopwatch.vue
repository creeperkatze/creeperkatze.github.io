<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.stopwatch.title') }}</h1>
        <div class="w-full max-w-md p-8 glass-effect border-2 rounded-lg flex flex-col items-center space-y-6">
            <div class="text-6xl font-mono font-bold tracking-wider text-white">
                {{ formattedTime }}
            </div>
            
            <div class="flex space-x-4">
                <Button @click="toggleTimer">
                    {{ isRunning ? $t('page.tools.tool.stopwatch.stop') : $t('page.tools.tool.stopwatch.start') }}
                </Button>
                <Button @click="addRound" :disabled="time === 0">
                    {{ $t('page.tools.tool.stopwatch.round') }}
                </Button>
                <Button @click="resetTimer">
                    {{ $t('page.tools.tool.stopwatch.reset') }}
                </Button>
            </div>

            <div v-if="rounds.length > 0" class="w-full space-y-2">
                <h2 class="text-xl font-bold text-center">{{ $t('page.tools.tool.stopwatch.rounds') }}</h2>
                <div class="max-h-60 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    <div v-for="(round, index) in rounds" :key="index"
                        class="flex justify-between text-white bg-neutral-600 p-2 rounded-lg">
                        <span>#{{ rounds.length - index }}</span>
                        <span class="font-mono">{{ formatTime(round) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <GoogleAd adSlot="1932797606" customClass="mt-8" />
</template>

<script setup>
const time = ref(0)
const isRunning = ref(false)
const rounds = ref([])
let interval = null

const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const milliseconds = Math.floor((ms % 1000) / 10)

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`
}

const formattedTime = computed(() => formatTime(time.value))

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

const addRound = () => {
    rounds.value.unshift(time.value)
}

const resetTimer = () => {
    clearInterval(interval)
    isRunning.value = false
    time.value = 0
    rounds.value = []
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
