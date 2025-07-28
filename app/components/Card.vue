<template>
    <NuxtLink :to="link"
        class="no-underline relative rounded-xl transition ease-in-out hover:scale-95 glass-effect border-2 border-white hover:border-gift max-w-md overflow-hidden">
        <div class="h-full flex flex-col">
            <NuxtImg :src="image" class="object-cover w-full" :alt="alt" />
            <div class="p-5">
                <h3 class="mb-2 font-bold text-white">{{ title }}</h3>
                <p class="mb-3 text-white">{{ description }}</p>
            </div>
        </div>
    </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
    link: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})
</script>