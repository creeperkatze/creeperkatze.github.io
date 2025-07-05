<template>
    <h2 class="mb-4 text-2xl sm:text-3xl">{{ $t("page.index.introduction") }}</h2>
    <h1 class="mb-4 text-3xl sm:text-4xl"><TypingEffect :phrases='[ $t("page.index.typing_effect.unity_dev"), $t("page.index.typing_effect.mobile_game_dev"), $t("page.index.typing_effect.web_dev"), $t("page.index.typing_effect.stardew_modder"), $t("page.index.typing_effect.pixel_artist")]' :loop="true" /></h1>
    <p class="mb-4 whitespace-pre-line">
        {{ $t("page.index.welcome") }}
    </p>
    <h1 class="mb-6">{{ $t("page.index.title_projects") }}</h1>
    <GameCards />
    <WebsiteCards />
</template>

<script setup>
definePageMeta({
  title: 'page.index.title',
  description: 'page.index.description',
  image: '/images/Logo.png'
})
</script>