<template>
    <div class="bg-white center rounded-lg w-full max-w-xl border-gray-300 border-2">
        <p class="p-4">{{ $t("consent_panel.text_part1") }}<a href='https://itch.io/docs/legal/privacy-policy' target='_blank'>{{ $t("consent_panel.text_part2") }}</a>{{ $t("consent_panel.text_part3") }}</p>
        <div @click="updateConsent(true)"
            class="mb-4 center w-64 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black bg-yellow-400 border-black hover:bg-yellow-600 hover:cursor-pointer">
            {{ $t("consent_panel.button") }}
        </div>
    </div>
</template>

<script setup lang="ts">
import useConsent from '~/composables/useConsent';

const { setConsent } = useConsent();

function updateConsent(value: boolean)
{
    setConsent(value);
}
</script>