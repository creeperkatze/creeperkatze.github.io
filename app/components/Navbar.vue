<template>
    <header class="top-4 z-40 sticky glass-effect border-2 xl:max-w-7xl xl:mx-auto mx-2 rounded-lg shadow-lg"
        data-nosnippet>
        <!-- Desktop -->
        <div class="wrapper items-center justify-between px-2 space-x-4 h-16 hidden lg:flex">
            <NuxtLink :to="localePath('/')" class="hover-lift w-auto flex justify-center md:justify-start">
                <NuxtImg :src="isDecember ? '/images/logo_banner_1024_christmas.png' : '/images/logo_banner_1024.png'"
                    class="w-60" alt="Banner" />
            </NuxtLink>
            <nav class="max-w-5xl mx-auto px-6">
                <div class="flex flex-row items-center justify-between space-x-4">
                    <NuxtLink :to="localePath('/')" class="navbar-element">{{ $t('navbar.home') }}</NuxtLink>
                    <Dropdown :title="$t('navbar.games')" :titleLink="localePath('/games/')" :items="[
                        { name: $t('navbar.superslide'), link: 'https://supersli.de' },
                        { name: $t('navbar.divebomb'), link: '/games/divebomb/' },
                        { name: $t('navbar.flappy-christmas'), link: '/games/flappy-christmas/' },
                    ]" />
                    <NuxtLink :to="localePath('/skills/')" class="navbar-element">{{ $t('navbar.skills') }}</NuxtLink>
                    <NuxtLink :to="localePath('/blog/')" class="navbar-element">{{ $t('navbar.blog') }}</NuxtLink>
                    <Dropdown :title="$t('navbar.generators')" :titleLink="localePath('/generators/')" :items="[
                        { name: $t('navbar.joke'), link: '/generators/joke/' },
                        { name: $t('navbar.quote'), link: '/generators/quote/' },
                        { name: $t('navbar.cat'), link: '/generators/cat/' },
                        { name: $t('navbar.dog'), link: '/generators/dog/' },
                    ]" />
                    <Dropdown :title="$t('navbar.fun')" :titleLink="localePath('/fun/')" :items="[
                        { name: $t('navbar.idiot-test'), link: '/fun/idiot-test/' },
                        { name: $t('navbar.christmas-quiz'), link: '/fun/christmas-quiz/' },
                        { name: $t('navbar.common-knowledge-quiz'), link: '/fun/common-knowledge-quiz/' },
                    ]" />
                </div>
            </nav>
            <div class="flex flex-row items-center justify-between space-x-3">
                <NuxtLink to="https://www.instagram.com/creeperkatze/" target="_blank" class="hover-lift-icon">
                    <IconInstagram class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink to="https://www.tiktok.com/@creeperkatze" target="_blank" class="hover-lift-icon">
                    <IconTikTok class="w-7 h-7 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink href="https://creeperkatze.itch.io/" target="_blank" class="hover-lift-icon">
                    <IconItch class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink href="https://github.com/creeperkatze" target="_blank" class="hover-lift-icon">
                    <IconGithub class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <LangSwitcher />
            </div>
        </div>

        <!-- Mobile -->
        <div class="lg:hidden flex flex-row gap-4 h-16">
            <div class="flex items-center ml-2 space-x-2">
                <NuxtLink :to="localePath('/')" class="hover-lift w-auto flex justify-center md:justify-start">
                    <NuxtImg :src="isDecember ? '/images/logo_512_christmas.png' : '/images/logo_512.png'"
                        class="w-10 object-contain rounded-sm" alt="Logo" />
                </NuxtLink>
                <button @click="drawerOpen = !drawerOpen">
                    <IconDrawer class="h-10 w-10 text-white" :alt="$t('button.drawer')" />
                </button>
            </div>
            <div class="flex flex-row items-center justify-end flex-1 space-x-3 mr-2">
                <NuxtLink to="https://www.instagram.com/creeperkatze/" target="_blank" class="hover-lift-icon">
                    <IconInstagram class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink to="https://www.tiktok.com/@creeperkatze" target="_blank" class="hover-lift-icon">
                    <IconTikTok class="w-7 h-7 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink href="https://creeperkatze.itch.io/" target="_blank" class="hover-lift-icon">
                    <IconItch class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <NuxtLink href="https://github.com/creeperkatze" target="_blank" class="hover-lift-icon">
                    <IconGithub class="w-8 h-8 text-white hover:text-gift" />
                </NuxtLink>
                <LangSwitcher />
            </div>
        </div>
    </header>

    <!-- Drawer Menu for Mobile -->
    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform -translate-y-full"
        enter-to-class="transform translate-y-0" leave-active-class="transition duration-100 ease-in"
        leave-from-class="transform translate-y-0" leave-to-class="transform -translate-y-full">
        <div v-show="drawerOpen" class="glass-effect border-2 rounded-lg py-4 z-30 lg:hidden fixed left-2 right-2"
            style="top:5.5rem;" data-nosnippet>
            <nav class="flex flex-col text-left space-y-4 ml-4">
                <NuxtLink :to="localePath('/')" class="navbar-element text-left" @click="drawerOpen = !drawerOpen">
                    {{ $t('navbar.home') }}</NuxtLink>
                <DropdownDrawer :title="$t('navbar.games')" :titleLink="localePath('/games/')" :items="[
                    { name: $t('navbar.superslide'), link: 'https://supersli.de' },
                    { name: $t('navbar.divebomb'), link: '/games/divebomb/' },
                    { name: $t('navbar.flappy-christmas'), link: '/games/flappy-christmas/' }
                ]" :drawerOpen="drawerOpen" @item-clicked="drawerOpen = !drawerOpen" />
                <NuxtLink :to="localePath('/skills/')" class="navbar-element text-left"
                    @click="drawerOpen = !drawerOpen">{{ $t('navbar.skills') }}</NuxtLink>
                <NuxtLink :to="localePath('/blog/')" class="navbar-element text-left" @click="drawerOpen = !drawerOpen">
                    {{ $t('navbar.blog') }}</NuxtLink>
                <DropdownDrawer :title="$t('navbar.generators')" :titleLink="localePath('/generators/')" :items="[
                    { name: $t('navbar.joke'), link: '/generators/joke' },
                    { name: $t('navbar.quote'), link: '/generators/quote/' },
                    { name: $t('navbar.cat'), link: '/generators/cat/' },
                    { name: $t('navbar.dog'), link: '/generators/dog/' }
                ]" :drawerOpen="drawerOpen" @item-clicked="drawerOpen = !drawerOpen" />
                <DropdownDrawer :title="$t('navbar.fun')" :titleLink="localePath('/fun/')" :items="[
                    { name: $t('navbar.idiot-test'), link: '/fun/idiot-test' },
                    { name: $t('navbar.christmas-quiz'), link: '/fun/christmas-quiz/' },
                    { name: $t('navbar.common-knowledge-quiz'), link: '/fun/common-knowledge-quiz/' },
                ]" :drawerOpen="drawerOpen" @item-clicked="drawerOpen = !drawerOpen" />
            </nav>
        </div>
    </Transition>
</template>

<script setup>
const localePath = useLocalePath();

const drawerOpen = ref(false);

const isDecember = computed(() => new Date().getMonth() === 11);
</script>

<style setup>
.hover-lift-icons
{
    @apply transition-transform hover:scale-110;
}

.wrapper
{
    @apply max-w-screen-xl mx-auto
}

.navbar-element
{
    @apply no-underline text-white;
}

.navbar-element.router-link-active
{
    @apply text-gift;
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
    background-size: 200% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.christmas-stripes-drawer:not(.router-link-active)
{
    background: repeating-linear-gradient(-45deg, rgba(255, 96, 96, 1), rgba(255, 96, 96, 1) 5%, rgba(255, 255, 255, 1) 5%, rgba(255, 255, 255, 1) 10%);
    background-size: 50% 100%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}
</style>