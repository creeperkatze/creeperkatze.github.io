<template>
    <textarea
        v-bind="$attrs"
        :value="modelValue"
        class="text-white w-full p-4 bg-neutral-600 rounded-lg resize-none border-2 border-white/10 focus:outline-none focus:border-gift"
        @input="onInput"
    />
</template>

<script setup>
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

const onInput = (event) => {
    let value = event?.target?.value ?? ''

    if (props.modelModifiers?.trim) {
        value = value.trim()
    }

    emit('update:modelValue', value)
}
</script>
