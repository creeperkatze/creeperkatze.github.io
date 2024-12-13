<template>
    <h1 class="mb-5">{{ $t("page.skills.title_software") }}</h1>
    <div class="flex flex-wrap justify-center gap-4">
        <a v-for="(item, index) in softwareItems" :key="item.name" :href="item.link" target="_blank"
            :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
            <IconUnity class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
        </a>
    </div>

    <h1 class="mt-5 mb-5">{{ $t("page.skills.title_technologies") }}</h1>
    <div class="flex flex-wrap justify-center gap-4">
        <a v-for="(item, index) in techItems" :key="item.name" :href="item.link" target="_blank"
            :style="{ animationDelay: index * 0.1 + 's' }" class="animated-item">
            <IconCSharp v-if="item.name === 'C#'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconPython v-if="item.name === 'Python'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconHtml v-if="item.name === 'HTML'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconCss v-if="item.name === 'CSS'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconVue v-if="item.name === 'Vue'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconNuxt v-if="item.name === 'Nuxt'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconTailwind v-if="item.name === 'Tailwind'"
                class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
            <IconGit v-if="item.name === 'Git'" class="w-32 h-32 transition ease-in-out hover:-translate-y-2" />
        </a>
    </div>
</template>

<script setup>

definePageMeta({
    title: 'page.skills.title',
    description: 'page.skills.description',
    image: '/images/seo/skills.jpg'
})

const softwareItems = [
    { name: 'Unity', link: 'https://unity.com/' }
];

const techItems = [
    { name: 'C#', link: 'https://dotnet.microsoft.com/en-us/languages/csharp', icon: 'IconCSharp' },
    { name: 'Python', link: 'https://www.python.org/', icon: 'IconPython' },
    { name: 'HTML', link: 'https://www.w3.org/standards/', icon: 'IconHtml' },
    { name: 'CSS', link: 'https://www.w3.org/standards/', icon: 'IconCss' },
    { name: 'Vue', link: 'https://vuejs.org/', icon: 'IconVue' },
    { name: 'Nuxt', link: 'https://nuxt.com/', icon: 'IconNuxt' },
    { name: 'Tailwind', link: 'https://tailwindcss.com/', icon: 'IconTailwind' },
    { name: 'Git', link: 'https://git-scm.com/', icon: 'IconGit' },
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