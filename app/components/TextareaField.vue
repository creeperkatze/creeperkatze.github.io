<template>
    <div
        class="w-full bg-neutral-600 rounded-lg border-2 border-white/10 overflow-hidden focus-within:border-gift"
        :class="wrapperClass"
    >
        <textarea
            ref="textareaEl"
            v-bind="textareaAttrs"
            :value="modelValue"
            class="text-white w-full h-full p-4 bg-transparent resize-none focus:outline-none"
            @input="onInput"
        />
    </div>
</template>

<script setup>
defineOptions({
    inheritAttrs: false
})

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    modelModifiers: {
        type: Object,
        default: () => ({})
    }
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()

const wrapperClass = computed(() => attrs.class)
const textareaAttrs = computed(() => {
    const cloned = { ...attrs }
    delete cloned.class
    return cloned
})

const textareaEl = ref(null)

const onInput = (event) => {
    let value = event?.target?.value ?? ''

    if (props.modelModifiers?.trim) {
        value = value.trim()
    }

    emit('update:modelValue', value)
}

defineExpose({
    el: textareaEl
})
</script>
