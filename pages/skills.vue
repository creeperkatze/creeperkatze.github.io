<template>
    <div class="mx-auto max-w-4xl">
        <h1 class="mb-5">{{ $t("page.skills.title_software") }}</h1>
        <div class="flex flex-wrap justify-center gap-4">
            <a v-for="(item, index) in softwareItems" :key="item.name" :href="item.link" target="_blank"
                :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
                <img :src="images[`${item.icon}`]" class="w-32 h-32 transition ease-in-out hover:-translate-y-2"
                    :alt="item.name">
            </a>
        </div>

        <h1 class="mt-5 mb-5">{{ $t("page.skills.title_technologies") }}</h1>
        <div class="flex flex-wrap justify-center gap-4">
            <a v-for="(item, index) in techItems" :key="item.name" :href="item.link" target="_blank"
                :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
                <img :src="images[`${item.icon}`]" class="w-32 h-32 transition ease-in-out hover:-translate-y-2"
                    :alt="item.name">
            </a>
        </div>
    </div>
</template>

<script setup>
import { filename } from 'pathe/utils'

definePageMeta({
    title: 'page.skills.title',
    description: 'page.skills.description',
    image: '/images/seo/skills.jpg'
})

const glob = import.meta.glob('@/assets/images/skills/*', { eager: true })
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const softwareItems = [
    { name: 'Unity', link: 'https://unity.com/', icon: 'unity' },
    { name: 'Visual Studio', link: 'https://visualstudio.microsoft.com/', icon: 'vs' },
    { name: 'Visual Studio Code', link: 'https://code.visualstudio.com/', icon: 'vscode' },
];

const techItems = [
    { name: 'C#', link: 'https://dotnet.microsoft.com/en-us/languages/csharp', icon: 'csharp' },
    { name: 'Python', link: 'https://www.python.org/', icon: 'python' },
    { name: 'HTML', link: 'https://www.w3.org/standards/', icon: 'html' },
    { name: 'CSS', link: 'https://www.w3.org/standards/', icon: 'css' },
    { name: 'JavaScript', link: 'https://www.w3.org/standards/', icon: 'js' },
    { name: 'Node', link: 'https://nodejs.org/', icon: 'node' },
    { name: 'Vue', link: 'https://vuejs.org/', icon: 'vue' },
    { name: 'Nuxt', link: 'https://nuxt.com/', icon: 'nuxt' },
    { name: 'Tailwind', link: 'https://tailwindcss.com/', icon: 'tailwind' },
    { name: 'Git', link: 'https://git-scm.com/', icon: 'git' },
    { name: 'Express', link: 'https://expressjs.com/', icon: 'express' },
    { name: 'MongoDB', link: 'https://www.mongodb.com/', icon: 'mongodb' },
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