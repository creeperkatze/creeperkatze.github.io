<template>
    <GoogleAd adSlot="3792975509" customClass="mb-8" />

    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.font-changer.title') }}</h1>
        <p>{{ $t('page.tools.tool.font-changer.description') }}</p>
        <div class="w-full max-w-4xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <TextareaField ref="inputRef" v-model="input" class="h-60"
                :placeholder="$t('page.tools.tool.font-changer.input.placeholder')" @scroll="onInputScroll" />

            <OutputField ref="outputRef" class="h-60" :value="output" @scroll="onOutputScroll" />

            <div class="flex flex-col sm:flex-row sm:items-end gap-3">
                <label class="sm:self-center">{{ $t('page.tools.tool.font-changer.font') }}:</label>
                <SelectField v-model="font" class="w-72">
                    <option value="bold">{{ fontLabel('bold', $t('page.tools.tool.font-changer.font.bold')) }}</option>
                    <option value="italic">{{ fontLabel('italic', $t('page.tools.tool.font-changer.font.italic')) }}</option>
                    <option value="boldItalic">{{ fontLabel('boldItalic', $t('page.tools.tool.font-changer.font.boldItalic')) }}</option>
                    <option value="script">{{ fontLabel('script', $t('page.tools.tool.font-changer.font.script')) }}</option>
                    <option value="fraktur">{{ fontLabel('fraktur', $t('page.tools.tool.font-changer.font.fraktur')) }}</option>
                    <option value="frakturBold">{{ fontLabel('frakturBold', $t('page.tools.tool.font-changer.font.frakturBold')) }}</option>
                    <option value="doubleStruck">{{ fontLabel('doubleStruck', $t('page.tools.tool.font-changer.font.doubleStruck')) }}</option>
                    <option value="sans">{{ fontLabel('sans', $t('page.tools.tool.font-changer.font.sans')) }}</option>
                    <option value="sansBold">{{ fontLabel('sansBold', $t('page.tools.tool.font-changer.font.sansBold')) }}</option>
                    <option value="sansItalic">{{ fontLabel('sansItalic', $t('page.tools.tool.font-changer.font.sansItalic')) }}</option>
                    <option value="sansBoldItalic">{{ fontLabel('sansBoldItalic', $t('page.tools.tool.font-changer.font.sansBoldItalic')) }}</option>
                    <option value="monospace">{{ fontLabel('monospace', $t('page.tools.tool.font-changer.font.monospace')) }}</option>
                    <option value="fullwidth">{{ fontLabel('fullwidth', $t('page.tools.tool.font-changer.font.fullwidth')) }}</option>
                    <option value="circled">{{ fontLabel('circled', $t('page.tools.tool.font-changer.font.circled')) }}</option>
                    <option value="squared">{{ fontLabel('squared', $t('page.tools.tool.font-changer.font.squared')) }}</option>
                    <option value="negativeSquared">{{ fontLabel('negativeSquared', $t('page.tools.tool.font-changer.font.negativeSquared')) }}</option>
                    <option value="smallCaps">{{ fontLabel('smallCaps', $t('page.tools.tool.font-changer.font.smallCaps')) }}</option>
                    <option value="regional">{{ fontLabel('regional', $t('page.tools.tool.font-changer.font.regional')) }}</option>
                    <option value="upsideDown">{{ fontLabel('upsideDown', $t('page.tools.tool.font-changer.font.upsideDown')) }}</option>
                    <option value="keycap">{{ fontLabel('keycap', $t('page.tools.tool.font-changer.font.keycap')) }}</option>
                    <option value="enclosedSquare">{{ fontLabel('enclosedSquare', $t('page.tools.tool.font-changer.font.enclosedSquare')) }}</option>
                    <option value="strikethrough">{{ fontLabel('strikethrough', $t('page.tools.tool.font-changer.font.strikethrough')) }}</option>
                    <option value="underline">{{ fontLabel('underline', $t('page.tools.tool.font-changer.font.underline')) }}</option>
                    <option value="doubleUnderline">{{ fontLabel('doubleUnderline', $t('page.tools.tool.font-changer.font.doubleUnderline')) }}</option>
                    <option value="glitch">{{ fontLabel('glitch', $t('page.tools.tool.font-changer.font.glitch')) }}</option>
                    <option value="brackets">{{ fontLabel('brackets', $t('page.tools.tool.font-changer.font.brackets')) }}</option>
                    <option value="quotes">{{ fontLabel('quotes', $t('page.tools.tool.font-changer.font.quotes')) }}</option>
                    <option value="wavy">{{ fontLabel('wavy', $t('page.tools.tool.font-changer.font.wavy')) }}</option>
                    <option value="shaded">{{ fontLabel('shaded', $t('page.tools.tool.font-changer.font.shaded')) }}</option>
                    <option value="hearts">{{ fontLabel('hearts', $t('page.tools.tool.font-changer.font.hearts')) }}</option>
                    <option value="superscript">{{ fontLabel('superscript', $t('page.tools.tool.font-changer.font.superscript')) }}</option>
                    <option value="subscript">{{ fontLabel('subscript', $t('page.tools.tool.font-changer.font.subscript')) }}</option>
                </SelectField>
                <div class="flex items-center gap-3 sm:ml-auto sm:self-end">
                    <div class="flex items-center space-x-2">
                        <label>{{ $t('page.tools.tool.font-changer.syncScroll') }}</label>
                        <CheckboxField v-model="syncScroll" />
                    </div>
                    <Button @click="copyToClipboard">
                        {{ copied ? $t('page.tools.tool.font-changer.copied') :
                            $t('page.tools.tool.font-changer.copy') }}
                    </Button>
                </div>

            </div>
        </div>
    </div>

    <GoogleAd adSlot="4498895974" customClass="mt-8" />
