<template>
    <div class="max-w-screen-2xl mx-auto flex flex-col items-center">
        <h1>{{ $t("page.reaction-time.heading") }}</h1>
        <p class="mb-4 text-center whitespace-pre-wrap">{{ $t("page.reaction-time.instructions") }}</p>

        <div class="w-full max-w-xl p-6 glass-effect border-2 rounded-lg flex flex-col items-center space-y-4">
            <button
                class="w-full h-48 rounded-lg border-2 transition select-none outline-none flex items-center justify-center text-2xl font-bold"
                :class="areaClass"
                @click="onAreaClick"
                :disabled="state === 'idle'"
            >
                <div class="flex flex-col items-center justify-center gap-5">
                    <div class="flex items-center justify-center gap-3" aria-hidden="true">
                        <span
                            v-for="i in lightsTotal"
                            :key="i"
                            class="h-8 w-8 rounded-full border-2 transition"
                            :class="lightClass(i)"
                        />
                    </div>
                    <div>{{ areaText }}</div>
                </div>
            </button>

            <div class="flex flex-wrap justify-center gap-4">
                <Button @click="primaryAction">
                    {{ primaryLabel }}
                </Button>
                <Button @click="resetAll">
                    {{ $t("page.reaction-time.button.reset") }}
                </Button>
            </div>

            <div class="w-full text-center space-y-1">
                <p v-if="lastMs !== null">
                    {{ $t("page.reaction-time.status.result") }}
                    <span class="text-gift">{{ lastMs }} ms</span>
                </p>
                <p v-if="bestMs !== null">
                    {{ $t("page.reaction-time.label.best") }}:
                    <span class="text-yellow-400">{{ bestMs }} ms</span>
                </p>
            </div>

            <div class="w-full">
                <h3 class="text-center mb-2">{{ $t('page.reaction-time.graph.title') }}</h3>
                <div class="w-full rounded-lg border-2 border-white/10 bg-neutral-600/40 p-2">
                    <svg class="w-full h-40" viewBox="0 0 400 180" role="img"
                        :aria-label="$t('page.reaction-time.graph.aria')">
                        <rect x="0" y="0" width="400" height="160" fill="transparent" />

                        <path
                            v-if="curvePath"
                            :d="curvePath"
                            fill="none"
                            stroke="currentColor"
                            class="text-white"
                            stroke-width="3"
                            vector-effect="non-scaling-stroke"
                        />

                        <line
                            :x1="meanX"
                            y1="12"
                            :x2="meanX"
                            y2="148"
                            stroke="currentColor"
                            class="text-white/40"
                            stroke-width="3"
                            vector-effect="non-scaling-stroke"
                        />

                        <line
                            v-if="bestMs !== null"
                            :x1="bestMarkerX"
                            y1="12"
                            :x2="bestMarkerX"
                            y2="148"
                            stroke="currentColor"
                            class="text-yellow-400"
                            stroke-width="3"
                            vector-effect="non-scaling-stroke"
                        />

                        <line
                            v-if="lastMs !== null"
                            :x1="markerX"
                            y1="12"
                            :x2="markerX"
                            y2="148"
                            stroke="currentColor"
                            class="text-gift"
                            stroke-width="3"
                            vector-effect="non-scaling-stroke"
                        />

                        <text
                            v-if="lastMs !== null"
                            :x="Math.min(392, Math.max(8, markerX + 6))"
                            y="24"
                            fill="currentColor"
                            class="text-gift"
                            font-size="18"
                        >
                            {{ $t('page.reaction-time.graph.your_time') }}: {{ lastMs }} ms
                        </text>

                        <text
                            x="200"
                            y="170"
                            text-anchor="middle"
                            fill="currentColor"
                            class="text-white/70"
                            font-size="18"
                        >
                            {{ $t('page.reaction-time.graph.axis_hint') }}
                        </text>
                    </svg>
                </div>

                <p v-if="bestMs !== null" class="mt-3 text-center">
                    {{ $t('page.reaction-time.rank.top', { pct: bestTopPct }) }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
const state = ref("idle");
const lastMs = ref(null);
const bestMs = ref(null);

const readyAt = ref(null);
let timeoutId = null;
let lightsIntervalId = null;
let lightsOffTimeoutId = null;

const lightsTotal = 5;
const lightsOnCount = ref(0);

const clearTimers = () =>
{
    if (timeoutId)
    {
        clearTimeout(timeoutId);
        timeoutId = null;
    }

    if (lightsIntervalId)
    {
        clearInterval(lightsIntervalId);
        lightsIntervalId = null;
    }

    if (lightsOffTimeoutId)
    {
        clearTimeout(lightsOffTimeoutId);
        lightsOffTimeoutId = null;
    }
};

const startLightsSequence = () =>
{
    lightsOnCount.value = 0;

    const stepMs = 500;
    lightsIntervalId = setInterval(() =>
    {
        lightsOnCount.value = Math.min(lightsTotal, lightsOnCount.value + 1);

        if (lightsOnCount.value >= lightsTotal)
        {
            clearInterval(lightsIntervalId);
            lightsIntervalId = null;

            const offDelayMs = 1000 + Math.floor(Math.random() * 2000);
            lightsOffTimeoutId = setTimeout(() =>
            {
                lightsOnCount.value = 0;
                state.value = "ready";
                readyAt.value = performance.now();
                lightsOffTimeoutId = null;
            }, offDelayMs);
        }
    }, stepMs);
};

const startRound = () =>
{
    clearTimers();

    readyAt.value = null;
    state.value = "waiting";
    lightsOnCount.value = 0;

    startLightsSequence();
};

const cancelRound = () =>
{
    clearTimers();

    readyAt.value = null;
    lightsOnCount.value = 0;
    state.value = "idle";
};

const resetAll = () =>
{
    cancelRound();
    lastMs.value = null;
    bestMs.value = null;
};

const onAreaClick = () =>
{
    if (state.value === "waiting")
    {
        clearTimers();
        readyAt.value = null;
        lightsOnCount.value = 0;
        state.value = "tooSoon";
        return;
    }

    if (state.value !== "ready")
    {
        return;
    }

    const now = performance.now();
    const ms = Math.max(0, Math.round(now - (readyAt.value ?? now)));

    lastMs.value = ms;
    bestMs.value = bestMs.value === null ? ms : Math.min(bestMs.value, ms);

    state.value = "result";
};

const primaryAction = () =>
{
    if (state.value === "waiting")
    {
        cancelRound();
        return;
    }

    startRound();
};

const { t } = useI18n();

const referenceMeanMs = 250;
const referenceStdMs = 50;

const erf = (x) =>
{
    const sign = x < 0 ? -1 : 1;
    const abs = Math.abs(x);

    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const t = 1 / (1 + p * abs);
    const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-abs * abs);
    return sign * y;
};

