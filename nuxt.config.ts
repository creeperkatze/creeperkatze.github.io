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
            "@nuxtjs/sitemap",
            "@nuxtjs/i18n",
            "@nuxt/content",
            "@nuxt/eslint",
            "nuxt-schema-org",
            "nuxt-seo-utils",
            "nuxt-link-checker"
        ],

    devServer: {
        port: 8000
    },

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
                files: ['de/main.json', 'de/idiot_test.json', 'de/christmas_quiz.json', "de/superslide.json"],
            },
            {
                code: "en",
                language: "en",
                name: "English",
                files: ['en/main.json', 'en/idiot_test.json', 'en/christmas_quiz.json', "en/superslide.json"],
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
    },

    runtimeConfig: {
        public: {
            superslideServerUrl: "http://127.0.0.1:3000"
        }
    },

    routeRules: {
        '/joke/': { redirect: '/generators/joke/' },
        '/en/joke/': { redirect: '/en/generators/joke/' },
        '/cat/': { redirect: '/generators/cat/' },
        '/en/cat/': { redirect: '/en/generators/cat/' },
        '/projects/': { redirect: '/games//' },
        '/en/projects/': { redirect: '/en/games/' },
        '/projects/superslide/': { redirect: '/games/superslide/' },
        '/en/projects/superslide/': { redirect: '/en/games/superslide/' },
        '/projects/flappy-christmas/': { redirect: '/games/flappy-christmas/' },
        '/en/projects/flappy-christmas/': { redirect: '/en/games/flappy-christmas/' },
    },
});