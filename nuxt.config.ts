import { defineNuxtConfig } from "nuxt/config";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    telemetry: false,
    devtools: { enabled: true },
    css: ["~/assets/css/main.css"],
    modules: ["@nuxtjs/google-fonts", "@nuxtjs/tailwindcss", "@nuxtjs/sitemap", "@nuxtjs/i18n", "@nuxt/content", "@nuxt/eslint", "nuxt-schema-org", "nuxt-seo-utils", "nuxt-link-checker", "@nuxt/image"],
    nitro: {
        prerender: {
            failOnError: false,
        },
    },
    googleFonts: {
        // Never change this, it is illegal in germany if fonts are loaded from google at runtime🤦
        download: true,

        families: {
            Lexend: true,
        },
    },
    vite: {
        plugins: [
            svgLoader({
                defaultImport: "url",
            }),
        ],
    },
    app: {
        head: {
            titleTemplate: "",
        },
    },
    site: {
        trailingSlash: true,
        url: "https://creeperkatze.de",
        name: "Creeperkatze",
    },
    i18n: {
        baseUrl: "https://creeperkatze.de",
        strategy: "prefix_except_default",
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n",
        },
        langDir: "locales/",
        defaultLocale: "de",
        lazy: true,
        locales: [
            {
                code: "de",
                language: "de-DE",
                name: "Deutsch",
                files: ["de.json", "idiot-test/de.json", "christmas-quiz/de.json"],
            },
            {
                code: "en",
                language: "en-US",
                name: "English",
                files: ["en.json", "idiot-test/en.json", "christmas-quiz/en.json"],
            },
        ],
        bundle: {
            optimizeTranslationDirective: false,
        },
    },
    content: {
        contentHead: false,
        renderer: {
            anchorLinks: false,
        },
    },
    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },
    schemaOrg: {
        identity: {
            type: "Person",
            name: "Creeperkatze",
            image: "/images/logo512.png",
            sameAs: ["https://www.instagram.com/creeperkatze/", "https://creeperkatze.itch.io/", "https://github.com/creeperkatze"],
        },
    },
    runtimeConfig: {
        public: {
            siteVerificationId: "2aNXioZyl8kTKYULVcW_ttKMJtgM6xShP2v8bxjWGbY",
            adSenseId: "ca-pub-3613753082519650",
        },
    },
    routeRules: {
        "/joke/": { redirect: "/generators/joke/" },
        "/en/joke/": { redirect: "/en/generators/joke/" },
        "/cat/": { redirect: "/generators/cat/" },
        "/en/cat/": { redirect: "/en/generators/cat/" },
        "/projects/": { redirect: "/games//" },
        "/en/projects/": { redirect: "/en/games/" },
        "/projects/superslide/": { redirect: "/games/superslide/" },
        "/en/projects/superslide/": { redirect: "/en/games/superslide/" },
        "/projects/flappy-christmas/": { redirect: "/games/flappy-christmas/" },
        "/en/projects/flappy-christmas/": { redirect: "/en/games/flappy-christmas/" },
        "/games/superslide/": { redirect: "https://supersli.de/de" },
        "/en/games/superslide/": { redirect: "https://supersli.de/en" },
        "/idiot-test/": { redirect: "/fun/idiot-test/" },
        "/en/idiot-test/": { redirect: "/en/fun/idiot-test/" },
        "/christmas-quiz/": { redirect: "/fun/christmas-quiz/" },
        "/en/christmas-quiz/": { redirect: "/en/fun/christmas-quiz/" },
    },
    seo: {
        fallbackTitle: false,
    },
    image: {
        provider: "ipx",
        ipx: {
            modifiers: {
                format: "webp",
            },
        },
    },
});
