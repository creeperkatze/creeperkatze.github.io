<template>
    <GoogleAd adSlot="3625454547" customClass="mb-8" />

    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.password-generator.heading') }}</h1>
        <p class="whitespace-pre-wrap mb-4 max-w-4xl text-center">{{ $t('page.tools.tool.password-generator.description') }}</p>
        <div class="w-full max-w-4xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <div class="flex items-center space-x-2">
                <div class="flex-1 text-left text-white p-2 bg-neutral-600 rounded-lg whitespace-pre-wrap break-words overflow-y-auto border-2 border-white/10">{{ password }}</div>
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

    <div class="flex flex-col items-center justify-center pt-8">
        <FaqSection
            :title="$t('page.tools.tool.password-generator.faq.title')"
            :items="faqItems"
        />
    </div>
</template>

<script setup>
const { t } = useI18n();
const password = ref('')
const length = ref(12)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)
const copied = ref(false)

defineWebPage({
    '@type': 'SoftwareApplication',
    name: t('page.tools.tool.password-generator.title'),
    description: t('page.tools.tool.password-generator.description'),
    applicationCategory: 'SecurityApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    featureList: [
        'Customizable password length (4-64 characters)',
        'Uppercase and lowercase letters',
        'Numbers and special symbols',
        'One-click copy to clipboard',
        'Client-side only - no server transmission'
    ].join(', ')
});

defineWebPage({
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: t('page.tools.tool.password-generator.faq.1.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.password-generator.faq.1.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.password-generator.faq.2.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.password-generator.faq.2.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.password-generator.faq.3.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.password-generator.faq.3.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.password-generator.faq.4.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.password-generator.faq.4.a')
            }
        }
    ]
});

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
    const array = new Uint32Array(length.value)
    crypto.getRandomValues(array)
    for (let i = 0; i < length.value; i++) {
        generated += chars[array[i] % chars.length]
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

const faqItems = computed(() => [
    {
        question: t('page.tools.tool.password-generator.faq.1.q'),
        answer: t('page.tools.tool.password-generator.faq.1.a')
    },
    {
        question: t('page.tools.tool.password-generator.faq.2.q'),
        answer: t('page.tools.tool.password-generator.faq.2.a')
    },
    {
        question: t('page.tools.tool.password-generator.faq.3.q'),
        answer: t('page.tools.tool.password-generator.faq.3.a')
    },
    {
        question: t('page.tools.tool.password-generator.faq.4.q'),
        answer: t('page.tools.tool.password-generator.faq.4.a')
    }
])

onMounted(() => {
    generatePassword()
})

definePageMeta({
    title: 'page.tools.tool.password-generator.title',
    description: 'page.tools.tool.password-generator.description',
    image: '/images/seo/password-generator.jpg'
})
</script>
