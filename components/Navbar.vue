<template>
    <div v-if="showBanner" class="relative flex items-center bg-green-600 overflow-hidden" data-nosnippet>
        <NuxtLink :to="localePath('/projects/superslide/')" class="flex-grow">
            <p class="scrolling-text text-white text-left whitespace-nowrap overflow-visible">
                Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide
                0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21
                Released
            </p>
        </NuxtLink>
        <img src="~/assets/icons/close.svg" :alt="$t('button.close')" class="absolute bg-green-600 right-0 w-6 h-6 fill-white cursor-pointer"
            @click.stop="showBanner = false">
    </div>
    <header class="relative z-50 bg-black w-screen pt-4 pb-4 mb-4" data-nosnippet>
        <div class="wrapper flex items-center justify-between px-4">
            <!-- Logo -->
            <div class="flex flex-row gap-4">
                <NuxtLink :to="localePath('/')">
                    <img src="~/assets/images/LogoBanner.png" alt="Creeperkatze"
                        class="pixelated object-contain shrink-0 min-w-8 min-h-8 hidden lg:block">
                    <img src="~/assets/images/Logo.png" alt="Creeperkatze"
                        class="pixelated object-contain shrink-0 min-w-8 min-h-8 lg:hidden">
                </NuxtLink>
                <div class="lg:hidden flex items-center">
                    <button @click="drawer">
                        <svg class="h-8 w-8 text-white" :alt="$t('button.drawer')" fill="none" stroke-linecap="round" stroke-linejoin="round"
                            stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Links for desktop view -->
            <nav class="hidden lg:block">
                <div class="flex justify-start gap-4 mx-4">
                    <NuxtLink :to="localePath('/')" class="navbar-element">{{ $t('navbar.home') }}</NuxtLink>
                    <div class="dropdown relative inline-flex" @mouseenter="dropdownOpen = true" @mouseleave="dropdownOpen = false">
                        <NuxtLink id="dropdown-hover-event" :to="localePath('/projects')" type="button"
                            class="inline-flex navbar-element items-center" aria-haspopup="menu" aria-expanded="false"
                            aria-label="Dropdown">
                            {{ $t('navbar.projects') }}
                            <IconDown class="size-4 transform transition-all" :class="{ 'rotate-180': dropdownOpen }" />
                        </NuxtLink>

                        <div class="dropdown-menu transition duration-100 hidden rounded-md bg-black border border-gray-400 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full z-10"
                            role="menu" aria-orientation="vertical" aria-labelledby="dropdown-hover-event">
                            <div class="p-1 pl-1 text-left text-nowrap">
                                <NuxtLink :to="localePath('/projects/superslide/')" class="navbar-element">Superslide
                                </NuxtLink>
                            </div>
                            <div class="p-1 pl-1 text-left text-nowrap">
                                <NuxtLink :to="localePath('/projects/flappy-christmas/')" class="navbar-element">Flappy
                                    Christmas
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <NuxtLink :to="localePath('/skills/')" class="navbar-element">{{ $t('navbar.skills') }}</NuxtLink>
                    <NuxtLink :to="localePath('/blog/')" class="navbar-element">{{ $t('navbar.blog') }}</NuxtLink>
                    <NuxtLink :to="localePath('/joke/')" class="navbar-element">{{ $t('navbar.joke') }}</NuxtLink>
                    <NuxtLink :to="localePath('/cat/')" class="navbar-element">{{ $t('navbar.cat') }}</NuxtLink>
                    <NuxtLink :to="localePath('/idiot-test/')" class="navbar-element">{{ $t('navbar.idiot_test') }}
                    </NuxtLink>
                </div>
            </nav>

            <!-- Buttons -->
            <div class="flex flex-row gap-4">
                <a href="https://www.instagram.com/creeperkatze/" target="_blank" aria-label="Instagram">
                    <IconInstagram
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://creeperkatze.itch.io/" target="_blank" aria-label="Itch.io">
                    <IconItch
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <a href="https://github.com/creeperkatze" target="_blank" aria-label="GitHub">
                    <IconGithub
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </a>
                <LangSwitcher />
            </div>
        </div>
    </header>

    <!-- Drawer Menu for Mobile -->
    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform -translate-y-full"
        enter-to-class="transform translate-y-0" leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform translate-y-0" leave-to-class="transform -translate-y-full">
        <div v-show="drawerOpen" class="absolute w-full bg-black -mt-4 pb-4 z-40 lg:hidden" data-nosnippet>
            <nav class="flex flex-col items-center justify-center space-y-4">
                <NuxtLink to="/" class="navbar-element text-left" @click="drawer">{{ $t('navbar.home') }}</NuxtLink>
                <NuxtLink :to="localePath('/projects')" class="navbar-element text-left" @click="drawer">
                    {{ $t('navbar.projects') }}</NuxtLink>
                <NuxtLink :to="localePath('/skills/')" class="navbar-element text-left" @click="drawer">{{
                    $t('navbar.skills')
                    }}</NuxtLink>
                <NuxtLink :to="localePath('/blog/')" class="navbar-element text-left" @click="drawer">{{
                    $t('navbar.blog') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/joke/')" class="navbar-element text-left" @click="drawer">{{
                    $t('navbar.joke') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/cat/')" class="navbar-element text-left" @click="drawer">{{ $t('navbar.cat')
                    }}
                </NuxtLink>
                <NuxtLink :to="localePath('/idiot-test/')" class="navbar-element text-left" @click="drawer">{{
                    $t('navbar.idiot_test') }}</NuxtLink>
            </nav>
        </div>
    </Transition>
</template>

<script setup>
const localePath = useLocalePath()

const showBanner = ref(false);
const drawerOpen = ref(false);
const dropdownOpen = ref(false);

function drawer()
{
    drawerOpen.value = !drawerOpen.value;
}
</script>

<style setup>
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