<template>
    <button v-for="locale in availableLocales" :key="locale.code" class="self-center min-w-8 min-h-8"
        @click.prevent.stop="() => setLocale(locale.code)">
        <img :src="images[`${locale.code}`]" alt="Language"
            class="rounded-lg border-2 border-white transition-transform duration-200 hover:scale-125">
    </button>
</template>

<script setup>
import { filename } from 'pathe/utils'

const glob = import.meta.glob('@/assets/images/flags/*.svg', { eager: true })
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const { locales, setLocale } = useI18n();

const availableLocales = computed(() =>
{
    return locales.value.filter((i) => i.code !== locale.value);
});
</script>
