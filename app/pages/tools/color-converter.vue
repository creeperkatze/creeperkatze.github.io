<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.color-converter.title') }}</h1>
        <p>{{ $t('page.tools.tool.color-converter.description') }}</p>

        <div class="w-full max-w-4xl p-6 glass-effect border-2 rounded-lg space-y-8">

            <div class="flex flex-col md:flex-row gap-6">
                <div
                    class="w-full md:w-1/3 aspect-square rounded-2xl shadow-lg relative overflow-hidden group border-2 border-white/10">
                    <div class="absolute inset-0 transition-colors duration-200"
                        :style="{ backgroundColor: hexString }"></div>
                    <input type="color" v-model="hexString"
                        class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span
                            class="bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            {{ $t('page.tools.tool.color-converter.picker') }}
                        </span>
                    </div>
                </div>

                <div class="w-full md:w-2/3 grid grid-cols-1 gap-4 content-center">
                    <div class="flex flex-col gap-1">
                        <label class="text-gray-300">{{ $t('page.tools.tool.color-converter.hex') }}</label>
                        <div class="flex flex-wrap gap-2">
                            <TextField v-model="hexInput" @blur="updateFromHex" @keyup.enter="updateFromHex"
                                placeholder="#000000" class="flex-1 font-mono" />
                            <Button @click="copyToClipboard(hexString)">
                                <IconShare v-if="copied === hexString" class="w-5 h-5" />
                                <span v-else>{{ $t('page.tools.tool.color-converter.copy') }}</span>
                            </Button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="text-gray-300">{{ $t('page.tools.tool.color-converter.rgb') }}</label>
                        <div class="flex flex-wrap gap-2">
                            <TextField v-model="rgbInput" @blur="updateFromRgb" @keyup.enter="updateFromRgb"
                                placeholder="rgb(0, 0, 0)" class="flex-1 font-mono" />
                            <Button @click="copyToClipboard(rgbInput)">
                                <IconShare v-if="copied === rgbInput" class="w-5 h-5" />
                                <span v-else>{{ $t('page.tools.tool.color-converter.copy') }}</span>
                            </Button>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <label class="text-gray-300">{{ $t('page.tools.tool.color-converter.hsl') }}</label>
                        <div class="flex flex-wrap gap-2">
                            <TextField v-model="hslInput" @blur="updateFromHsl" @keyup.enter="updateFromHsl"
                                placeholder="hsl(0, 0%, 0%)" class="flex-1 font-mono" />
                            <Button @click="copyToClipboard(hslInput)">
                                <IconShare v-if="copied === hslInput" class="w-5 h-5" />
                                <span v-else>{{ $t('page.tools.tool.color-converter.copy') }}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div class="flex flex-col gap-1">
                    <label class="text-gray-300">{{ $t('page.tools.tool.color-converter.hsv') }}</label>
                    <div class="flex flex-wrap gap-2">
                        <TextField v-model="hsvInput" @blur="updateFromHsv" @keyup.enter="updateFromHsv"
                            placeholder="hsv(0, 0%, 0%)" class="flex-1 font-mono" />
                        <Button @click="copyToClipboard(hsvInput)">
                            <IconShare v-if="copied === hsvInput" class="w-5 h-5" />
                            <span v-else>{{ $t('page.tools.tool.color-converter.copy') }}</span>
                        </Button>
                    </div>
                </div>

                <div class="flex flex-col gap-1">
                    <label class="text-gray-300">{{ $t('page.tools.tool.color-converter.cmyk') }}</label>
                    <div class="flex flex-wrap gap-2">
                        <TextField v-model="cmykInput" @blur="updateFromCmyk" @keyup.enter="updateFromCmyk"
                            placeholder="cmyk(0%, 0%, 0%, 0%)" class="flex-1 font-mono" />
                        <Button @click="copyToClipboard(cmykInput)">
                            <IconShare v-if="copied === cmykInput" class="w-5 h-5" />
                            <span v-else>{{ $t('page.tools.tool.color-converter.copy') }}</span>
                        </Button>
                    </div>
                </div>
            </div>

            <hr />

            <div class="space-y-4">
                <h3>{{ $t('page.tools.tool.color-converter.schemes') }}</h3>

                <div class="space-y-2">
                    <h4 class="text-gray-300">{{ $t('page.tools.tool.color-converter.scheme.complementary') }}</h4>
                    <div class="flex h-16 rounded-lg overflow-hidden border-2 border-white/10 cursor-pointer">
                        <div class="flex-1 transition-colors" :style="{ backgroundColor: hexString }"></div>
                        <div class="flex-1 transition-colors hover:opacity-90"
                            :style="{ backgroundColor: complementaryColor }" @click="setColor(complementaryColor)"
                            :title="complementaryColor">
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <h4 class="text-gray-300">{{ $t('page.tools.tool.color-converter.scheme.analogous') }}</h4>
                    <div class="flex h-16 rounded-lg overflow-hidden border-2 border-white/10 cursor-pointer">
                        <div v-for="color in analogousColors" :key="color"
                            class="flex-1 transition-colors hover:opacity-90" :style="{ backgroundColor: color }"
                            @click="setColor(color)" :title="color">
                        </div>
                    </div>
                </div>

                <div class="space-y-2">
                    <h4 class="text-gray-300">{{ $t('page.tools.tool.color-converter.scheme.triadic') }}</h4>
                    <div class="flex h-16 rounded-lg overflow-hidden border-2 border-white/10 cursor-pointer">
                        <div v-for="color in triadicColors" :key="color"
                            class="flex-1 transition-colors hover:opacity-90" :style="{ backgroundColor: color }"
                            @click="setColor(color)" :title="color">
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div class="space-y-4">
                <h3>{{ $t('page.tools.tool.color-converter.variations') }}</h3>
                <div class="flex flex-col gap-2">
                    <div class="flex h-12 rounded-lg overflow-hidden border-2 border-white/10">
                        <div v-for="color in tints" :key="color"
                            class="flex-1 transition-colors hover:opacity-90 cursor-pointer"
                            :style="{ backgroundColor: color }" @click="setColor(color)" :title="color">
                        </div>
                    </div>
                    <div class="flex h-12 rounded-lg overflow-hidden border-2 border-white/10">
                        <div v-for="color in shades" :key="color"
                            class="flex-1 transition-colors hover:opacity-90 cursor-pointer"
                            :style="{ backgroundColor: color }" @click="setColor(color)" :title="color">
                        </div>
                    </div>
                </div>
            </div>

            <hr />

            <div class="space-y-4">
                <h3>{{ $t('page.tools.tool.color-converter.accessibility') }}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="p-4 rounded-lg flex items-center justify-between border-2"
                        :style="{ backgroundColor: hexString }">
                        <span class="text-white">{{ $t('page.tools.tool.color-converter.text_color') }}
                            (White)</span>
                        <div class="bg-black/50 backdrop-blur-md px-3 py-1 rounded text-white">
                            {{ contrastWhite.toFixed(2) }}:1
                            <span v-if="contrastWhite >= 7" class="text-green-400">AAA</span>
                            <span v-else-if="contrastWhite >= 4.5" class="text-green-400">AA</span>
                            <span v-else class="text-red-400">Fail</span>
                        </div>
                    </div>
                    <div class="p-4 rounded-lg flex items-center justify-between border-2"
                        :style="{ backgroundColor: hexString }">
                        <span class="text-black">{{ $t('page.tools.tool.color-converter.text_color') }}
                            (Black)</span>
                        <div class="bg-white/50 backdrop-blur-md px-3 py-1 rounded text-black">
                            {{ contrastBlack.toFixed(2) }}:1    
                            <span v-if="contrastBlack >= 7" class="text-green-600">AAA</span>
                            <span v-else-if="contrastBlack >= 4.5" class="text-green-600">AA</span>
                            <span v-else class="text-red-600">Fail</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <GoogleAd adSlot="5422268863" customClass="mt-8" />
