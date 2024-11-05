<template>
    <div class="flex flex-col min-h-screen justify-center items-center">
        <div class="rounded-lg border-gray-300 border-2 p-4 max-w-screen-sm">
            <h1 class="mt-4">{{ joke }}</h1>
            <p class="mb-4" v-html="$t('joke.credits')"></p>
            <Button link="/joke" @click="fetchJoke" buttonTextKey="button.new_joke" :rainbowBackground="true"/>
        </div>
    </div>
</template>
<script setup>
import { useJoke } from '~/composables/useJoke.ts';

const { joke, error, fetchJoke } = useJoke();

onMounted(() =>
{
    fetchJoke();
});
</script>