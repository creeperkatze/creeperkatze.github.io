import svgLoader from "vite-svg-loader"

export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules:
        [['@nuxtjs/google-fonts',
            {
                families:
                {
                    Lexend: true,
                }
            }
        ], '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@nuxtjs/sitemap'],

    googleFonts:
    {
        download: false
    },

    vite:
    {
        plugins: [svgLoader({
            defaultImport: "url"
        })]
    },
});