</template>

<script setup>
const rgb = reactive({ r: 0, g: 0, b: 0 });
const copied = ref('');

const hexInput = ref('#000000');
const rgbInput = ref('rgb(0, 0, 0)');
const hslInput = ref('hsl(0, 0%, 0%)');
const hsvInput = ref('hsv(0, 0%, 0%)');
const cmykInput = ref('cmyk(0%, 0%, 0%, 100%)');

const hexString = computed({
    get: () => rgbToHex(rgb.r, rgb.g, rgb.b),
    set: (val) =>
    {
        const newRgb = hexToRgb(val);
        if (newRgb) Object.assign(rgb, newRgb);
    }
});

watch(rgb, () =>
{
    if (import.meta.client)
    {
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        if (document.activeElement !== document.querySelector('input[placeholder="#000000"]'))
        {
            hexInput.value = hex;
        }

        if (document.activeElement !== document.querySelector('input[placeholder="rgb(0, 0, 0)"]'))
        {
            rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        }

        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        if (document.activeElement !== document.querySelector('input[placeholder="hsl(0, 0%, 0%)"]'))
        {
            hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        }

        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        if (document.activeElement !== document.querySelector('input[placeholder="hsv(0, 0%, 0%)"]'))
        {
            hsvInput.value = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
        }

        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        if (document.activeElement !== document.querySelector('input[placeholder="cmyk(0%, 0%, 0%, 0%)"]'))
        {
            cmykInput.value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
        }
    }
}, { deep: true, immediate: true });

