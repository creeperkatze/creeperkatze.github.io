<template>
    <footer class="dark:bg-black items-center">
        <p class="text-white mt-4 mx-4 text-center">©<span v-text="new Date().getFullYear()"></span> Creeperkatze</p>
        <p class="text-white mb-2 mx-4 text-center text-xm sm:text-base">Built with <a href="https://nuxt.com/"
                target="_blank">Nuxt</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>. Source
            available on <a href="https://github.com/Creeperkatze/creeperkatze.github.io" target="_blank">GitHub</a>.
        </p>
        <img class="w-40 px-1 inline"
        src="https://img.shields.io/github/last-commit/creeperkatze/creeperkatze.github.io/main?display_timestamp=author&logo=github">
        <img class="w-32 px-1 inline"
            src="https://img.shields.io/github/actions/workflow/status/Creeperkatze/creeperkatze.github.io/deploy.yml?logo=github">
        <div class="mb-2"></div>
    </footer>
</template>
