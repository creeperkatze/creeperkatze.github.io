<template>
    <h2 class="mb-4">{{ $t("index.introduction") }}</h2>
    <h1 class="mb-4"><TypingEffect :phrases='[ $t("index.typing_effect.unity_dev"), $t("index.typing_effect.mobile_game_dev"), $t("index.typing_effect.web_dev"), $t("index.typing_effect.stardew_modder"), $t("index.typing_effect.pixel_artist"), $t("index.typing_effect.superslide_dev"),]' :loop="true" /></h1>
    <p class="mb-4 whitespace-pre-line">
        {{ $t("index.welcome") }}
    </p>
    <h2 class="mb-4">{{ $t("index.title_projects") }}</h2>
    <Projects />
</template>

<script setup lang="ts">
useHead({
    title: "Home | Creeperkatze",
})
</script>