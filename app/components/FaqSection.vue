<template>
    <div class="w-full max-w-4xl p-6 glass-effect border-2 rounded-lg">
        <h2 class="mb-4">{{ title }}</h2>
        <div class="space-y-4">
            <details v-for="(item, index) in items" :key="index" class="group border-2 border-white/10 rounded-lg p-4">
                <summary class="cursor-pointer flex justify-between items-center text-lg select-none [&::-webkit-details-marker]:hidden">
                    {{ item.question }}
                    <IconDown class="size-4 transform transition-all group-open:rotate-180" />
                </summary>
                <p class="p-2 text-base opacity-80">{{ item.answer }}</p>
            </details>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
        validator: (value) => {
            return value.every(item => item.question && item.answer)
        }
    }
})
</script>
