<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.case-converter.title') }}</h1>
        <div class="w-full max-w-2xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <TextareaField v-model="input" class="h-40"
                :placeholder="$t('page.tools.tool.case-converter.input.placeholder')" />

            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <label class="sm:w-40">{{ $t('page.tools.tool.case-converter.mode') }}:</label>
                <SelectField v-model="mode" class="flex-1">
                    <option value="lower">{{ $t('page.tools.tool.case-converter.mode.lower') }}</option>
                    <option value="upper">{{ $t('page.tools.tool.case-converter.mode.upper') }}</option>
                    <option value="title">{{ $t('page.tools.tool.case-converter.mode.title') }}</option>
                    <option value="camel">{{ $t('page.tools.tool.case-converter.mode.camel') }}</option>
                    <option value="pascal">{{ $t('page.tools.tool.case-converter.mode.pascal') }}</option>
                    <option value="snake">{{ $t('page.tools.tool.case-converter.mode.snake') }}</option>
                    <option value="kebab">{{ $t('page.tools.tool.case-converter.mode.kebab') }}</option>
                    <option value="slug">{{ $t('page.tools.tool.case-converter.mode.slug') }}</option>
                </SelectField>
                <Button @click="copyToClipboard">
                    {{ copied ? $t('page.tools.tool.case-converter.copied') : $t('page.tools.tool.case-converter.copy') }}
                </Button>
            </div>

            <div class="text-white p-4 bg-neutral-600 rounded-lg whitespace-pre-wrap break-words">
                {{ output }}
            </div>
        </div>
    </div>

    <GoogleAd adSlot="9424274816" customClass="mt-8" />
</template>

<script setup>
const input = ref('')
const mode = ref('slug')
const copied = ref(false)

const normalizeForWords = (value) => {
    return (value ?? '')
        .toString()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[_\-]+/g, ' ')
}

const toWords = (value) => {
    const normalized = normalizeForWords(value)
    return normalized
        .split(/[^A-Za-z0-9]+/g)
        .map(w => w.trim())
        .filter(Boolean)
        .map(w => w.toLowerCase())
}

const capitalize = (word) => {
    if (!word) return ''
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const toSlug = (value) => {
    const base = (value ?? '').toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    return base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}

const output = computed(() => {
    const raw = input.value ?? ''
    const words = toWords(raw)

    if (mode.value === 'lower') return raw.toLowerCase()
    if (mode.value === 'upper') return raw.toUpperCase()
    if (mode.value === 'title') return words.map(capitalize).join(' ')
    if (mode.value === 'camel') {
        if (words.length === 0) return ''
        return words[0] + words.slice(1).map(capitalize).join('')
    }
    if (mode.value === 'pascal') return words.map(capitalize).join('')
    if (mode.value === 'snake') return words.join('_')
    if (mode.value === 'kebab') return words.join('-')
    if (mode.value === 'slug') return toSlug(raw)

    return ''
})

const copyToClipboard = () => {
    if (!output.value) return
    navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
}

definePageMeta({
    title: 'page.tools.tool.case-converter.title',
    description: 'page.tools.tool.case-converter.description',
    image: '/images/seo/case-converter.jpg'
})
</script>
