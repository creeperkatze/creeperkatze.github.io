<template>
    <div class="w-full">
        <button
            type="button"
            class="w-full rounded-lg border-2 border-dashed bg-neutral-600 text-left focus:outline-none focus:border-gift"
            :class="isDragging ? 'border-white/30' : 'border-white/10'"
            :disabled="disabled"
            @click="openPicker"
            @dragenter.prevent="onDragEnter"
            @dragover.prevent
            @dragleave.prevent="onDragLeave"
            @drop.prevent="onDrop"
        >
            <div class="p-4 sm:p-6">
                <div class="flex flex-col gap-1">
                    <span v-if="fileLabel" class="text-neutral-200">{{ fileLabel }}</span>
                    <template v-else>
                        <span class="text-white">{{ label }}</span>
                        <span v-if="hint" class="text-neutral-300">{{ hint }}</span>
                    </template>
                </div>
            </div>
        </button>

        <input
            ref="fileInput"
            type="file"
            class="hidden"
            :accept="accept"
            :disabled="disabled"
            @change="onInputChange"
        />
    </div>
</template>

<script setup>
const props = defineProps({
    modelValue: {
        type: [Object, null],
        default: null
    },
    label: {
        type: String,
        default: 'Upload file'
    },
    hint: {
        type: String,
        default: ''
    },
    accept: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'change'])

const fileInput = ref(null)
const isDragging = ref(false)

const fileLabel = computed(() =>
{
    const file = props.modelValue
    if (!file || typeof file !== 'object') return ''
    return file?.name ? String(file.name) : ''
})

const openPicker = () =>
{
    if (props.disabled) return
    fileInput.value?.click?.()
}

const pickFile = (file) =>
{
    if (!file) return
    emit('update:modelValue', file)
    emit('change', file)

    // Allow selecting the same file again.
    if (fileInput.value) {
        fileInput.value.value = ''
    }
}

const onInputChange = (event) =>
{
    const file = event?.target?.files?.[0] ?? null
    pickFile(file)
}

const onDragEnter = () =>
{
    if (props.disabled) return
    isDragging.value = true
}

const onDragLeave = () =>
{
    isDragging.value = false
}

const onDrop = (event) =>
{
    if (props.disabled) return
    isDragging.value = false

    const file = event?.dataTransfer?.files?.[0] ?? null
    pickFile(file)
}
</script>
