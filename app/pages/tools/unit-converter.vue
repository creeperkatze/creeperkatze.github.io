<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.unit-converter.title') }}</h1>
        <P>{{ $t('page.tools.tool.unit-converter.description') }}</P>
        <div class="w-full max-w-2xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <label>{{ $t('page.tools.tool.unit-converter.category') }}:</label>
                <SelectField v-model="category" class="flex-1">
                    <option value="length">{{ $t('page.tools.tool.unit-converter.category.length') }}</option>
                    <option value="mass">{{ $t('page.tools.tool.unit-converter.category.mass') }}</option>
                    <option value="temperature">{{ $t('page.tools.tool.unit-converter.category.temperature') }}</option>
                    <option value="volume">{{ $t('page.tools.tool.unit-converter.category.volume') }}</option>
                    <option value="area">{{ $t('page.tools.tool.unit-converter.category.area') }}</option>
                    <option value="time">{{ $t('page.tools.tool.unit-converter.category.time') }}</option>
                    <option value="digital">{{ $t('page.tools.tool.unit-converter.category.digital') }}</option>
                    <option value="speed">{{ $t('page.tools.tool.unit-converter.category.speed') }}</option>
                    <option value="pressure">{{ $t('page.tools.tool.unit-converter.category.pressure') }}</option>
                    <option value="energy">{{ $t('page.tools.tool.unit-converter.category.energy') }}</option>
                    <option value="power">{{ $t('page.tools.tool.unit-converter.category.power') }}</option>
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

const volumeToLiters = {
    ml: 0.001,
    l: 1,
    gal: 3.78541,
    qt: 0.946353,
    pt: 0.473176,
    cup: 0.236588,
    floz: 0.0295735
}

const areaToSquareMeters = {
    m2: 1,
    km2: 1000000,
    ft2: 0.09290304,
    mi2: 2589988.11,
    ac: 4046.86,
    ha: 10000
}

const timeToSeconds = {
    ms: 0.001,
    s: 1,
    min: 60,
    h: 3600,
    d: 86400,
    wk: 604800,
    mo: 2628000,
    y: 31536000
}

const digitalToBytes = {
    b: 0.125,
    B: 1,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776,
    PB: 1125899906842624
}

const speedToMetersPerSecond = {
    mps: 1,
    kmh: 1 / 3.6,
    mph: 0.44704,
    kn: 1852 / 3600
}

const pressureToPascals = {
    Pa: 1,
    bar: 100000,
    psi: 6894.76,
    atm: 101325
}

const energyToJoules = {
    J: 1,
    kJ: 1000,
    cal: 4.184,
    kcal: 4184,
    kWh: 3600000
}

const powerToWatts = {
    W: 1,
    kW: 1000,
    hp: 745.7
}

const units = computed(() => {
    if (category.value === 'length') return Object.keys(lengthToMeters)
    if (category.value === 'mass') return Object.keys(massToKg)
    if (category.value === 'volume') return Object.keys(volumeToLiters)
    if (category.value === 'area') return Object.keys(areaToSquareMeters)
    if (category.value === 'time') return Object.keys(timeToSeconds)
    if (category.value === 'digital') return Object.keys(digitalToBytes)
    if (category.value === 'speed') return Object.keys(speedToMetersPerSecond)
    if (category.value === 'pressure') return Object.keys(pressureToPascals)
    if (category.value === 'energy') return Object.keys(energyToJoules)
    if (category.value === 'power') return Object.keys(powerToWatts)
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
    if (category.value === 'volume') {
        fromUnit.value = 'l'
        toUnit.value = 'ml'
        return
    }
    if (category.value === 'area') {
        fromUnit.value = 'm2'
        toUnit.value = 'ft2'
        return
    }
    if (category.value === 'time') {
        fromUnit.value = 'min'
        toUnit.value = 's'
        return
    }
    if (category.value === 'digital') {
        fromUnit.value = 'MB'
        toUnit.value = 'KB'
        return
    }
    if (category.value === 'speed') {
        fromUnit.value = 'kmh'
        toUnit.value = 'mps'
        return
    }
    if (category.value === 'pressure') {
        fromUnit.value = 'bar'
        toUnit.value = 'Pa'
        return
    }
    if (category.value === 'energy') {
        fromUnit.value = 'kJ'
        toUnit.value = 'kcal'
        return
    }
    if (category.value === 'power') {
        fromUnit.value = 'kW'
        toUnit.value = 'hp'
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

    if (category.value === 'volume') {
        const fromFactor = volumeToLiters[fromUnit.value]
        const toFactor = volumeToLiters[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const liters = n * fromFactor
        return liters / toFactor
    }

    if (category.value === 'area') {
        const fromFactor = areaToSquareMeters[fromUnit.value]
        const toFactor = areaToSquareMeters[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const sqMeters = n * fromFactor
        return sqMeters / toFactor
    }

    if (category.value === 'time') {
        const fromFactor = timeToSeconds[fromUnit.value]
        const toFactor = timeToSeconds[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const seconds = n * fromFactor
        return seconds / toFactor
    }

    if (category.value === 'digital') {
        const fromFactor = digitalToBytes[fromUnit.value]
        const toFactor = digitalToBytes[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const bytes = n * fromFactor
        return bytes / toFactor
    }

    if (category.value === 'speed') {
        const fromFactor = speedToMetersPerSecond[fromUnit.value]
        const toFactor = speedToMetersPerSecond[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const ms = n * fromFactor
        return ms / toFactor
    }

    if (category.value === 'pressure') {
        const fromFactor = pressureToPascals[fromUnit.value]
        const toFactor = pressureToPascals[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const pa = n * fromFactor
        return pa / toFactor
    }

    if (category.value === 'energy') {
        const fromFactor = energyToJoules[fromUnit.value]
        const toFactor = energyToJoules[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const j = n * fromFactor
        return j / toFactor
    }

    if (category.value === 'power') {
        const fromFactor = powerToWatts[fromUnit.value]
        const toFactor = powerToWatts[toUnit.value]
        if (!fromFactor || !toFactor) return ''
        const w = n * fromFactor
        return w / toFactor
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
