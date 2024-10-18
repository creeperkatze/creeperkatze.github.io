<template>
    <nav class="bg-black p-4 mb-5" >
        <div class="container mx-auto flex items-center justify-between">
            <!-- Left Element -->
            <a href="/">
                <img src="~assets/images/LogoBanner.png" class="pixelated">
            </a>

            <!-- Middle Elements -->
            <div class="md:flex space-x-6 ml-4 mr-4">
                <a href="/" class="navbar-element">Home</a>
                <a href="/superslide" class="navbar-element">Superslide</a>
            </div>

            <!-- Social Media Icons on Right (SVG) -->
            <div class="flex space-x-4"> <!-- Added a flex container for spacing -->
                <a href="https://www.instagram.com/creeperkatze/" target="_blank" class="navbar-social-media-icon">
                    <img src="~assets/images/external/instagram.svg" class="w-8 h-8"/>
                </a>
                <a href="https://creeperkatze.itch.io/" target="_blank" class="navbar-social-media-icon">
                    <img src="~assets/images/external/itchio.svg" class="w-8 h-8" />
                </a>
                <a href="https://github.com/Creeperkatze" target="_blank" class="navbar-social-media-icon">
                    <img src="~assets/images/external/github.svg" class="w-8 h-8" />
                </a>
            </div>
        </div>
    </nav>
</template>