</template>

<script setup>
const input = ref('');
const font = ref('bold');
const copied = ref(false);
const syncScroll = ref(true);
const inputRef = ref(null);
const outputRef = ref(null);
let isSyncing = false;

const onInputScroll = (e) =>
{
    if (!syncScroll.value) return;
    if (isSyncing) return;
    isSyncing = true;
    if (outputRef.value?.el?.value)
    {
        outputRef.value.el.value.scrollTop = e.target.scrollTop;
    }
    setTimeout(() => isSyncing = false, 10);
};

const onOutputScroll = (e) =>
{
    if (!syncScroll.value) return;
    if (isSyncing) return;
    isSyncing = true;
    if (inputRef.value?.$el)
    {
        inputRef.value.$el.scrollTop = e.target.scrollTop;
    }
    setTimeout(() => isSyncing = false, 10);
};

const buildRangeMapper = ({ upperStart, lowerStart, digitStart }) =>
{
    return (char) =>
    {
        const code = char.codePointAt(0);
        if (code >= 65 && code <= 90)
        {
            return String.fromCodePoint(upperStart + (code - 65));
        }
        if (code >= 97 && code <= 122)
        {
            return String.fromCodePoint(lowerStart + (code - 97));
        }
        if (digitStart != null && code >= 48 && code <= 57)
        {
            return String.fromCodePoint(digitStart + (code - 48));
        }
        return char;
    };
};

const buildTableMapper = (table) =>
{
    return (char) => table[char] ?? char;
};

const applyCombining = (value, combining) =>
{
    return Array.from(value ?? '').map((c) =>
    {
        if (c === '\n' || c === '\r' || c === '\t') return c;
        if (c.trim() === '') return c;
        return c + combining;
    }).join('');
};

const wrapEachChar = (value, left, right) =>
{
    return Array.from(value ?? '').map((c) =>
    {
        if (c === '\n' || c === '\r') return c;
        if (c.trim() === '') return c;
        return `${left}${c}${right}`;
    }).join('');
};

const wrapWhole = (value, prefix, suffix) =>
{
    const str = (value ?? '').toString();
    if (!str) return '';
    return `${prefix}${str}${suffix}`;
};

const circledDigitMap = {
    0: '⓪',
    1: '①',
    2: '②',
    3: '③',
    4: '④',
    5: '⑤',
    6: '⑥',
    7: '⑦',
    8: '⑧',
    9: '⑨'
};

const circledMapper = (char) =>
{
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + (code - 97));
    if (code >= 48 && code <= 57) return circledDigitMap[code - 48] ?? char;
    return char;
};

const frakturUpper = {
    A: '𝔄', B: '𝔅', C: 'ℭ', D: '𝔇', E: '𝔈', F: '𝔉', G: '𝔊', H: 'ℌ', I: 'ℑ', J: '𝔍',
    K: '𝔎', L: '𝔏', M: '𝔐', N: '𝔑', O: '𝔒', P: '𝔓', Q: '𝔔', R: 'ℜ', S: '𝔖', T: '𝔗',
    U: '𝔘', V: '𝔙', W: '𝔚', X: '𝔛', Y: '𝔜', Z: 'ℨ'
};
const frakturMapper = (char) =>
{
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90) return frakturUpper[String.fromCodePoint(code)] ?? char;
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D51E + (code - 97));
    return char;
};

