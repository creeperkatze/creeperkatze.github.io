<template>
    <div v-if="showBanner" class="relative flex items-center bg-green-600 overflow-hidden z-50" data-nosnippet>
        <NuxtLink :to="localePath('/projects/superslide/')" class="flex-grow">
            <p class="scrolling-text text-white text-left whitespace-nowrap overflow-visible">
                Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide
                0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21 Released +++ Superslide 0.0.21
                Released
            </p>
        </NuxtLink>
        <IconClose class="absolute fill-white right-0 w-6 h-6 cursor-pointer" @click.stop="showBanner = false" />
    </div>
    <header class="relative z-50 bg-black max-w-screen pt-4 pb-4 mb-4 lg:pl-[calc(100vw-100%)]" data-nosnippet>
        <div class="wrapper flex items-center justify-between px-4 space-x-4">
            <!-- Logo -->
            <div class="flex flex-row gap-4">
                <NuxtLink :to="localePath('/')">

                    <img :src="isDecember ? images['LogoBannerChristmas'] : images['LogoBanner']" alt="Creeperkatze"
                        class="pixelated object-contain shrink-0 min-w-8 min-h-8 hidden lg:block">
                    <img :src="isDecember ? images['LogoChristmas'] : images['Logo']" alt="Creeperkatze"
                        class="pixelated object-contain shrink-0 min-w-8 min-h-8 lg:hidden">
                </NuxtLink>
                <div class="lg:hidden flex items-center">
                    <button @click="drawerOpen = !drawerOpen">
                        <IconDrawer class="h-8 w-8 text-white" :alt="$t('button.drawer')"/>
                    </button>
                </div>
            </div>

            <!-- Links for desktop view -->
            <nav class="hidden lg:block">
                <div class="flex justify-start gap-4 mx-4">
                    <NuxtLink :to="localePath('/')" class="navbar-element">{{ $t('navbar.home') }}</NuxtLink>
                    <Dropdown :title="$t('navbar.projects')" :titleLink="localePath('/projects/')" :items="[
                        { name: $t('navbar.superslide'), link: '/projects/superslide/' },
                        { name: $t('navbar.flappy-christmas'), link: '/projects/flappy-christmas/' }
                    ]" />
                    <NuxtLink :to="localePath('/skills/')" class="navbar-element">{{ $t('navbar.skills') }}</NuxtLink>
                    <NuxtLink :to="localePath('/blog/')" class="navbar-element">{{ $t('navbar.blog') }}</NuxtLink>
                    <Dropdown :title="$t('navbar.generators')" :titleLink="localePath('/generators/')" :items="[
                        { name: $t('navbar.joke'), link: '/generators/joke/' },
                        { name: $t('navbar.cat'), link: '/generators/cat/' }
                    ]" />
                    <NuxtLink :to="localePath('/idiot-test/')" class="navbar-element">{{ $t('navbar.idiot-test') }}
                    </NuxtLink>
                    <NuxtLink :to="localePath('/christmas-quiz/')"
                        :class="['navbar-element', { 'christmas-stripes': isDecember }]">{{
                            $t('navbar.christmas-quiz') }}</NuxtLink>
                </div>
            </nav>

            <!-- Buttons -->
            <div class="flex flex-row gap-4">
                <NuxtLink to="https://www.instagram.com/creeperkatze/" target="_blank" aria-label="Instagram">
                    <IconInstagram
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </NuxtLink>
                <NuxtLink href="https://creeperkatze.itch.io/" target="_blank" aria-label="Itch.io">
                    <IconItch
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </NuxtLink>
                <NuxtLink href="https://github.com/creeperkatze" target="_blank" aria-label="GitHub">
                    <IconGithub
                        class="w-8 h-8 text-white hover:text-green-600 transform hover:scale-125 transition ease-in-out" />
                </NuxtLink>
                <LangSwitcher />
            </div>
        </div>
    </header>

    <!-- Drawer Menu for Mobile -->
    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform -translate-y-full"
        enter-to-class="transform translate-y-0" leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform translate-y-0" leave-to-class="transform -translate-y-full">
        <div v-show="drawerOpen" class="absolute w-full bg-black -mt-4 pb-4 z-40 lg:hidden" data-nosnippet>
            <nav class="flex flex-col text-left space-y-4 ml-4">
                <NuxtLink :to="localePath('/')" class="navbar-element text-left" @click="drawerOpen = !drawerOpen">{{
                    $t('navbar.home') }}</NuxtLink>
                <DropdownDrawer :title="$t('navbar.projects')" :titleLink="localePath('/projects/')" :items="[
                    { name: $t('navbar.superslide'), link: '/projects/superslide/' },
                    { name: $t('navbar.flappy-christmas'), link: '/projects/flappy-christmas' } 
                    ]" :drawerOpen="drawerOpen" @item-clicked="drawerOpen = !drawerOpen"/>
                <NuxtLink :to="localePath('/skills/')" class="navbar-element text-left"
                    @click="drawerOpen = !drawerOpen">{{
                        $t('navbar.skills')
                    }}</NuxtLink>
                <NuxtLink :to="localePath('/blog/')" class="navbar-element text-left" @click="drawerOpen = !drawerOpen">
                    {{
                        $t('navbar.blog') }}
                </NuxtLink>
                <DropdownDrawer :title="$t('navbar.generators')" :titleLink="localePath('/generators/')" :items="[
                    { name: $t('navbar.joke'), link: '/generators/joke' },
                    { name: $t('navbar.cat'), link: '/generators/cat/' }
                    ]" :drawerOpen="drawerOpen" @item-clicked="drawerOpen = !drawerOpen"/>
                <NuxtLink :to="localePath('/idiot-test/')" class="navbar-element text-left"
                    @click="drawerOpen = !drawerOpen">{{
                        $t('navbar.idiot-test') }}</NuxtLink>
                <NuxtLink :to="localePath('/christmas-quiz/')" class="navbar-element text-left christmas-stripes"
                    @click="drawerOpen = !drawerOpen">{{
                        $t('navbar.christmas-quiz') }}</NuxtLink>
            </nav>
        </div>
    </Transition>
</template>

<script setup>
import { filename } from 'pathe/utils'

const localePath = useLocalePath()

const showBanner = ref(false);
const drawerOpen = ref(false);

const isDecember = new Date().getMonth() === 11;

const glob = import.meta.glob('@/assets/images/*.png', { eager: true })
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)
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

.christmas-stripes:not(.router-link-active)
{
    background: repeating-linear-gradient(-45deg, rgba(255, 96, 96, 1), rgba(255, 96, 96, 1) 5%, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 1) 10%);
    background-size: 80% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>