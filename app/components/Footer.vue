<template>
    <footer
        class="absolute pb-4 bottom-0 left-0 right-0 glass-effect border-gray-400 border-t-2 shadow-[rgba(0,0,0,0.1)_0px_10px_10px_20px]"
        style="padding-left: calc(100vw - 100%);" data-nosnippet>
        <p class="text-white mt-4 mb-2 mx-4 text-center text-sm md:text-lg">
            ©<span v-text="currentYear" /> {{ $t("footer.copyright") }}
        </p>
        <p class="text-white mx-4 text-center text-sm md:text-lg flex flex-row gap-2 justify-center">
            <NuxtLink :to="localePath('/privacy/')" class="text-neutral-400 hover:text-gift">{{ $t("page.privacy.title") }}</NuxtLink>
            <a href="https://status.creeperkatze.de" target="_blank" class="text-neutral-400 hover:text-gift">{{ $t("footer.status") }}</a>
            <a href="mailto:contact@creeperkatze.de" target="_blank" class="text-neutral-400 hover:text-gift">{{ $t("footer.contact") }}</a>
        </p>
    </footer>
</template>

<script setup>
const localePath = useLocalePath();

const currentYear = computed(() => new Date().getFullYear());
</script>