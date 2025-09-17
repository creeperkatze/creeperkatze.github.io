<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app';
import { onMounted } from 'vue'

interface Props
{
    adSlot: string
    responsive: boolean
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
    <div class="rounded-lg border-2 p-2 m-auto">
        <ins class="adsbygoogle w-[800px] h-[100px] inline-block" :data-ad-client="runtimeConfig.public.adSenseId"
            :data-ad-slot="props.adSlot" data-ad-format="auto" :data-full-width-responsive="responsive" />
    </div>
</template>