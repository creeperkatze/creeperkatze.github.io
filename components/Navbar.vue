<template>
    <div class="dark:bg-black">
        <div class="wrapper flex items-center justify-between p-4 mb-5">
            <!-- Logo -->
            <nuxt-link href="/">
                <picture>
                    <!-- Fallback for very small screens -->
                    <source srcset="~/assets/images/Logo.png" media="(max-width: 640px)" />
                    <!-- Default Logo Banner -->
                    <img src="~/assets/images/LogoBanner.png" class="pixelated">
                </picture>
            </nuxt-link>

            <!-- Links -->
            <div class="space-x-4">
                <a href="/" class="navbar-element">Home</a>
                <a href="/superslide" class="navbar-element">Superslide</a>
            </div>

            <!-- Buttons -->
            <div class="flex flex-row space-x-4"> <!-- Added a flex container for spacing -->
                <a href="https://www.instagram.com/creeperkatze/" target="_blank">
                    <IconInstagram class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://creeperkatze.itch.io/" target="_blank">
                    <IconItch class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://github.com/Creeperkatze" target="_blank">
                    <IconGitHub class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() =>
{
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-element');

    navLinks.forEach(link =>
    {
        if (link.getAttribute('href') === currentPath)
        {
            link.classList.add('active');
        }
    });
})
</script>

<style>
.navbar-element
{
    @apply no-underline text-black dark:text-white hover:text-gray-500;
}

.navbar-element.active
{
    @apply text-green-600;
    text-decoration: underline;
}

.navbar-social-media-icon
{
    @apply transition-transform duration-200 hover:scale-110 fill-black;
}

.navbar-social-media-icon:hover
{
    filter: invert(46%) sepia(71%) saturate(4019%) hue-rotate(119deg) brightness(95%) contrast(83%);
}
</style>