const luminance = computed(() =>
{
    const a = [rgb.r, rgb.g, rgb.b].map(v =>
    {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
});

const contrastWhite = computed(() =>
{
    return (1.05) / (luminance.value + 0.05);
});

const contrastBlack = computed(() =>
{
    return (luminance.value + 0.05) / 0.05;
});

const complementaryColor = computed(() =>
{
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newH = (hsl.h + 180) % 360;
    const newRgb = hslToRgb(newH, hsl.s, hsl.l);
    return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
});

const analogousColors = computed(() =>
{
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return [-30, 0, 30].map(offset =>
    {
        const newH = (hsl.h + offset + 360) % 360;
        const newRgb = hslToRgb(newH, hsl.s, hsl.l);
        return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    });
});

const triadicColors = computed(() =>
{
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return [0, 120, 240].map(offset =>
    {
        const newH = (hsl.h + offset + 360) % 360;
        const newRgb = hslToRgb(newH, hsl.s, hsl.l);
        return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    });
});

const tints = computed(() =>
{
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const results = [];
    for (let i = 0; i <= 10; i++)
    {
        const newL = hsl.l + ((100 - hsl.l) * (i / 10));
        const newRgb = hslToRgb(hsl.h, hsl.s, newL);
        results.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return results;
});

const shades = computed(() =>
{
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const results = [];
    for (let i = 0; i <= 10; i++)
    {
        const newL = hsl.l * (1 - (i / 10));
        const newRgb = hslToRgb(hsl.h, hsl.s, newL);
        results.push(rgbToHex(newRgb.r, newRgb.g, newRgb.b));
    }
    return results.reverse();
});

function setColor(hex)
{
    const newRgb = hexToRgb(hex);
    if (newRgb) Object.assign(rgb, newRgb);
}

function updateFromHex()
{
    const newRgb = hexToRgb(hexInput.value);
    if (newRgb) Object.assign(rgb, newRgb);
    else hexInput.value = hexString.value;
}

function updateFromRgb()
{
    const match = rgbInput.value.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (match)
    {
        rgb.r = Math.min(255, Math.max(0, parseInt(match[1])));
        rgb.g = Math.min(255, Math.max(0, parseInt(match[2])));
        rgb.b = Math.min(255, Math.max(0, parseInt(match[3])));
    } else
    {
        rgbInput.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
}

function updateFromHsl()
{
    const match = hslInput.value.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/);
    if (match)
    {
        const newRgb = hslToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        Object.assign(rgb, newRgb);
    } else
    {
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hslInput.value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
}

function updateFromHsv()
{
    const match = hsvInput.value.match(/(\d+),\s*(\d+)%?,\s*(\d+)%?/);
    if (match)
    {
        const newRgb = hsvToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]));
        Object.assign(rgb, newRgb);
    } else
    {
        const hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        hsvInput.value = `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`;
    }
}

function updateFromCmyk()
{
    const match = cmykInput.value.match(/(\d+)%?,\s*(\d+)%?,\s*(\d+)%?,\s*(\d+)%?/);
    if (match)
    {
        const newRgb = cmykToRgb(parseInt(match[1]), parseInt(match[2]), parseInt(match[3]), parseInt(match[4]));
        Object.assign(rgb, newRgb);
    } else
    {
        const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);
        cmykInput.value = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;
    }
}

function copyToClipboard(text)
{
    navigator.clipboard.writeText(text).then(() =>
    {
        copied.value = text;
        setTimeout(() =>
        {
            if (copied.value === text) copied.value = '';
        }, 2000);
    });
}

function hexToRgb(hex)
{
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b)
{
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function rgbToHsl(r, g, b)
{
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min)
    {
        h = s = 0;
    } else
    {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max)
        {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

function hslToRgb(h, s, l)
{
    h /= 360; s /= 100; l /= 100;
    let r, g, b;

    if (s === 0)
    {
        r = g = b = l;
    } else
    {
        const hue2rgb = (p, q, t) =>
        {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToHsv(r, g, b)
{
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, v = max;
    const d = max - min;
    s = max === 0 ? 0 : d / max;

    if (max === min)
    {
        h = 0;
    } else
    {
        switch (max)
        {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        v: Math.round(v * 100)
    };
}

function hsvToRgb(h, s, v)
{
    h /= 360; s /= 100; v /= 100;
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6)
    {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function rgbToCmyk(r, g, b)
{
    let c = 0, m = 0, y = 0, k = 0;
    r /= 255; g /= 255; b /= 255;
    k = 1 - Math.max(r, g, b);
    if (k === 1)
    {
        return { c: 0, m: 0, y: 0, k: 100 };
    }
    c = (1 - r - k) / (1 - k);
    m = (1 - g - k) / (1 - k);
    y = (1 - b - k) / (1 - k);
    return {
        c: Math.round(c * 100),
        m: Math.round(m * 100),
        y: Math.round(y * 100),
        k: Math.round(k * 100)
    };
}

function cmykToRgb(c, m, y, k)
{
    c /= 100; m /= 100; y /= 100; k /= 100;
    const r = 255 * (1 - c) * (1 - k);
    const g = 255 * (1 - m) * (1 - k);
    const b = 255 * (1 - y) * (1 - k);
    return {
        r: Math.round(r),
        g: Math.round(g),
        b: Math.round(b)
    };
}

definePageMeta({
    title: 'page.tools.tool.color-converter.title',
    description: 'page.tools.tool.color-converter.description',
    image: '/images/seo/color-converter.jpg'
});
</script>
