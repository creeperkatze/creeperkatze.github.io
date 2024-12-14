<template>
    <h1 class="mb-5">{{ $t("page.skills.title_software") }}</h1>
    <div class="flex flex-wrap justify-center gap-4">
        <a v-for="(item, index) in softwareItems" :key="item.name" :href="item.link" target="_blank"
            :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
            <img :src="images[`${item.icon}`]" class="w-32 h-32 transition ease-in-out hover:-translate-y-2">
        </a>
    </div>

    <h1 class="mt-5 mb-5">{{ $t("page.skills.title_technologies") }}</h1>
    <div class="flex flex-wrap justify-center gap-4">
        <a v-for="(item, index) in techItems" :key="item.name" :href="item.link" target="_blank"
            :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
            <img :src="images[`${item.icon}`]" class="w-32 h-32 transition ease-in-out hover:-translate-y-2">
        </a>
    </div>
</template>

<script setup>
import { filename } from 'pathe/utils'

definePageMeta({
    title: 'page.skills.title',
    description: 'page.skills.description',
    image: '/images/seo/skills.jpg'
})

const glob = import.meta.glob('@/assets/icons/*.svg', { eager: true })
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

console.log(images);

const softwareItems = [
    { name: 'Unity', link: 'https://unity.com/', icon: 'unity' }
];

const techItems = [
    { name: 'C#', link: 'https://dotnet.microsoft.com/en-us/languages/csharp', icon: 'csharp' },
    { name: 'Python', link: 'https://www.python.org/', icon: 'python' },
    { name: 'HTML', link: 'https://www.w3.org/standards/', icon: 'html' },
    { name: 'CSS', link: 'https://www.w3.org/standards/', icon: 'css' },
    { name: 'Vue', link: 'https://vuejs.org/', icon: 'vue' },
    { name: 'Nuxt', link: 'https://nuxt.com/', icon: 'nuxt' },
    { name: 'Tailwind', link: 'https://tailwindcss.com/', icon: 'tailwind' },
    { name: 'Git', link: 'https://git-scm.com/', icon: 'git' },
];
</script>

<style>
.animated-item
{
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s forwards;
}

@keyframes fadeInUp
{
    to
    {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>