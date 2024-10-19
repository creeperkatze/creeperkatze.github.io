<template>
    <nav class="bg-black p-4 mb-5" >
        <div class="container mx-auto flex items-center justify-between">
            <!-- Left Element -->
            <a href="/" class="lg:ml-60 ml-0">
                <picture>
                    <!-- Fallback for very small screens -->
                    <source srcset="~/assets/images/Logo.png" media="(max-width: 640px)" />
                    <!-- Default Logo Banner -->
                    <img src="~/assets/images/LogoBanner.png" class="pixelated">
                </picture>
            </a>

            <!-- Middle Elements -->
            <div class="md:flex space-x-6">
                <a href="/" class="navbar-element">Home</a>
                <a href="/superslide" class="navbar-element">Superslide</a>
            </div>

            <!-- Social Media Icons on Right (SVG) -->
            <div class="flex space-x-4 lg:mr-60 mr-0"> <!-- Added a flex container for spacing -->
                <a href="https://www.instagram.com/creeperkatze/" target="_blank" class="navbar-social-media-icon">
                    <img src="~assets/images/external/instagram.svg" class="w-8 h-8"/>
                </a>
                <a href="https://creeperkatze.itch.io/" target="_blank" class="navbar-social-media-icon">
                    <img src="~/assets/images/external/itchio.svg" class="w-8 h-8" />
                </a>
                <a href="https://github.com/Creeperkatze" target="_blank" class="navbar-social-media-icon">
                    <img src="~/assets/images/external/github.svg" class="w-8 h-8" />
                </a>
            </div>
        </div>
    </nav>
</template>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.navbar-element');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active');
            }
        });
    });
</script>