<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { onMounted, ref } from 'vue'

interface Props {
  adSlot: string
}

const props = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()

// Whether the ad actually rendered
const adLoaded = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    (window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})

    const ins = document.querySelector<HTMLDivElement>('.adsbygoogle')
    if (ins) {
      const observer = new MutationObserver(() => {
        if (ins.querySelector('iframe')) {
          adLoaded.value = true
          observer.disconnect()
        }
      })
      observer.observe(ins, { childList: true, subtree: true })

      setTimeout(() => {
        if (!ins.querySelector('iframe')) {
          adLoaded.value = false
          observer.disconnect()
        }
      }, 3000)
    }
  }
})
</script>

<template>
  <div
    v-if="adLoaded"
    class="w-full max-w-[800px] mx-auto overflow-hidden border-2 rounded-lg p-2"
  >
    <ins
      class="adsbygoogle block w-full h-[100px]"
      style="display:block;"
      :data-ad-client="runtimeConfig.public.adSenseId"
      :data-ad-slot="props.adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>
