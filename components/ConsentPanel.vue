<template>
    <div class="bg-white center rounded-lg w-full max-w-xl border-gray-300 border-2">
        <p class="p-4">{{ $t("consent_panel.text_part1") }}<a href='https://itch.io/docs/legal/privacy-policy' target='_blank'>{{ $t("consent_panel.text_part2") }}</a>{{ $t("consent_panel.text_part3") }}</p>
        <button class="mb-4 center w-64 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black bg-yellow-400 border-black hover:bg-yellow-600 hover:cursor-pointer"
            @click="updateConsent(true)">
            {{ $t("consent_panel.button") }}
        </button>
    </div>
</template>

<script setup>
import useConsent from '~/composables/useConsent';

const { setConsent } = useConsent();

function updateConsent(value)
{
    setConsent(value);
}
</script>