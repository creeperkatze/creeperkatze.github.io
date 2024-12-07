<template>
    <h2 class="mb-4">{{ $t("page.index.introduction") }}</h2>
    <h1 class="mb-4"><TypingEffect :phrases='[ $t("page.index.typing_effect.unity_dev"), $t("page.index.typing_effect.mobile_game_dev"), $t("page.index.typing_effect.web_dev"), $t("page.index.typing_effect.stardew_modder"), $t("page.index.typing_effect.pixel_artist"), $t("page.index.typing_effect.superslide_dev"),]' :loop="true" /></h1>
    <p class="mb-4 whitespace-pre-line">
        {{ $t("page.index.welcome") }}
    </p>
    <h2 class="mb-4">{{ $t("page.index.title_projects") }}</h2>
    <Projects />
</template>

<script setup>

definePageMeta({
  title: 'page.index.title',
  description: 'page.index.description',
  image: '/images/seo/default.png'
})

</script>