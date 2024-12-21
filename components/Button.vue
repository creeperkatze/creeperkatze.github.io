<template>
    <template v-if="link">
        <NuxtLink :to="localePath(link)" class="text-black hover:text-black">
            <button
                :class="['no-outline center max-w-fit px-4 pt-2 pb-2 bg-green-600 hover:bg-green-800 disabled:opacity-50 rounded-lg items-center border-2 border-black', rainbowBackground ? 'rainbow-background' : '']">
                <slot>
                    <p class="text-black">Button</p>
                </slot>
            </button>
        </NuxtLink>
    </template>
    <template v-else>
        <button
            :class="['no-outline center max-w-fit px-4 pt-2 pb-2 bg-green-600 hover:bg-green-800 disabled:opacity-50 rounded-lg items-center border-2 border-black', rainbowBackground ? 'rainbow-background' : '']">
            <slot>
                <p class="text-black">Button</p>
            </slot>
        </button>
    </template>
</template>

<script setup>
const localePath = useLocalePath()

// Defining props using defineProps()
const props = defineProps({
  link: {
    type: String,
    default: undefined
  },
  rainbowBackground: {
    type: Boolean,
    default: false
  },
})
</script>

<style>
.rainbow-background
{
    background: linear-gradient(-45deg,
            rgba(255, 0, 0, 1) 0%,
            rgba(255, 154, 0, 1) 5%,
            rgba(208, 222, 33, 1) 10%,
            rgba(79, 220, 74, 1) 15%,
            rgba(63, 218, 216, 1) 20%,
            rgba(47, 201, 226, 1) 25%,
            rgba(28, 127, 238, 1) 30%,
            rgba(95, 21, 242, 1) 35%,
            rgba(186, 12, 248, 1) 40%,
            rgba(251, 7, 217, 1) 45%,
            rgba(255, 0, 0, 1) 50%,
            rgba(255, 154, 0, 1) 55%,
            rgba(208, 222, 33, 1) 60%,
            rgba(79, 220, 74, 1) 65%,
            rgba(63, 218, 216, 1) 70%,
            rgba(47, 201, 226, 1) 75%,
            rgba(28, 127, 238, 1) 80%,
            rgba(95, 21, 242, 1) 85%,
            rgba(186, 12, 248, 1) 90%,
            rgba(251, 7, 217, 1) 95%,
            rgba(255, 0, 0, 1) 100%);
    background-size: 400% 400%;
    background-position: bottom right;
    animation: rainbow 2s linear infinite;
}

@keyframes rainbow
{
    to
    {
        background-position: 33.33% 33.33%;
    }
}
</style>
