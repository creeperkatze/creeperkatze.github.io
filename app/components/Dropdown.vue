<template>
    <div class="dropdown relative inline-flex" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
        <NuxtLink id="dropdown-hover-event" :to="localePath(titleLink)" type="button"
            class="inline-flex navbar-element items-center justify-center">
            {{ title }}
            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
        </NuxtLink>

        <!-- Invisible hover bridge -->
        <div v-if="dropdownOpen" class="absolute left-0 w-48" style="height:2rem;top:100%;pointer-events:auto;"></div>

        <Transition name="dropdown-fade">
            <div v-if="dropdownOpen"
                class="absolute left-0 mt-8 w-48 rounded-md bg-neutral-800 border-2">
                <NuxtLink v-for="item in items" :key="item.name" :to="localePath(item.link)"
                    class="text-left navbar-element block px-4 py-2">
                    {{ item.name }}</NuxtLink>
            </div>
        </Transition>
    </div>
</template>

<script setup>
const localePath = useLocalePath()
const dropdownOpen = ref(false);

defineProps({
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

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active
{
    transition: opacity 0.15s, transform 0.15s;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to
{
    opacity: 0;
    transform: translateY(10px);
}

.dropdown-fade-enter-to,
.dropdown-fade-leave-from
{
    opacity: 1;
    transform: translateY(0);
}
</style>