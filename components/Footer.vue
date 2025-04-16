<template>
    <footer class="bg-black items-center max-w-screen pb-2 h-auto" style="padding-left: calc(100vw - 100%);"
        data-nosnippet>
        <p class="text-white mt-4 mx-4 text-center text-sm md:text-lg">
            ©<span v-text="currentYear" /> {{ $t("footer.copyright") }}
        </p>
        <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
            {{ $t("footer.text_part1") }}
            <a href="https://nuxt.com/" target="_blank">{{
                $t("footer.link_nuxt")
            }}</a>{{ $t("footer.text_part2")
            }}<a href="https://tailwindcss.com/" target="_blank">{{
                $t("footer.link_tailwind")
            }}</a>{{ $t("footer.text_part3")
            }}<a href="https://github.com/creeperkatze/website" target="_blank">{{
                $t("footer.link_github") }}</a>.
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