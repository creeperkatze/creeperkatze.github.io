<template>
    <footer class="bg-black items-center w-screen pb-2 h-auto" data-nosnippet>
        <p class="text-white mt-4 mx-4 text-center text-sm md:text-lg">
            ©<span v-text="new Date().getFullYear()" /> {{ $t("footer.copyright") }}
        </p>
        <p class="text-white mb-2 mx-4 text-center text-sm md:text-lg">
            {{ $t("footer.text_part1") }}
            <a href="https://nuxt.com/" target="_blank">{{
                $t("footer.link_nuxt")
                }}</a>{{ $t("footer.text_part2")
            }}<a href="https://tailwindcss.com/" target="_blank">{{
                $t("footer.link_tailwind")
                }}</a>{{ $t("footer.text_part3")
            }}<a href="https://github.com/creeperkatze/creeperkatze.github.io" target="_blank">{{
                $t("footer.link_github") }}</a>.
        </p>
        <a href="https://github.com/creeperkatze/creeperkatze.github.io/commits/main" target="_blank">
            <img class="h-6 px-1 inline"
                src="https://img.shields.io/github/last-commit/creeperkatze/creeperkatze.github.io/main?display_timestamp=author&logo=github"
                alt="Last Commit"></a>
        <a href="https://github.com/creeperkatze/creeperkatze.github.io/actions" target="_blank">
            <img class="h-6 px-1 inline"
                src="https://img.shields.io/github/actions/workflow/status/Creeperkatze/creeperkatze.github.io/deploy.yml?logo=github"
                alt="Build Status"></a>
    </footer>
</template>
