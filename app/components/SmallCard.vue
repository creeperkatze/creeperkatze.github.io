<template>
    <NuxtLink :to="link"
        class="no-underline relative rounded-xl transition ease-in-out hover:scale-95 border-2 border-white hover:border-gift overflow-hidden max-w-96 max-h-56">
        <div class="rounded-lg glass-effect h-full w-full flex flex-col">
            <div class="flex-shrink-0 w-full h-2/3">
                <img :src="image" class="object-cover w-full h-full" :alt="alt" />
            </div>
            <h5 class="text-white p-2 text-base sm:text-lg w-full text-center">{{ title }}</h5>
        </div>
    </NuxtLink>
</template>

<script setup>
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
    }
});
</script>