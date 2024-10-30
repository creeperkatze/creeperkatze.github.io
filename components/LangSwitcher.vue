<script setup>
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
{
    return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
    <link rel="preload" href="/images/lang/de.svg" as="image" type="image/svg+xml" />
    <link rel="preload" href="/images/lang/en.svg" as="image" type="image/svg+xml" />

    <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="setLocale(locale.code)"
        class="self-center">
        <img :src="`/images/lang/${locale.code}.svg`" alt="Language"
            class="w-8 rounded-lg border-2 border-white transition-transform duration-200 hover:scale-125" />
    </a>
</template>