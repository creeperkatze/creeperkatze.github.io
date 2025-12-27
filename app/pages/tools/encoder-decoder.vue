<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.encoder-decoder.title') }}</h1>
        <p>{{ $t('page.tools.tool.encoder-decoder.description') }}</p>
        <div class="w-full max-w-2xl p-6 glass-effect border-2 rounded-lg space-y-4">
            <TextareaField v-model="input" class="h-40"
                :placeholder="$t('page.tools.tool.encoder-decoder.input.placeholder')" />

            <div
                class="text-left h-40 text-white p-4 bg-neutral-600 rounded-lg whitespace-pre-wrap break-words overflow-y-auto">
                {{ output }}
            </div>

            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <div class="flex flex-col gap-1 flex-1">
                    <label>{{ $t('page.tools.tool.encoder-decoder.method') }}:</label>
                    <SelectField v-model="method">
                        <option value="base64">{{ $t('page.tools.tool.encoder-decoder.method.base64') }}</option>
                        <option value="url">{{ $t('page.tools.tool.encoder-decoder.method.url') }}</option>
                        <option value="html">{{ $t('page.tools.tool.encoder-decoder.method.html') }}</option>
                        <option value="hex">{{ $t('page.tools.tool.encoder-decoder.method.hex') }}</option>
                        <option value="binary">{{ $t('page.tools.tool.encoder-decoder.method.binary') }}</option>
                        <option value="base32">{{ $t('page.tools.tool.encoder-decoder.method.base32') }}</option>
                        <option value="rot13">{{ $t('page.tools.tool.encoder-decoder.method.rot13') }}</option>
                        <option value="reverse">{{ $t('page.tools.tool.encoder-decoder.method.reverse') }}</option>
                        <option value="atbash">{{ $t('page.tools.tool.encoder-decoder.method.atbash') }}</option>
                        <option value="morse">{{ $t('page.tools.tool.encoder-decoder.method.morse') }}</option>
                    </SelectField>
                </div>
                <div class="flex flex-col gap-1 flex-1">
                    <label>{{ $t('page.tools.tool.encoder-decoder.action') }}:</label>
                    <SelectField v-model="action">
                        <option value="encode">{{ $t('page.tools.tool.encoder-decoder.action.encode') }}</option>
                        <option value="decode">{{ $t('page.tools.tool.encoder-decoder.action.decode') }}</option>
                    </SelectField>
                </div>
                <div class="sm:ml-auto sm:self-end">
                    <Button @click="copyToClipboard">
                        {{ copied ? $t('page.tools.tool.encoder-decoder.copied') :
                            $t('page.tools.tool.encoder-decoder.copy') }}
                    </Button>
                </div>
            </div>
        </div>
    </div>

    <GoogleAd adSlot="5485848047" customClass="mt-8" />
</template>

<script setup>
const input = ref('');
const method = ref('base64');
const action = ref('encode');
const copied = ref(false);

const utf8_to_b64 = (str) =>
{
    try
    {
        return window.btoa(unescape(encodeURIComponent(str)));
    } catch (e)
    {
        return 'Error: Invalid input for Base64 encoding';
    }
};

const b64_to_utf8 = (str) =>
{
    try
    {
        return decodeURIComponent(escape(window.atob(str)));
    } catch (e)
    {
        return 'Error: Invalid Base64 string';
    }
};

const toHex = (str) =>
{
    let result = '';
    for (let i = 0; i < str.length; i++)
    {
        result += str.charCodeAt(i).toString(16).padStart(2, '0');
    }
    return result;
};

