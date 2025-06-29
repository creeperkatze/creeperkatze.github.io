<template>
    <button class="self-center min-w-6 min-h-6" @click.prevent.stop="toggleColorMode">
        <template v-if="colorMode.value === 'dark'">
            <img src="/images/icons/sun.svg">
        </template>
        <template v-else>
            <img src="images/icons/moon.svg">
        </template>
    </button>
</template>

<script setup>
/*
const colorMode = useColorMode()

// Function to toggle between light and dark modes
const toggleColorMode = () =>
{
    colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
*/
</script>