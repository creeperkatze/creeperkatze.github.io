<template>
    <div class="bg-white rounded-lg p-4 border-2 mt-4 max-w-3xl center relative overflow-hidden">
        <div class="absolute inset-0 opacity-5 background" style="background-size: 100px; background-repeat: repeat;" />

        <div class="absolute left-0 top-0 transform h-32 opacity-50">
            <img src="/images/superslide/icons/website.svg" class="h-full w-auto object-contain" style="mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);
                       -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);">
        </div>

        <div class="relative z-10 ml-10 sm:ml-20">
            <div class="flex items-center space-x-2 mb-2">
                <div class="relative size-4">
                    <div class="absolute inset-0 rounded-full border-2" :class="statusColor" />
                    <div v-if="isPinging" class="absolute inset-0 rounded-full border-2 animate-ping-slow" :class="statusColor" />
                </div>
                <span class="text-xl">{{ $t(statusText) }}</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-md border-2">
                    <div class="p-2 bg-blue-200 rounded-full flex-shrink-0">
                        <img src="/images/superslide/icons/levels.svg" class="h-6 w-6 sm:h-8 sm:w-8">
                    </div>
                    <div class="flex-1">
                        <div class="text-gray-500 text-left">{{ $t("superslide.server_status_display.item.levels") }}</div>
                        <div class="text-left text-2xl">{{ formatNumber(levelCount) }}</div>
                    </div>
                </div>

                <div class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-md border-2">
                    <div class="p-2 bg-green-200 rounded-full flex-shrink-0">
                        <img src="/images/superslide/icons/users.svg" class="h-6 w-6 sm:h-8 sm:w-8">
                    </div>
                    <div class="flex-1">
                        <div class="text-gray-500 text-left">{{ $t("superslide.server_status_display.item.users") }}</div>
                        <div class="text-left text-2xl">{{ formatNumber(userCount) }}</div>
                    </div>
                </div>

                <div class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-md border-2">
                    <div class="p-2 bg-orange-200 rounded-full flex-shrink-0">
                        <img src="/images/superslide/icons/downloads.svg" class="h-6 w-6 sm:h-8 sm:w-8">
                    </div>
                    <div class="flex-1">
                        <div class="text-gray-500 text-left">{{ $t("superslide.server_status_display.item.level_downloads") }}</div>
                        <div class="text-left text-2xl">{{ formatNumber(levelDownloadsCount) }}</div>
                    </div>
                </div>

                <div class="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white rounded-md border-2">
                    <div class="p-2 bg-purple-200 rounded-full flex-shrink-0">
                        <img src="/images/superslide/icons/uptime.svg" class="h-6 w-6 sm:h-8 sm:w-8">
                    </div>
                    <div class="flex-1">
                        <div class="text-gray-500 text-left">{{ $t("superslide.server_status_display.item.uptime") }}</div>
                        <div class="text-left text-2xl">{{ formatUptime }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const config = useRuntimeConfig()

const isPinging = ref(true)
const statusColor = ref('bg-gray-500')
const statusText = ref('superslide.server_status_display.title.checking')
const levelCount = ref("...")
const userCount = ref("...")
const levelDownloadsCount = ref("...")
const levelObjectsCount = ref("...")
const uptime = ref("...")

const formatUptime = computed(() => {
    if (uptime.value === "...") return "..."
    if (uptime.value === "-") return "-"

    const seconds = parseInt(uptime.value)
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)

    let result = ''
    if (days > 0) result += `${days}d `
    if (hours > 0) result += `${hours}h `
    if (minutes > 0) result += `${minutes}m`
    if (!result) result = '<1m'

    return result.trim()
})

function formatNumber(num) {
    if (num === "..." || num === "-") return num;
    num = parseInt(num);
    if (num < 10000) return num.toString();

    let value, suffix;

    if (num < 1_000_000) {
        value = num / 1000;
        suffix = "K";
    } else if (num < 1_000_000_000) {
        value = num / 1_000_000;
        suffix = "M";
    } else if (num < 1_000_000_000_000) {
        value = num / 1_000_000_000;
        suffix = "B";
    } else {
        value = num / 1_000_000_000_000;
        suffix = "T";
    }

    return value.toLocaleString('en-US', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 1 
    }) + suffix;
}

async function checkServerStatus() {
    isPinging.value = true
    try {
        const response = await fetch(config.public.superslideServerUrl)

        isPinging.value = false
        if (response.ok) {
            statusColor.value = 'bg-green-500 border-green-700'
            statusText.value = 'superslide.server_status_display.title.online'

            const statsResponse = await fetch( config.public.superslideServerUrl + "/stats")
            if (statsResponse.ok) {
                const data = await statsResponse.json()
                levelCount.value = data.levels
                userCount.value = data.users
                levelDownloadsCount.value = data.levelDownloads
                levelObjectsCount.value = data.levelObjectCount
                uptime.value = data.uptime
            }
        } else if (response.status === 503) {
            statusColor.value = 'bg-yellow-500 border-yellow-700'
            statusText.value = 'superslide.server_status_display.title.maintenance'
            levelCount.value = "-"
            userCount.value = "-"
            levelDownloadsCount.value = "-"
            levelObjectsCount.value = "-"
            uptime.value = "-"
        } else {
            statusColor.value = 'bg-red-500 border-red-700'
            statusText.value = 'superslide.server_status_display.title.offline'
            levelCount.value = "-"
            userCount.value = "-"
            levelDownloadsCount.value = "-"
            levelObjectsCount.value = "-"
            uptime.value = "-"
        }
    } catch {
        isPinging.value = false
        statusColor.value = 'bg-red-500 border-red-700'
        statusText.value = 'superslide.server_status_display.title.offline'
        levelCount.value = "-"
        userCount.value = "-"
        levelDownloadsCount.value = "-"
        levelObjectsCount.value = "-"
        uptime.value = "-"
    }
}

onMounted(() => {
    checkServerStatus()
    setInterval(checkServerStatus, 30000)
})
</script>

<style>

@keyframes ping-slow {
    0% {
        transform: scale(1);
        opacity: 1;
    }
    100% {
        transform: scale(2);
        opacity: 0;
    }
}

.animate-ping-slow {
    animation: ping-slow 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
