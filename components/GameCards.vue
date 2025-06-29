<template>
    <div class="flex justify-center mx-auto flex-col w-fit">
        <h2 class="text-left mb-2">{{ $t('page.games.subtitle.games') }}</h2>
        <hr class="mb-2">
        <div class="grid md:grid-cols-2 gap-2">
            <Card :link="'https://supersli.de'" image="/images/superslide/SplashBackgroundGameTitle.png"
                alt="Superslide Banner" :title="$t('page.games.project.superslide.title')"
                :description="$t('page.games.project.superslide.description')" />
            <Card :link="localePath('/games/flappy-christmas/')" image="/images/flappy-christmas/Cover.png"
                alt="Flappy Christmas Banner" :title="$t('page.games.project.flappy_christmas.title')"
                :description="$t('page.games.project.flappy_christmas.description')" />
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>