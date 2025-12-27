<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.password-generator.title') }}</h1>
        <p>{{ $t('page.tools.tool.password-generator.description') }}</p>
        <div class="w-full max-w-md p-6 glass-effect border-2 rounded-lg space-y-4">
            <div class="flex items-center space-x-2">
                <TextField type="text" readonly :value="password" class="flex-1" />
                <Button @click="copyToClipboard">
                    {{ copied ? $t('page.tools.tool.password-generator.copied') : $t('page.tools.tool.password-generator.copy') }}
                </Button>
            </div>
            
            <div class="space-y-2">
                <div class="flex justify-between">
                    <label>{{ $t('page.tools.tool.password-generator.length') }}: {{ length }}</label>
                    <TextField type="range" v-model.number="length" min="4" max="64" class="accent-gift" />
                </div>
                
                <div class="flex items-center justify-between">
                    <label>{{ $t('page.tools.tool.password-generator.uppercase') }}</label>
                    <CheckboxField v-model="includeUppercase" />
                </div>
                <div class="flex items-center justify-between">
                    <label>{{ $t('page.tools.tool.password-generator.lowercase') }}</label>
                    <CheckboxField v-model="includeLowercase" />
                </div>
                <div class="flex items-center justify-between">
                    <label>{{ $t('page.tools.tool.password-generator.numbers') }}</label>
                    <CheckboxField v-model="includeNumbers" />
                </div>
                <div class="flex items-center justify-between">
                    <label>{{ $t('page.tools.tool.password-generator.symbols') }}</label>
                    <CheckboxField v-model="includeSymbols" />
                </div>
            </div>

            <Button @click="generatePassword" class="w-full">
                {{ $t('page.tools.tool.password-generator.generate') }}
            </Button>
        </div>
    </div>

    <GoogleAd adSlot="4363519827" customClass="mt-8" />
</template>

<script setup>
const password = ref('')
const length = ref(12)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const copied = ref(false)

const generatePassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-='
    
    let chars = ''
    if (includeUppercase.value) chars += uppercase
    if (includeLowercase.value) chars += lowercase
    if (includeNumbers.value) chars += numbers
    if (includeSymbols.value) chars += symbols
    
    if (chars === '') {
        password.value = ''
        return
    }
    
    let generated = ''
    for (let i = 0; i < length.value; i++) {
        generated += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    password.value = generated
    copied.value = false
}

const copyToClipboard = () => {
    if (!password.value) return
    navigator.clipboard.writeText(password.value)
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
}

onMounted(() => {
    generatePassword()
})

definePageMeta({
    title: 'page.tools.tool.password-generator.title',
    description: 'page.tools.tool.password-generator.description',
    image: '/images/seo/password-generator.jpg'
})
</script>
