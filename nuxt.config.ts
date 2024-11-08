import svgLoader from "vite-svg-loader"

export default defineNuxtConfig({
    compatibilityDate: "2024-04-03",
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

    sitemap: {
        urls: [
          {
            loc: '/',
            lastmod: '2024-01-01',
          },
          {
            loc: '/projects',
            lastmod: '2024-10-18',
          },
          {
            loc: '/projects/superslide',
            lastmod: '2024-11-01',
          },
          {
            loc: '/projects/flappy-christmas',
            lastmod: '2024-11-01',
          },
          {
            loc: '/skills',
            lastmod: '2024-10-24',
          },
          {
            loc: '/blog',
            lastmod: '2024-10-25',
          },
          {
            loc: '/joke',
            lastmod: '2024-11-06',
          },
          {
            loc: '/cat',
            lastmod: '2024-01-01',
          },
        ]
      }
});