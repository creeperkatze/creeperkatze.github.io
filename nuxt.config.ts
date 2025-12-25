import { defineNuxtConfig } from "nuxt/config";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
    telemetry: false,
    devtools: { enabled: true },
    css: ["~/assets/styles/main.css", "~/assets/styles/content.css"],
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap", "@nuxtjs/i18n", "@nuxt/content", "@nuxt/eslint", "nuxt-schema-org", "nuxt-seo-utils", "nuxt-link-checker", "@nuxt/image", "@nuxt/fonts"],
    nitro: {
        prerender: {
            failOnError: false,
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
                files: ["de.json", "idiot-test/de.json", "christmas-quiz/de.json", "common-knowledge-quiz/de.json", "new-year-quiz/de.json"],
            },
            {
                code: "en",
                language: "en-US",
                name: "English",
                files: ["en.json", "idiot-test/en.json", "christmas-quiz/en.json", "common-knowledge-quiz/en.json", "new-year-quiz/en.json"],
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
        "/joke/": { redirect: { to: "/generators/joke/", statusCode: 301 } },
        "/en/joke/": { redirect: { to: "/en/generators/joke/", statusCode: 301 } },
        "/cat/": { redirect: { to: "/generators/cat/", statusCode: 301 } },
        "/en/cat/": { redirect: { to: "/en/generators/cat/", statusCode: 301 } },
        "/projects/": { redirect: { to: "/games//", statusCode: 301 } },
        "/en/projects/": { redirect: { to: "/en/games/", statusCode: 301 } },
        "/projects/superslide/": { redirect: { to: "/games/superslide/", statusCode: 301 } },
        "/en/projects/superslide/": { redirect: { to: "/en/games/superslide/", statusCode: 301 } },
        "/projects/flappy-christmas/": { redirect: { to: "/games/flappy-christmas/", statusCode: 301 } },
        "/en/projects/flappy-christmas/": { redirect: { to: "/en/games/flappy-christmas/", statusCode: 301 } },
        "/games/superslide/": { redirect: { to: "https://supersli.de/de", statusCode: 301 } },
        "/en/games/superslide/": { redirect: { to: "https://supersli.de/en", statusCode: 301 } },
        "/idiot-test/": { redirect: { to: "/fun/idiot-test/", statusCode: 301 } },
        "/en/idiot-test/": { redirect: { to: "/en/fun/idiot-test/", statusCode: 301 } },
        "/christmas-quiz/": { redirect: { to: "/fun/christmas-quiz/", statusCode: 301 } },
        "/en/christmas-quiz/": { redirect: { to: "/en/fun/christmas-quiz/", statusCode: 301 } },
        "/common-knowledge-quiz/": { redirect: { to: "/fun/common-knowledge-quiz/", statusCode: 301 } },
        "/en/common-knowledge-quiz/": { redirect: { to: "/en/fun/common-knowledge-quiz/", statusCode: 301 } },
        "/new-year-quiz/": { redirect: { to: "/fun/new-year-quiz/", statusCode: 301 } },
        "/en/new-year-quiz/": { redirect: { to: "/en/fun/new-year-quiz/", statusCode: 301 } },
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
