<script setup>
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() =>
{
    return locales.value.filter(i => i.code !== locale.value)
})

</script>

<template>
    <div v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="() => setLocale(locale.code)"
        class="self-center hover:cursor-pointer">
        <img :src="`/images/flags/${locale.code}.svg`" alt="Language"
            class="w-8 rounded-lg border-2 border-white transition-transform duration-200 hover:scale-125" />
    </div>
</template>