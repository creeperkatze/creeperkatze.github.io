<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app';
import { onMounted } from 'vue'

interface Props {
  adSlot: string
  adStyle: string
  responsive: boolean
}

const props = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()

onMounted(() => {
  if (typeof window !== 'undefined') {
    ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})
  }
})
</script>

<template>
  <ins
    class="adsbygoogle"
    :style="props.adStyle"
    :data-ad-client="runtimeConfig.public.adSenseId"
    :data-ad-slot="props.adSlot"
    data-ad-format="auto"
    :data-full-width-responsive="responsive"
  />
</template>