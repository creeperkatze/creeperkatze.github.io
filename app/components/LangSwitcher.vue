<template>
    <button v-for="currentLocale in availableLocales" :key="currentLocale.code" class="self-center min-w-8 min-h-8"
        @click.prevent.stop="() => setLocale(currentLocale.code)">
        <img :src="`/images/flags/${currentLocale.code}.svg`" :alt="currentLocale.name"
            class="rounded-lg border-2 border-white transition-transform duration-200 hover:scale-125">
    </button>
</template>

<script setup>
const { locale, locales, setLocale } = useI18n();

const availableLocales = computed(() =>
{
    return locales.value.filter((i) => i.code !== locale.value);
});
</script>
