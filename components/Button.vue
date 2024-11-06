<template>
    <NuxtLink :to="link" :class="['no-outline center max-w-fit px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black bg-green-600 border-black hover:bg-green-800', rainbowBackground ? 'rainbow-background' : '']" >
        <div>
            {{ $t(buttonTextKey) }}
        </div>
    </NuxtLink>
</template>

<script>
export default {
    props: {
        link: {
            type: String,
            default: '/blog' // Default link
        },
        buttonTextKey: {
            type: String,
            default: 'button.back' // Default translation key
        },
        rainbowBackground: {
            type: Boolean,
            default: false // Default value is false, which means no rainbow animation
        },
    }
}
</script>

<style>
.rainbow-background
{
    background: linear-gradient(
            -45deg,
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
            rgba(255, 0, 0, 1) 100%
        );
    background-size: 400% 400%;
    background-position: bottom right;
    animation: rainbow 2s linear infinite;
}

@keyframes rainbow
{
    to {
        background-position: 33.33% 33.33%;
    }
}
</style>
