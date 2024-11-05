<template>
    <div v-if="showBanner" class="relative flex items-center bg-green-600 overflow-hidden">
        <NuxtLink to="/projects/superslide" class="flex-grow">
            <p class="scrolling-text text-white text-left whitespace-nowrap overflow-visible">
                Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide
                0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21
                Released
            </p>
        </NuxtLink>
        <!-- Close icon with absolute positioning -->
        <IconClose @click.stop="showBanner = false"
            class="absolute bg-green-600 right-0 w-6 h-6 fill-white cursor-pointer" />
    </div>
    <div class="bg-black ignore-scrollbar pt-4 pb-4 mb-4">
        <div class="wrapper flex items-center justify-between px-4">
            <!-- Logo -->
            <NuxtLink to="/">
                <picture>
                    <!-- Fallback for very small screens -->
                    <source srcset="/images/Logo.png" media="(max-width: 640px)" />
                    <!-- Default Logo Banner -->
                    <img src="/images/LogoBanner.png" alt="Creeperkatze" class="pixelated shrink-0 min-w-8 min-h-8">
                </picture>
            </NuxtLink>

            <!-- Links -->
            <div class="flex flex-wrap justify-start gap-4 mx-4">
                <NuxtLink to="/" class="navbar-element">{{ $t('navbar.home') }}</NuxtLink>
                <div class="dropdown relative inline-flex">
                    <NuxtLink to="/projects" id="dropdown-hover-event" type="button"
                        class="inline-flex navbar-element items-center" aria-haspopup="menu" aria-expanded="false"
                        aria-label="Dropdown">
                        {{ $t('navbar.projects') }}
                        <IconArrowDown class="size-4" />
                    </NuxtLink>

                    <div class="dropdown-menu transition duration-100 hidden rounded-md bg-black border border-gray-800 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-10"
                        role="menu" aria-orientation="vertical" aria-labelledby="dropdown-hover-event">
                        <div class="p-1 pl-1 text-left text-nowrap">
                            <NuxtLink to="/projects/superslide" class="navbar-element">Superslide</NuxtLink>
                        </div>
                        <div class="p-1 pl-1 text-left text-nowrap">
                            <NuxtLink to="/projects/flappy-christmas" class="navbar-element">Flappy Christmas</NuxtLink>
                        </div>
                    </div>
                </div>
                <NuxtLink to="/skills" class="navbar-element">{{ $t('navbar.skills') }}</NuxtLink>
                <NuxtLink to="/blog" class="navbar-element">{{ $t('navbar.blog') }}</NuxtLink>
                <NuxtLink to="/joke" class="navbar-element">{{ $t('navbar.joke') }}</NuxtLink>
            </div>

            <!-- Buttons -->
            <div class="flex flex-row gap-4"> <!-- Added a flex container for spacing -->
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
                <LangSwitcher />
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
    @apply no-underline text-white hover:text-gray-400;
}

.navbar-element.router-link-active
{
    @apply text-green-600;
}

.navbar-social-media-icon
{
    @apply transition-transform duration-200 hover:scale-110 fill-black;
}


.dropdown:hover .dropdown-menu
{
    display: block;
    opacity: 1;
    position: absolute;
    margin-top: 30px;
}

nav,
.navbar,
.navbar-container
{
    overflow: visible;
}

.scrolling-text
{
    animation: scroll 30s linear infinite;
    /* Calls the scroll animation */
}

@keyframes scroll
{
    0%
    {
        transform: translateX(100%);
        /* Start at right */
    }

    100%
    {
        transform: translateX(-100%);
        /* End at left */
    }
}
</style>

<script>
export default {

    data()
    {
        return {
            showBanner: false, // Change to true to activate the Superslide campaign
            dropdownOpen: false // State to track dropdown visibility
        };
    },
    methods: {
        toggleDropdown()
        {
            this.dropdownOpen = !this.dropdownOpen; // Toggle dropdown state
        }
    }
};
</script>