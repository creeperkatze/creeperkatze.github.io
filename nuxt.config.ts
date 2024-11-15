import svgLoader from "vite-svg-loader"

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    telemetry: false,
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules:
        [
            "@nuxtjs/google-fonts",
            "@nuxtjs/tailwindcss",
            "@nuxtjs/color-mode",
            "@nuxtjs/sitemap",
            "@nuxtjs/i18n",
            "@nuxt/image",
            "@nuxt/content",
            "@nuxt/eslint",
        ],

    googleFonts:
    {
        // Never change this, it is illegal in germany if fonts are loaded from google at runtime🤦
        download: true,

        families: {
            Lexend: true
        }
    },

    vite:
    {
        plugins: [svgLoader({
            defaultImport: "url"
        })]
    },

    site: {
        url: "https://creeperkatze.github.io",
        name: "Creeperkatze"
    },

    i18n: {
        strategy: "no_prefix",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n",
        },
        defaultLocale: "en",
        locales: [
            {
                code: "en",
                language: "en-US",
                name: "English",

            },
            {
                code: "de",
                language: "de-DE",
                name: "Deutsch"
            }
        ]
    },

    content: {
        contentHead: false
    },

    router: {
        options: {
            scrollBehaviorType: 'smooth',
        }
    }
});