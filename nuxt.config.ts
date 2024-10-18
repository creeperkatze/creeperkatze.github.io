// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    css: ['~/assets/css/main.css'],
    modules:
        [
            ['@nuxtjs/google-fonts',
                {
                    families:
                    {
                        Lexend: true,
                    }
                }
            ],
            '@nuxtjs/tailwindcss'
        ],

    googleFonts:
    {
        download: false
    },

    app:
    {

        head:
        {
            htmlAttrs:
            {
                lang: "en",
            },
            title: 'Creeperkatze |',
            meta:
                [
                    {
                        name: "viewport",
                        content: "width=device-width, initial-scale=1, viewport-fit=cover",
                    },
                ],
        },
    },
})