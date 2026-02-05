<template>
    <GoogleAd adSlot="8657632835" customClass="mb-8" />

    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.stopwatch.heading') }}</h1>
        <p class="whitespace-pre-wrap mb-4 max-w-4xl text-center">{{ $t('page.tools.tool.stopwatch.description') }}</p>
        <div class="w-full max-w-md p-8 glass-effect border-2 rounded-lg flex flex-col items-center space-y-6">
            <div class="text-6xl font-mono text-white">
                {{ formattedTime }}
            </div>

            <div class="flex flex-wrap justify-center gap-4">
                <Button @click="toggleTimer">
                    {{ isRunning ? $t('page.tools.tool.stopwatch.stop') : $t('page.tools.tool.stopwatch.start') }}
                </Button>
                <Button @click="addRound" :disabled="time === 0">
                    {{ $t('page.tools.tool.stopwatch.round') }}
                </Button>
                <Button @click="resetTimer">
                    {{ $t('page.tools.tool.stopwatch.reset') }}
                </Button>
            </div>

            <div v-if="rounds.length > 0" class="w-full space-y-2">
                <h3 class="text-center">{{ $t('page.tools.tool.stopwatch.rounds') }}</h3>
                <div class="max-h-60 overflow-y-auto space-y-2 pr-2">
                    <div v-for="(round, index) in rounds" :key="index"
                        class="flex justify-between text-white bg-neutral-600 p-2 rounded-lg border-2 border-white/10">
                        <span>#{{ rounds.length - index }}</span>
                        <span class="font-mono">{{ formatTime(round) }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <GoogleAd adSlot="1932797606" customClass="mt-8" />

    <div class="flex flex-col items-center justify-center pt-8">
        <FaqSection
            :title="$t('page.tools.tool.stopwatch.faq.title')"
            :items="faqItems"
        />
    </div>
</template>

<script setup>
const { t } = useI18n();
const time = ref(0);
const isRunning = ref(false);
const rounds = ref([]);
let interval = null;

defineWebPage({
    '@type': 'SoftwareApplication',
    name: t('page.tools.tool.stopwatch.title'),
    description: t('page.tools.tool.stopwatch.description'),
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
    },
    featureList: [
        'Start, stop, reset functions',
        'Lap time recording',
        'Millisecond precision',
        'Works offline',
        'Mobile-friendly touch controls'
    ].join(', ')
});

defineWebPage({
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: t('page.tools.tool.stopwatch.faq.1.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.stopwatch.faq.1.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.stopwatch.faq.2.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.stopwatch.faq.2.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.stopwatch.faq.3.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.stopwatch.faq.3.a')
            }
        },
        {
            '@type': 'Question',
            name: t('page.tools.tool.stopwatch.faq.4.q'),
            acceptedAnswer: {
                '@type': 'Answer',
                text: t('page.tools.tool.stopwatch.faq.4.a')
            }
        }
    ]
});

const formatTime = (ms) =>
{
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
};

const formattedTime = computed(() => formatTime(time.value));

const toggleTimer = () =>
{
    if (isRunning.value)
    {
        clearInterval(interval);
    } else
    {
        const startTime = Date.now() - time.value;
        interval = setInterval(() =>
        {
            time.value = Date.now() - startTime;
        }, 10);
    }
    isRunning.value = !isRunning.value;
};

const addRound = () =>
{
    rounds.value.unshift(time.value);
};

const resetTimer = () =>
{
    clearInterval(interval);
    isRunning.value = false;
    time.value = 0;
    rounds.value = [];
};

const faqItems = computed(() => [
    {
        question: t('page.tools.tool.stopwatch.faq.1.q'),
        answer: t('page.tools.tool.stopwatch.faq.1.a')
    },
    {
        question: t('page.tools.tool.stopwatch.faq.2.q'),
        answer: t('page.tools.tool.stopwatch.faq.2.a')
    },
    {
        question: t('page.tools.tool.stopwatch.faq.3.q'),
        answer: t('page.tools.tool.stopwatch.faq.3.a')
    },
    {
        question: t('page.tools.tool.stopwatch.faq.4.q'),
        answer: t('page.tools.tool.stopwatch.faq.4.a')
    }
]);

onUnmounted(() =>
{
    clearInterval(interval);
});

definePageMeta({
    title: 'page.tools.tool.stopwatch.title',
    description: 'page.tools.tool.stopwatch.description',
    image: '/images/seo/stopwatch.jpg'
});
</script>
