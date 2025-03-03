<template>
    <div class="dropdown relative inline-flex" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
        <NuxtLink id="dropdown-hover-event" :to="localePath(titleLink)" type="button"
            class="inline-flex navbar-element items-center justify-center" aria-haspopup="menu" aria-expanded="false"
            aria-label="Dropdown">
            {{ title }}
            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
        </NuxtLink>

        <div v-if="dropdownOpen"
            class="dropdown-menu transition duration-100 hidden rounded-md bg-black border after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-10"
            role="menu" aria-orientation="vertical" aria-labelledby="dropdown-hover-event">
            <div v-for="item in items" :key="item.name" class="p-1 pl-1 text-left text-nowrap">
                <NuxtLink :to="localePath(item.link)" class="navbar-element">{{ item.name }}</NuxtLink>
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
    }
})
</script>