<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { onMounted, ref } from 'vue'

interface Props {
  adSlot: string
}

const props = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()

const adLoaded = ref(false)

onMounted(() => {
  if (typeof window !== 'undefined') {
    (window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})
  }

  const ins = document.querySelector('.adsbygoogle') as HTMLElement
  if (ins) {
    const observer = new MutationObserver(() => {
      if (ins.querySelector('iframe')) {
        adLoaded.value = true
        observer.disconnect()
      }
    })
    observer.observe(ins, { childList: true, subtree: true })
  }
})
</script>

<template>
  <div
    class="w-full max-w-[800px] mx-auto overflow-hidden rounded-lg p-2"
    :class="adLoaded ? 'border-2' : ''"
  >
    <ins
      class="adsbygoogle block w-full h-[100px]"
      style="display:block;"
      :data-ad-client="runtimeConfig.public.adSenseId"
      :data-ad-slot="props.adSlot"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  </div>
</template>
