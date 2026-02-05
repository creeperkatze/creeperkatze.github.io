<template>
    <GoogleAd adSlot="9464104582" customClass="mb-8" />

    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.text-converter.heading') }}</h1>
        <p class="whitespace-pre-wrap mb-4 max-w-4xl text-center">{{ $t('page.tools.tool.text-converter.description') }}</p>
        <div class="w-full max-w-4xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <TextareaField ref="inputRef" v-model="input" class="h-60"
                :placeholder="$t('page.tools.tool.text-converter.input.placeholder')" @scroll="onInputScroll" />
            <OutputField ref="outputRef" class="h-60" :value="output" @scroll="onOutputScroll" />

            <div class="flex flex-col sm:flex-row sm:items-end gap-3">
                <label class="sm:self-center">{{ $t('page.tools.tool.text-converter.mode') }}:</label>
                <SelectField v-model="mode" class="w-72">
                    <option value="lower">{{ $t('page.tools.tool.text-converter.mode.lower') }}</option>
                    <option value="upper">{{ $t('page.tools.tool.text-converter.mode.upper') }}</option>
                    <option value="title">{{ $t('page.tools.tool.text-converter.mode.title') }}</option>
                    <option value="swap">{{ $t('page.tools.tool.text-converter.mode.swap') }}</option>
                    <option value="alternating">{{ $t('page.tools.tool.text-converter.mode.alternating') }}</option>
                    <option value="camel">{{ $t('page.tools.tool.text-converter.mode.camel') }}</option>
                    <option value="pascal">{{ $t('page.tools.tool.text-converter.mode.pascal') }}</option>
                    <option value="snake">{{ $t('page.tools.tool.text-converter.mode.snake') }}</option>
                    <option value="constant">{{ $t('page.tools.tool.text-converter.mode.constant') }}</option>
                    <option value="kebab">{{ $t('page.tools.tool.text-converter.mode.kebab') }}</option>
                    <option value="dot">{{ $t('page.tools.tool.text-converter.mode.dot') }}</option>
                    <option value="path">{{ $t('page.tools.tool.text-converter.mode.path') }}</option>
                    <option value="slug">{{ $t('page.tools.tool.text-converter.mode.slug') }}</option>
                </SelectField>
                <div class="flex items-center gap-3 sm:ml-auto sm:self-end">
                    <div class="flex items-center space-x-2">
                        <label>{{ $t('page.tools.tool.text-converter.syncScroll') }}</label>
                        <CheckboxField v-model="syncScroll" />
                    </div>
                    <Button @click="copyToClipboard">
                        {{ copied ? $t('page.tools.tool.text-converter.copied') :
                            $t('page.tools.tool.text-converter.copy') }}
                    </Button>
                </div>

            </div>
        </div>
    </div>

    <GoogleAd adSlot="9424274816" customClass="mt-8" />

    <div class="flex flex-col items-center justify-center pt-8">
        <FaqSection
            :title="$t('page.tools.tool.text-converter.faq.title')"
            :items="faqItems"
        />
    </div>
</template>

<script setup>
const { t } = useI18n();
const input = ref('');
const mode = ref('lower');
const copied = ref(false);
const syncScroll = ref(true);
const inputRef = ref(null);
const outputRef = ref(null);
let isSyncing = false;

defineWebPage({
    '@type': 'SoftwareApplication',
    name: t('page.tools.tool.text-converter.title'),
    description: t('page.tools.tool.text-converter.description'),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    featureList: [
        'Lowercase, UPPERCASE, Title Case',
        'camelCase, PascalCase, snake_case',
        'kebab-case, CONSTANT_CASE, dot.case',
        'sWAP cASE, aLtErNaTiNg cAsE',
        'Slug for URLs'
    ].join(', ')
});

defineWebPage({
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: t('page.tools.tool.text-converter.faq.1.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.text-converter.faq.1.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.text-converter.faq.2.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.text-converter.faq.2.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.text-converter.faq.3.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.text-converter.faq.3.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.text-converter.faq.4.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.text-converter.faq.4.a')
            }
        }
    ]
});

const onInputScroll = (e) =>
{
    if (!syncScroll.value) return;
    if (isSyncing) return;
    isSyncing = true;
    if (outputRef.value?.el)
    {
        outputRef.value.el.scrollTop = e.target.scrollTop;
    }
    setTimeout(() => isSyncing = false, 10);
};

const onOutputScroll = (e) =>
{
    if (!syncScroll.value) return;
    if (isSyncing) return;
    isSyncing = true;
    if (inputRef.value?.el)
    {
        inputRef.value.el.scrollTop = e.target.scrollTop;
    }
    setTimeout(() => isSyncing = false, 10);
};

const normalizeForWords = (value) =>
{
    return (value ?? '')
        .toString()
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/[_\-]+/g, ' ');
};

const toWords = (value) =>
{
    const normalized = normalizeForWords(value);
    return normalized
        .split(/[^A-Za-z0-9]+/g)
        .map(w => w.trim())
        .filter(Boolean)
        .map(w => w.toLowerCase());
};

const capitalize = (word) =>
{
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
};

const toSlug = (value) =>
{
    const base = (value ?? '').toString().normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
    return base
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
};

const toSwapCase = (str) =>
{
    return str.split('').map(c =>
    {
        if (c === c.toUpperCase()) return c.toLowerCase();
        return c.toUpperCase();
    }).join('');
};

const toAlternatingCase = (str) =>
{
    return str.split('').map((c, i) =>
    {
        if (i % 2 === 0) return c.toLowerCase();
        return c.toUpperCase();
    }).join('');
};

const output = computed(() =>
{
    const raw = input.value ?? '';
    const words = toWords(raw);

    if (mode.value === 'lower') return raw.toLowerCase();
    if (mode.value === 'upper') return raw.toUpperCase();
    if (mode.value === 'title') return words.map(capitalize).join(' ');
    if (mode.value === 'camel')
    {
        if (words.length === 0) return '';
        return words[0] + words.slice(1).map(capitalize).join('');
    }
    if (mode.value === 'pascal') return words.map(capitalize).join('');
    if (mode.value === 'snake') return words.join('_');
    if (mode.value === 'constant') return words.map(w => w.toUpperCase()).join('_');
    if (mode.value === 'kebab') return words.join('-');
    if (mode.value === 'dot') return words.join('.');
    if (mode.value === 'path') return words.join('/');
    if (mode.value === 'swap') return toSwapCase(raw);
    if (mode.value === 'alternating') return toAlternatingCase(raw);
    if (mode.value === 'slug') return toSlug(raw);

    return '';
});

const copyToClipboard = () =>
{
    if (!output.value) return;
    navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
};

const faqItems = computed(() => [
    {
        question: t('page.tools.tool.text-converter.faq.1.q'),
        answer: t('page.tools.tool.text-converter.faq.1.a')
    },
    {
        question: t('page.tools.tool.text-converter.faq.2.q'),
        answer: t('page.tools.tool.text-converter.faq.2.a')
    },
    {
        question: t('page.tools.tool.text-converter.faq.3.q'),
        answer: t('page.tools.tool.text-converter.faq.3.a')
    },
    {
        question: t('page.tools.tool.text-converter.faq.4.q'),
        answer: t('page.tools.tool.text-converter.faq.4.a')
    }
]);

definePageMeta({
    title: 'page.tools.tool.text-converter.title',
    description: 'page.tools.tool.text-converter.description',
    image: '/images/seo/text-converter.jpg'
});
</script>