const fromHex = (str) =>
{
    try
    {
        const hex = str.toString().replace(/\s+/g, '');
        let result = '';
        for (let i = 0; i < hex.length; i += 2)
        {
            result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return result;
    } catch (e)
    {
        return 'Error: Invalid Hex string';
    }
};

const toBinary = (str) =>
{
    let result = '';
    for (let i = 0; i < str.length; i++)
    {
        result += str.charCodeAt(i).toString(2).padStart(8, '0') + ' ';
    }
    return result.trim();
};

const fromBinary = (str) =>
{
    try
    {
        const bin = str.toString().replace(/\s+/g, '');
        let result = '';
        for (let i = 0; i < bin.length; i += 8)
        {
            result += String.fromCharCode(parseInt(bin.substr(i, 8), 2));
        }
        return result;
    } catch (e)
    {
        return 'Error: Invalid Binary string';
    }
};

const rot13 = (str) =>
{
    return str.replace(/[a-zA-Z]/g, function (c)
    {
        return String.fromCharCode((c <= "Z" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
};

const base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

const toBase32 = (str) =>
{
    let view = new Uint8Array(new TextEncoder().encode(str));
    let bits = 0;
    let value = 0;
    let output = "";

    for (let i = 0; i < view.length; i++)
    {
        value = (value << 8) | view[i];
        bits += 8;

        while (bits >= 5)
        {
            output += base32Chars[(value >>> (bits - 5)) & 31];
            bits -= 5;
        }
    }

    if (bits > 0)
    {
        output += base32Chars[(value << (5 - bits)) & 31];
    }

    while (output.length % 8 !== 0)
    {
        output += "=";
    }

    return output;
};

const fromBase32 = (str) =>
{
    try
    {
        let value = 0;
        let bits = 0;
        let index = 0;
        let output = new Uint8Array((str.length * 5) / 8);

        str = str.toUpperCase().replace(/=+$/, "");

        for (let i = 0; i < str.length; i++)
        {
            let val = base32Chars.indexOf(str[i]);
            if (val === -1) continue;

            value = (value << 5) | val;
            bits += 5;

            if (bits >= 8)
            {
                output[index++] = (value >>> (bits - 8)) & 255;
                bits -= 8;
            }
        }
        return new TextDecoder().decode(output.slice(0, index));
    } catch (e)
    {
        return 'Error: Invalid Base32 string';
    }
};

const reverseString = (str) => str.split('').reverse().join('');

const atbash = (str) =>
{
    return str.replace(/[a-zA-Z]/g, (char) =>
    {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90)
        {
            return String.fromCharCode(90 - (code - 65));
        }
        if (code >= 97 && code <= 122)
        {
            return String.fromCharCode(122 - (code - 97));
        }
        return char;
    });
};

const morseCodeMap = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const toMorse = (str) =>
{
    return str.toUpperCase().split('').map(c => morseCodeMap[c] || c).join(' ');
};

const fromMorse = (str) =>
{
    const reverseMap = Object.fromEntries(Object.entries(morseCodeMap).map(([k, v]) => [v, k]));
    return str.split(' ').map(c => reverseMap[c] || c).join('');
};

const htmlEncode = (str) =>
{
    return str.replace(/[\u00A0-\u9999<>&]/g, function (i)
    {
        return '&#' + i.charCodeAt(0) + ';';
    });
};

const htmlDecode = (str) =>
{
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.documentElement.textContent;
};

const output = computed(() =>
{
    const raw = input.value ?? '';
    if (!raw) return '';

    if (method.value === 'base64')
    {
        return action.value === 'encode' ? utf8_to_b64(raw) : b64_to_utf8(raw);
    }
    if (method.value === 'url')
    {
        try
        {
            return action.value === 'encode' ? encodeURIComponent(raw) : decodeURIComponent(raw);
        } catch (e)
        {
            return 'Error: Malformed URI sequence';
        }
    }
    if (method.value === 'html')
    {
        return action.value === 'encode' ? htmlEncode(raw) : htmlDecode(raw);
    }
    if (method.value === 'hex')
    {
        return action.value === 'encode' ? toHex(raw) : fromHex(raw);
    }
    if (method.value === 'binary')
    {
        return action.value === 'encode' ? toBinary(raw) : fromBinary(raw);
    }
    if (method.value === 'rot13')
    {
        return rot13(raw);
    }
    if (method.value === 'base32')
    {
        return action.value === 'encode' ? toBase32(raw) : fromBase32(raw);
    }
    if (method.value === 'reverse')
    {
        return reverseString(raw);
    }
    if (method.value === 'atbash')
    {
        return atbash(raw);
    }
    if (method.value === 'morse')
    {
        return action.value === 'encode' ? toMorse(raw) : fromMorse(raw);
    }

    return '';
});

const copyToClipboard = () =>
{
    if (!output.value) return;
    navigator.clipboard.writeText(output.value);
    copied.value = true;
    setTimeout(() => copied.value = false, 2000);
};

definePageMeta({
    title: 'page.tools.tool.encoder-decoder.title',
    description: 'page.tools.tool.encoder-decoder.description',
    image: '/images/seo/encoder-decoder.jpg'
});
</script>
