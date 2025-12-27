<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.unit-converter.title') }}</h1>
        <div class="w-full max-w-2xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <label class="sm:w-40">{{ $t('page.tools.tool.unit-converter.category') }}:</label>
                <SelectField v-model="category" class="flex-1">
                    <option value="length">{{ $t('page.tools.tool.unit-converter.category.length') }}</option>
                    <option value="mass">{{ $t('page.tools.tool.unit-converter.category.mass') }}</option>
                    <option value="temperature">{{ $t('page.tools.tool.unit-converter.category.temperature') }}</option>
                </SelectField>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                <div class="flex flex-col gap-2">
                    <label>{{ $t('page.tools.tool.unit-converter.value') }}</label>
                    <TextField type="number" v-model.number="inputValue" step="any" />
                </div>
                <div class="flex flex-col gap-2">
                    <label>{{ $t('page.tools.tool.unit-converter.from') }}</label>
                    <SelectField v-model="fromUnit">
                        <option v-for="u in units" :key="u" :value="u">{{ unitLabel(u) }}</option>
                    </SelectField>
                </div>
                <div class="flex flex-col gap-2">
                    <label>{{ $t('page.tools.tool.unit-converter.to') }}</label>
                    <SelectField v-model="toUnit">
                        <option v-for="u in units" :key="u" :value="u">{{ unitLabel(u) }}</option>
                    </SelectField>
                </div>
            </div>

            <div class="flex items-center space-x-2">
                <TextField type="text" readonly :value="formattedOutput" class="flex-1" />
                <Button @click="copyToClipboard">
                    {{ copied ? $t('page.tools.tool.unit-converter.copied') : $t('page.tools.tool.unit-converter.copy') }}
                </Button>
            </div>
        </div>
    </div>

    <GoogleAd adSlot="8111193145" customClass="mt-8" />
</template>

<script setup>
const category = ref('length')
const inputValue = ref(1)
const fromUnit = ref('m')
const toUnit = ref('cm')
const copied = ref(false)

const lengthToMeters = {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344
}

const massToKg = {
    mg: 0.000001,
    g: 0.001,
    kg: 1,
    oz: 0.028349523125,
    lb: 0.45359237
}

const units = computed(() => {
    if (category.value === 'length') return Object.keys(lengthToMeters)
    if (category.value === 'mass') return Object.keys(massToKg)
    return ['C', 'F', 'K']
})

watch(category, () => {
    if (category.value === 'length') {
        fromUnit.value = 'm'
        toUnit.value = 'cm'
        return
    }
    if (category.value === 'mass') {
        fromUnit.value = 'kg'
        toUnit.value = 'g'
        return
    }
    fromUnit.value = 'C'
    toUnit.value = 'F'
})

const convertTemperatureToC = (value, unit) => {
    if (unit === 'C') return value
    if (unit === 'F') return (value - 32) * (5 / 9)
    return value - 273.15
}

const convertTemperatureFromC = (valueC, unit) => {
    if (unit === 'C') return valueC
    if (unit === 'F') return (valueC * (9 / 5)) + 32
    return valueC + 273.15
}

const outputValue = computed(() => {
    const n = Number(inputValue.value)
    if (!Number.isFinite(n)) return ''

    if (category.value === 'length') {
        const fromFactor = lengthToMeters[fromUnit.value]
        const toFactor = lengthToMeters[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const meters = n * fromFactor
        return meters / toFactor
    }

    if (category.value === 'mass') {
        const fromFactor = massToKg[fromUnit.value]
        const toFactor = massToKg[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const kg = n * fromFactor
        return kg / toFactor
    }

    const c = convertTemperatureToC(n, fromUnit.value)
    return convertTemperatureFromC(c, toUnit.value)
})

const formattedOutput = computed(() => {
    if (outputValue.value === '') return ''
    const num = Number(outputValue.value)
    if (!Number.isFinite(num)) return ''
    return num.toString()
})

const unitLabel = (unit) => {
    const key = `page.tools.tool.unit-converter.unit.${unit}`
    const translated = useNuxtApp().$i18n?.t?.(key)
    return translated && translated !== key ? translated : unit
}

const copyToClipboard = () => {
    if (!formattedOutput.value) return
    navigator.clipboard.writeText(formattedOutput.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
}

definePageMeta({
    title: 'page.tools.tool.unit-converter.title',
    description: 'page.tools.tool.unit-converter.description',
    image: '/images/seo/unit-converter.jpg'
})
</script>
