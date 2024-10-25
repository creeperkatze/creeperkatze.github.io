<script setup>
const { locale, locales, setLocale } = useI18n()

const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})
</script>

<template>
  <a href="#" v-for="locale in availableLocales" :key="locale.code" @click.prevent.stop="setLocale(locale.code)" class="self-center">
    <NuxtImg :src="`/images/lang/${locale.code}.svg`" width="32" class="rounded-lg border-2 border-white transition-transform duration-200 hover:scale-125"/>
  </a>
</template>