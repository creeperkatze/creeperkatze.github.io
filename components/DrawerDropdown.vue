<template>
    <div class="dropdown flex flex-col" @click="dropdownOpen = !dropdownOpen">
        <NuxtLink :to="localePath(titleLink)" type="button"
            class="inline-flex navbar-element items-center justify-center">
            {{ title }}
            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
        </NuxtLink>

        <div v-if="dropdownOpen" class="mt-4 border border-gray-400 rounded-md flex flex-col space-y-4 p-1">
            <div v-for="item in items" :key="item.name" class="">
                <NuxtLink :to="localePath(item.link)" class="navbar-element" @click="emit('item-clicked')">{{ item.name }}</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
const dropdownOpen = ref(false);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    titleLink: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
        default: () => []
    },
    drawerOpen: {
        type: Boolean,
        required: true
    }
})

watch(() => props.drawerOpen, (newVal) => {
    if (!newVal) {
        dropdownOpen.value = false;
    }
})

const emit = defineEmits(['item-clicked'])
</script>