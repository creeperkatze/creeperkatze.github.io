<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import { onBeforeUnmount, onMounted, ref } from 'vue'

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

type AdState = 'loading' | 'loaded' | 'blocked'

const adState = ref<AdState>('loading')
const insEl = ref<HTMLElement | null>(null)

let observer: MutationObserver | null = null
let loadTimeout: number | null = null

const markBlocked = () => {
  if (adState.value !== 'loaded') adState.value = 'blocked'
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (loadTimeout != null) {
    window.clearTimeout(loadTimeout)
    loadTimeout = null
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    (window as any).adsbygoogle = (window as any).adsbygoogle || []
    ;(window as any).adsbygoogle.push({})
  }

  const ins = insEl.value
  if (!ins) return

  observer = new MutationObserver(() => {
    if (ins.querySelector('iframe')) {
      adState.value = 'loaded'
      markBlocked() // clears observer + timeout without switching away from 'loaded'
      adState.value = 'loaded'
      return
    }

    // AdSense can mark an ad as "done" but no iframe ever appears when blocked.
    const status = ins.getAttribute('data-adsbygoogle-status')
    const adStatus = ins.getAttribute('data-ad-status')
    if ((status === 'done' || adStatus === 'unfilled') && !ins.querySelector('iframe')) {
      markBlocked()
    }
  })

  observer.observe(ins, { childList: true, subtree: true, attributes: true })
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (loadTimeout != null) {
    window.clearTimeout(loadTimeout)
    loadTimeout = null
  }
})
</script>

<template>
  <div
    v-if="adState !== 'blocked'"
    class="w-full max-w-[800px] mx-auto"
    :class="[ adState === 'loaded' ? ['border-2 border-yellow-400 p-2 rounded-lg overflow-hidden', props.customClass] : '' ]"
  >
    <ins
      ref="insEl"
      class="adsbygoogle block w-full"
      :class="adState === 'loading' ? 'min-h-[100px] max-h-[120px] overflow-hidden' : ''"
      style="display:block;"
      :data-ad-client="runtimeConfig.public.adSenseId"
      :data-ad-slot="props.adSlot"
      :data-ad-format="props.type === 'infeed' ? 'fluid' : 'auto'"
      :data-ad-layout-key="props.type === 'infeed' ? props.layoutKey : undefined"
      data-full-width-responsive="true"
    />
  </div>
</template>