const doubleStruckUpper = {
    A: '𝔸', B: '𝔹', C: 'ℂ', D: '𝔻', E: '𝔼', F: '𝔽', G: '𝔾', H: 'ℍ', I: '𝕀', J: '𝕁',
    K: '𝕂', L: '𝕃', M: '𝕄', N: 'ℕ', O: '𝕆', P: 'ℙ', Q: 'ℚ', R: 'ℝ', S: '𝕊', T: '𝕋',
    U: '𝕌', V: '𝕍', W: '𝕎', X: '𝕏', Y: '𝕐', Z: 'ℤ'
};
const doubleStruckMapper = (char) =>
{
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90) return doubleStruckUpper[String.fromCodePoint(code)] ?? char;
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + (code - 97));
    if (code >= 48 && code <= 57) return String.fromCodePoint(0x1D7D8 + (code - 48));
    return char;
};

const squaredMapper = (char) =>
{
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + (code - 65));
    if (code >= 97 && code <= 122) return String.fromCodePoint(0x1F130 + (code - 97));
    return char;
};

const negativeSquaredLetters = Array.from('🅰🅱🅲🅳🅴🅵🅶🅷🅸🅹🅺🅻🅼🅽🅾🅿🆀🆁🆂🆃🆄🆅🆆🆇🆈🆉');
const negativeSquaredMapper = (char) =>
{
    const code = char.codePointAt(0);
    if (code >= 65 && code <= 90) return negativeSquaredLetters[code - 65] ?? char;
    if (code >= 97 && code <= 122) return negativeSquaredLetters[code - 97] ?? char;
    return char;
};

const smallCapsMap = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ',
    m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ꞯ', r: 'ʀ', s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', y: 'ʏ', z: 'ᴢ'
};
const smallCapsMapper = (char) =>
{
    const lower = char.toLowerCase();
    return smallCapsMap[lower] ?? char;
};

const regionalIndicatorMapper = (char) =>
{
    const upper = char.toUpperCase();
    const code = upper.codePointAt(0);
    if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F1E6 + (code - 65));
    return char;
};

const upsideDownCharMap = {
    a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ɓ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'ן',
    m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x',
    y: 'ʎ', z: 'z',
    A: '∀', B: '𐐒', C: 'Ɔ', D: '◖', E: 'Ǝ', F: 'Ⅎ', G: '⅁', H: 'H', I: 'I', J: 'ſ', K: 'ʞ', L: '˥',
    M: 'W', N: 'N', O: 'O', P: 'Ԁ', Q: 'Ό', R: 'ᴚ', S: 'S', T: '⊥', U: '∩', V: 'Λ', W: 'M', X: 'X',
    Y: '⅄', Z: 'Z',
    0: '0', 1: 'Ɩ', 2: 'ᄅ', 3: 'Ɛ', 4: 'ㄣ', 5: 'ϛ', 6: '9', 7: 'ㄥ', 8: '8', 9: '6',
    '.': '˙', ',': "'", "'": ',', '"': ',,', '_': '‾', '?': '¿', '!': '¡', '(': ')', ')': '(', '[': ']', ']': '[',
    '{': '}', '}': '{', '<': '>', '>': '<'
};
const upsideDownTransform = (value) =>
{
    const chars = Array.from((value ?? '').toString());
    return chars.reverse().map((c) => upsideDownCharMap[c] ?? c).join('');
};

const superscriptMap = {
    A: 'ᴬ', B: 'ᴮ', D: 'ᴰ', E: 'ᴱ', G: 'ᴳ', H: 'ᴴ', I: 'ᴵ', J: 'ᴶ', K: 'ᴷ', L: 'ᴸ', M: 'ᴹ', N: 'ᴺ',
    O: 'ᴼ', P: 'ᴾ', R: 'ᴿ', T: 'ᵀ', U: 'ᵁ', V: 'ⱽ', W: 'ᵂ',
    a: 'ᵃ', b: 'ᵇ', c: 'ᶜ', d: 'ᵈ', e: 'ᵉ', f: 'ᶠ', g: 'ᵍ', h: 'ʰ', i: 'ⁱ', j: 'ʲ', k: 'ᵏ', l: 'ˡ', m: 'ᵐ',
    n: 'ⁿ', o: 'ᵒ', p: 'ᵖ', r: 'ʳ', s: 'ˢ', t: 'ᵗ', u: 'ᵘ', v: 'ᵛ', w: 'ʷ', x: 'ˣ', y: 'ʸ', z: 'ᶻ',
    0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹'
};
const subscriptMap = {
    a: 'ₐ', e: 'ₑ', h: 'ₕ', i: 'ᵢ', j: 'ⱼ', k: 'ₖ', l: 'ₗ', m: 'ₘ', n: 'ₙ', o: 'ₒ', p: 'ₚ', r: 'ᵣ',
    s: 'ₛ', t: 'ₜ', u: 'ᵤ', v: 'ᵥ', x: 'ₓ',
    0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉'
};

