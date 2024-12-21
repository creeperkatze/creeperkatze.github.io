import { defineNuxtConfig } from 'nuxt/config'
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
          "@nuxt/content",
          "@nuxt/eslint",
          "nuxt-schema-org",
          "nuxt-seo-utils",
          "nuxt-link-checker"
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

    app: {
        head: {
            titleTemplate: '',
        },
    },

    site: {
        url: "https://creeperkatze.github.io",
        name: "Creeperkatze",
        trailingSlash: true
    },

    i18n: {
        baseUrl: "https://creeperkatze.github.io",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n",
        },
        langDir: 'locales/',
        defaultLocale: "de",
        lazy: true,
        locales: [
            {
                code: "de",
                language: "de",
                name: "Deutsch",
                files: ['de/main.json', 'de/idiot_test.json'],
            },
            {
                code: "en",
                language: "en",
                name: "English",
                files: ['en/main.json', 'en/idiot_test.json'],
            }
        ]
    },

    content: {
        contentHead: false,
        locales: ['de', 'en'],
    },

    router: {
        options: {
            scrollBehaviorType: 'smooth',
        }
    },

    schemaOrg: {
        identity: {
            type: 'Person',
            name: 'Creeperkatze',
            image: '/images/Logo512.png',
            sameAs: [
                'https://www.instagram.com/creeperkatze/',
                'https://creeperkatze.itch.io/',
                'https://github.com/creeperkatze'
            ]
        }
    }
});