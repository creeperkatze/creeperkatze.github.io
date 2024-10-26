<template>
    <NuxtLink :to="link" class="no-outline">
        <div
            class="center w-24 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black bg-green-600 border-black hover:bg-green-800">
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
        }
    }
}
</script>
