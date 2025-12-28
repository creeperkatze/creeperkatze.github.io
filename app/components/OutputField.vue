<template>
    <div
        class="w-full bg-neutral-600 rounded-lg border-2 border-white/10 overflow-hidden"
        :class="wrapperClass"
    >
        <div
            ref="scrollEl"
            v-bind="innerAttrs"
            class="text-left text-white p-4 whitespace-pre-wrap break-words overflow-y-auto h-full"
        >
            {{ value }}
        </div>
    </div>
</template>

<script setup>
defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    value: {
        type: String,
        default: ''
    }
})

const attrs = useAttrs()

const wrapperClass = computed(() => attrs.class)
const innerAttrs = computed(() => {
    const cloned = { ...attrs }
    delete cloned.class
    return cloned
})

const scrollEl = ref(null)

defineExpose({
    el: scrollEl
})
</script>
