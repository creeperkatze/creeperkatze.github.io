<template>
    <select
        v-bind="$attrs"
        :value="modelValue"
        class="text-white p-2 bg-neutral-600 rounded-lg focus:outline-none border-2 border-transparent focus:border-gift"
        @change="onChange"
    >
        <slot />
    </select>
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
    }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
    let value = event?.target?.value

    if (props.modelModifiers?.number) {
        value = value === '' ? '' : Number(value)
    }

    emit('update:modelValue', value)
}
</script>
