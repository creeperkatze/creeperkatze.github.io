<template>
    <input
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        class="text-white rounded-lg focus:outline-none"
        :class="type === 'range' ? 'cursor-pointer' : 'p-2 bg-neutral-600 border-2 border-white/10 focus:border-gift'"
        @input="onInput"
    />
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    modelModifiers: {
        type: Object,
        default: () => ({})
    },
    type: {
        type: String,
        default: 'text'
    }
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event) => {
    let value = event?.target?.value

    if (props.modelModifiers?.trim && typeof value === 'string') {
        value = value.trim()
    }
    if (props.modelModifiers?.number) {
        value = value === '' ? '' : Number(value)
    }

    emit('update:modelValue', value)
}
</script>
