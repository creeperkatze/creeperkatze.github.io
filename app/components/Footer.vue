<template>
    <footer
        class="absolute pb-4 bottom-0 left-0 right-0 glass-effect border-gray-400 border-t-2 shadow-[rgba(0,0,0,0.1)_0px_10px_10px_20px]"
        style="padding-left: calc(100vw - 100%);" data-nosnippet>
        <p class="text-white mt-4 mx-4 text-center text-sm md:text-lg">
            ©<span v-text="currentYear" /> {{ $t("footer.copyright") }}
        </p>
        <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
            <NuxtLink href="/privacy" class="text-white">{{ $t("page.privacy.title") }}</NuxtLink>
            <span class="mx-2">|</span>
            <a href="https://status.creeperkatze.de" class="text-white">{{ $t("footer.status") }}</a>
        </p>
    </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear());
</script>