const glitchMarksAbove = ['̍', '̎', '̄', '̅', '̿', '̑', '̆', '̐', '͒', '͗', '͑', '̇', '̈', '̊', '͂', '̓'];
const glitchMarksMiddle = ['̴', '̷', '̶', '̲', '̳', '͟', '͞', '͠'];
const glitchMarksBelow = ['̖', '̗', '̘', '̙', '̜', '̝', '̞', '̟', '̠', '̤', '̥', '̦', '̩', '̪', '̫', '̬', '̯', '̰'];
const glitchTransform = (value) =>
{
    const str = (value ?? '').toString();
    let idx = 0;
    return Array.from(str).map((c) =>
    {
        if (c === '\n' || c === '\r') return c;
        if (c.trim() === '') return c;
        const above = glitchMarksAbove[idx % glitchMarksAbove.length];
        const middle = glitchMarksMiddle[idx % glitchMarksMiddle.length];
        const below = glitchMarksBelow[idx % glitchMarksBelow.length];
        idx += 1;
        return c + middle + above + below;
    }).join('');
};

const heartsBetween = (value) =>
{
    const chars = Array.from((value ?? '').toString());
    const filtered = chars.filter((c) => c !== '\r');
    const parts = [];
    for (const c of filtered)
    {
        if (c === '\n')
        {
            parts.push('\n');
            continue;
        }
        parts.push(c);
    }
    return parts.join('♥');
};

const mappers = {
    bold: buildRangeMapper({ upperStart: 0x1D400, lowerStart: 0x1D41A, digitStart: 0x1D7CE }),
    italic: buildRangeMapper({ upperStart: 0x1D434, lowerStart: 0x1D44E, digitStart: null }),
    boldItalic: buildRangeMapper({ upperStart: 0x1D468, lowerStart: 0x1D482, digitStart: null }),
    script: buildRangeMapper({ upperStart: 0x1D49C, lowerStart: 0x1D4B6, digitStart: null }),
    fraktur: frakturMapper,
    frakturBold: buildRangeMapper({ upperStart: 0x1D56C, lowerStart: 0x1D586, digitStart: null }),
    doubleStruck: doubleStruckMapper,
    sans: buildRangeMapper({ upperStart: 0x1D5A0, lowerStart: 0x1D5BA, digitStart: 0x1D7E2 }),
    sansBold: buildRangeMapper({ upperStart: 0x1D5D4, lowerStart: 0x1D5EE, digitStart: 0x1D7EC }),
    sansItalic: buildRangeMapper({ upperStart: 0x1D608, lowerStart: 0x1D622, digitStart: null }),
    sansBoldItalic: buildRangeMapper({ upperStart: 0x1D63C, lowerStart: 0x1D656, digitStart: null }),
    monospace: buildRangeMapper({ upperStart: 0x1D670, lowerStart: 0x1D68A, digitStart: 0x1D7F6 }),
    fullwidth: buildRangeMapper({ upperStart: 0xFF21, lowerStart: 0xFF41, digitStart: 0xFF10 }),
    circled: circledMapper,
    squared: squaredMapper,
    negativeSquared: negativeSquaredMapper,
    smallCaps: smallCapsMapper,
    regional: regionalIndicatorMapper
};

const applyFont = (value, fontKey) =>
{
    if (fontKey === 'upsideDown') return upsideDownTransform(value);
    if (fontKey === 'keycap') return applyCombining(value, '⃣');
    if (fontKey === 'enclosedSquare') return applyCombining(value, '⃞');
    if (fontKey === 'strikethrough') return applyCombining(value, '̶');
    if (fontKey === 'underline') return applyCombining(value, '̲');
    if (fontKey === 'doubleUnderline') return applyCombining(value, '̳');
    if (fontKey === 'glitch') return glitchTransform(value);
    if (fontKey === 'brackets') return wrapEachChar(value, '【', '】');
    if (fontKey === 'quotes') return wrapEachChar(value, '『', '』');
    if (fontKey === 'wavy') return wrapEachChar(value, '≋', '≋');
    if (fontKey === 'shaded') return wrapEachChar(value, '░', '░');
    if (fontKey === 'hearts') return heartsBetween(value);
    if (fontKey === 'superscript') return Array.from(value ?? '').map(buildTableMapper(superscriptMap)).join('');
    if (fontKey === 'subscript') return Array.from(value ?? '').map(buildTableMapper(subscriptMap)).join('');

    const mapper = mappers[fontKey] ?? ((c) => c);
    return Array.from(value ?? '').map(mapper).join('');
};

const output = computed(() =>
{
    return applyFont(input.value ?? '', font.value);
});

const fontLabel = (fontKey, label) => applyFont(label ?? '', fontKey);

const copyToClipboard = () =>
{
    if (!output.value) return;
    navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
};

definePageMeta({
    title: 'page.tools.tool.font-changer.title',
    description: 'page.tools.tool.font-changer.description',
    image: '/images/seo/font-changer.jpg'
});
</script>
