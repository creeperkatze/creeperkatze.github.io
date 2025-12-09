<template>
    <footer
        class="absolute pb-4 bottom-0 left-0 right-0 glass-effect border-gray-400 border-t-2 shadow-[rgba(0,0,0,0.1)_0px_10px_10px_20px]"
        style="padding-left: calc(100vw - 100%);" data-nosnippet>
        <p class="text-white mt-4 mx-4 text-center text-sm md:text-lg">
            ©<span v-text="currentYear" /> {{ $t("footer.copyright") }}
        </p>
        <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
            <NuxtLink href="/privacy" class="text-white">{{ $t("page.privacy.title") }}</NuxtLink>
        </p>
        <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
            <a href="https://status.creeperkatze.de" class="text-white">{{ $t("footer.status") }}</a>
        </p>
        <a href="https://github.com/creeperkatze/website/commits/main" target="_blank">
            <img class="h-6 px-1 inline"
                src="https://img.shields.io/github/last-commit/creeperkatze/website/main?display_timestamp=author&logo=github"
                alt="Last Commit"></a>
        <a href="https://github.com/creeperkatze/website/actions" target="_blank">
            <img class="h-6 px-1 inline"
                src="https://img.shields.io/github/actions/workflow/status/Creeperkatze/website/deploy.yml?logo=github"
                alt="Build Status"></a>
        <a :href="$t('footer.badge.problem.link')" target="_blank">
            <img class="h-6 px-1 inline" :src="$t('footer.badge.problem.shield')"
                :alt="$t('footer.badge.problem.alt')"></a>
        <a :href="$t('footer.badge.suggestion.link')" target="_blank">
            <img class="h-6 px-1 inline" :src="$t('footer.badge.suggestion.shield')"
                :alt="$t('footer.badge.suggestion.alt')"></a>
    </footer>
</template>

<script setup>
const currentYear = computed(() => new Date().getFullYear());
</script>