const normalCdf = (x, mean, std) =>
{
    const z = (x - mean) / (std * Math.SQRT2);
    return 0.5 * (1 + erf(z));
};

const bestTopPct = computed(() =>
{
    if (bestMs.value === null) return 0;
    const cdf = normalCdf(bestMs.value, referenceMeanMs, referenceStdMs);
    return Math.max(0, Math.min(100, Math.round(cdf * 100)));
});

const graphDomain = computed(() =>
{
    const min = Math.max(0, Math.floor(referenceMeanMs - 4 * referenceStdMs));
    const max = Math.max(min + 1, Math.ceil(referenceMeanMs + 4 * referenceStdMs));
    return { min, max };
});

const curvePath = computed(() =>
{
    const { min, max } = graphDomain.value;

    const left = 12;
    const right = 388;
    const top = 12;
    const bottom = 148;
    const width = right - left;
    const height = bottom - top;

    const normal = (x) =>
    {
        const z = (x - referenceMeanMs) / referenceStdMs;
        return Math.exp(-0.5 * z * z);
    };

    const samples = 120;
    let maxY = 0;
    for (let i = 0; i <= samples; i++)
    {
        const x = min + (i / samples) * (max - min);
        maxY = Math.max(maxY, normal(x));
    }
    if (maxY <= 0) return '';

    const points = [];
    for (let i = 0; i <= samples; i++)
    {
        const xVal = min + (i / samples) * (max - min);
        const yVal = normal(xVal) / maxY;

        const x = left + ((xVal - min) / (max - min)) * width;
        const y = bottom - yVal * height;
        points.push([x, y]);
    }

    const [x0, y0] = points[0];
    const rest = points.slice(1).map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
    return `M ${x0.toFixed(2)} ${y0.toFixed(2)} ${rest}`;
});

const markerX = computed(() =>
{
    const { min, max } = graphDomain.value;
    const value = lastMs.value ?? min;
    const clamped = Math.min(max, Math.max(min, value));

    const left = 12;
    const right = 388;
    const width = right - left;

    return left + ((clamped - min) / (max - min)) * width;
});

const bestMarkerX = computed(() =>
{
    const { min, max } = graphDomain.value;
    const value = bestMs.value ?? min;
    const clamped = Math.min(max, Math.max(min, value));

    const left = 12;
    const right = 388;
    const width = right - left;

    return left + ((clamped - min) / (max - min)) * width;
});

const meanX = computed(() =>
{
    const { min, max } = graphDomain.value;
    const value = referenceMeanMs;
    const clamped = Math.min(max, Math.max(min, value));

    const left = 12;
    const right = 388;
    const width = right - left;

    return left + ((clamped - min) / (max - min)) * width;
});

const primaryLabel = computed(() =>
{
    if (state.value === 'idle') return t("page.reaction-time.button.start");
    if (state.value === 'waiting') return t("page.reaction-time.button.cancel");
    return t("page.reaction-time.button.try_again");
});

const areaText = computed(() =>
{
    if (state.value === 'idle') return t('page.reaction-time.status.idle');
    if (state.value === 'waiting') return t('page.reaction-time.status.waiting');
    if (state.value === 'ready') return t('page.reaction-time.status.ready');
    if (state.value === 'tooSoon') return t('page.reaction-time.status.tooSoon');
    return t('page.reaction-time.status.finished');
});

const areaClass = computed(() =>
{
    if (state.value === 'waiting') return 'bg-red-600 border-red-300 text-white';
    if (state.value === 'ready') return 'bg-green-600 border-green-300 text-white';
    if (state.value === 'tooSoon') return 'bg-yellow-400 border-yellow-600 text-black';
    return 'bg-neutral-600 border-white/20 text-white disabled:opacity-60 disabled:cursor-not-allowed';
});

const lightClass = (index) =>
{
    const isLit = state.value === 'waiting' && index <= lightsOnCount.value;
    return isLit
        ? 'bg-red-600 border-red-300'
        : 'bg-neutral-900/40 border-white/20';
};

onUnmounted(() =>
{
    clearTimers();
});

definePageMeta({
    title: "page.reaction-time.title",
    description: "page.reaction-time.description",
    image: "/images/seo/reaction-time.jpg"
});
</script>
