<template>
    <a href="#" @click.prevent="openConsentSettings">
        <slot />
    </a>
</template>

<script setup>
function openConsentSettings() {
    const googlefc = (window)?.googlefc;

    if (googlefc?.callbackQueue?.push && typeof googlefc?.showRevocationMessage === "function") {
        googlefc.callbackQueue.push(() => googlefc.showRevocationMessage());
        return;
    }

    if (typeof googlefc?.showRevocationMessage === "function") {
        googlefc.showRevocationMessage();
    }
}
</script>
