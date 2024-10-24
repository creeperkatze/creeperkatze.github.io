#imports

<template>
    <div class="bg-black ignore-scrollbar pt-4 pb-4 mb-4">
        <div class="wrapper flex items-center justify-between">
            <!-- Logo -->
            <NuxtLink to="/">
                <picture>
                    <!-- Fallback for very small screens -->
                    <source srcset="~/assets/images/Logo.png" media="(max-width: 640px)" />
                    <!-- Default Logo Banner -->
                    <img src="~/assets/images/LogoBanner.png" class="pixelated">
                </picture>
            </NuxtLink>

            <!-- Links -->
            <div class="px-4 space-x-4">
                <NuxtLink to="/" class="navbar-element">Home</NuxtLink>
                <div class="m-1 dropdown relative inline-flex">
                    <NuxtLink to="/projects" id="dropdown-hover-event" type="button"
                        class="inline-flex navbar-element items-center" aria-haspopup="menu"
                        aria-expanded="false" aria-label="Dropdown">
                        Projects
                        <IconArrowDown class="size-4"/>
                    </NuxtLink>

                    <div class="dropdown-menu transition duration-100 hidden rounded-md bg-black border border-gray-800 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
                        role="menu" aria-orientation="vertical" aria-labelledby="dropdown-hover-event">
                        <div class="p-1 pl-1 text-left text-nowrap">
                            <NuxtLink to="/projects/superslide" class="navbar-element">Superslide</NuxtLink>
                        </div>
                        <div class="p-1 pl-1 text-left text-nowrap">
                            <NuxtLink to="/projects/flappy-christmas" class="navbar-element">Flappy Christmas</NuxtLink>
                        </div>
                    </div>
                </div>
                <NuxtLink to="/skills" class="navbar-element">Skills</NuxtLink>
            </div>

            <!-- Buttons -->
            <div class="flex flex-row space-x-4"> <!-- Added a flex container for spacing -->
                <a href="https://www.instagram.com/creeperkatze/" target="_blank">
                    <IconInstagram
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://creeperkatze.itch.io/" target="_blank">
                    <IconItch
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://github.com/Creeperkatze" target="_blank">
                    <IconGitHub
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
            </div>
        </div>
    </div>
</template>

<style>
.wrapper
{
    @apply max-w-screen-xl mx-auto
}


.navbar-element
{
    @apply no-underline text-white hover:text-gray-500;
}

.navbar-element.router-link-active
{
    @apply text-green-600;
}

.navbar-social-media-icon
{
    @apply transition-transform duration-200 hover:scale-110 fill-black;
}

/* Show the dropdown on hover */
.dropdown:hover .dropdown-menu
{
    display: block;
    opacity: 1;
    position: absolute;
    margin-top: 30px;
}

/* Ensure that parent elements don't restrict overflow */
nav,
.navbar,
.navbar-container
{
    overflow: visible;
}
</style>

<script>
export default {
    data() {
        return {
            dropdownOpen: false // State to track dropdown visibility
        };
    },
    methods: {
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown state
        }
    }
};
</script>