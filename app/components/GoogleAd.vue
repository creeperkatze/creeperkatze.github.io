<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app';
import { onMounted } from 'vue'

interface Props
{
    adSlot: string
}

const props = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()

onMounted(() =>
{
    if (typeof window !== 'undefined')
    {
        ; (window as any).adsbygoogle = (window as any).adsbygoogle || []
            ; (window as any).adsbygoogle.push({})
    }
})
</script>

<template>
    <div class="w-full max-w-[800px] mx-auto overflow-hidden rounded-lg p-2">
        <ins class="adsbygoogle block w-full h-[100px]" style="display:block;"
            :data-ad-client="runtimeConfig.public.adSenseId" :data-ad-slot="props.adSlot" data-ad-format="auto"
            data-full-width-responsive="true">
        </ins>
    </div>
</template>

<style>
.ad-wrapper:has(ins iframe)
{
    border: 2px solid #000;
    border-radius: 0.5rem;
    padding: 0.5rem;
}
</style>