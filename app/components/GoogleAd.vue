<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { onMounted, ref } from 'vue'

interface Props {
  adSlot: string
  customClass: string
  type?: 'display' | 'infeed'
  layoutKey?: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'display',
})
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
    class="w-full max-w-[800px] mx-auto"
    :class="[ adLoaded ? ['border-2 border-yellow-400 p-2 rounded-lg overflow-hidden', props.customClass] : '' ]"
  >
    <ins
      class="adsbygoogle block w-full h-[100px]"
      style="display:block;"
      :data-ad-client="runtimeConfig.public.adSenseId"
      :data-ad-slot="props.adSlot"
      :data-ad-format="props.type === 'infeed' ? 'fluid' : 'auto'"
      :data-ad-layout-key="props.type === 'infeed' ? props.layoutKey : undefined"
      data-full-width-responsive="true"
    />
  </div>
</template>
