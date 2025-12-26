<template>
    <input
        v-bind="$attrs"
        type="checkbox"
        :checked="modelValue"
        class="text-white accent-gift w-5 h-5"
        @change="onChange"
    />
</template>

<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue'])

const onChange = (event) => {
    emit('update:modelValue', Boolean(event?.target?.checked))
}
</script>
