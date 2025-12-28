<template>
    <GoogleAd adSlot="2157278442" customClass="mb-8" />

    <div class="flex flex-col items-center justify-center space-y-4">
        <h1>{{ $t('page.tools.tool.ascii-art-creator.title') }}</h1>
        <p>{{ $t('page.tools.tool.ascii-art-creator.description') }}</p>

        <div class="w-full max-w-6xl p-6 glass-effect border-2 rounded-lg">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="order-1 lg:order-1 flex flex-col gap-2">
                    <FileUploadField
                        v-model="uploadedFile"
                        accept="image/*"
                        :label="$t('page.tools.ascii-art-creator.upload_label')"
                        :hint="$t('page.tools.ascii-art-creator.upload_hint')"
                        @change="handleImageUpload"
                    />
                </div>

                <div class="order-2 lg:order-2 lg:row-span-3 w-full">
                    <div class="w-full aspect-square bg-black rounded-lg border-2 border-white/20 overflow-hidden relative">
                        <div v-if="!asciiArt"
                            class="absolute inset-0 flex flex-col items-center justify-center text-neutral-400 p-8 text-center">
                            <p>{{ $t('page.tools.ascii-art-creator.no_image_selected') }}</p>
                            <p class="text-sm">{{ $t('page.tools.ascii-art-creator.no_image_help') }}</p>
                        </div>

                        <div v-else class="absolute inset-0 overflow-auto p-4" @wheel.prevent="onPreviewWheel">
                            <pre
                                class="font-mono text-white whitespace-pre select-all"
                                :style="{ fontSize: `${previewPx}px`, lineHeight: `${previewPx}px` }"
                            >{{ asciiArt }}</pre>
                        </div>
                    </div>
                </div>

                <div class="order-3 lg:order-3 lg:col-start-1 space-y-6">
                    <hr class="hidden lg:block" />
                    <hr class="lg:hidden" />

                    <div class="space-y-4">
                    <details open class="group border-2 border-white/10 rounded-lg p-4">
                        <summary class="flex items-center justify-between text-white cursor-pointer select-none [&::-webkit-details-marker]:hidden">
                            <span>{{ $t('page.tools.ascii-art-creator.section.size') }}</span>
                            <IconDown class="size-4 transform transition-all group-open:rotate-180" />
                        </summary>

                        <div class="mt-4 space-y-4">
                            <div class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.width_label') }}</label>
                                <TextField type="number" v-model="width" @input="updateAscii" min="10" max="100000" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.height_mode_label') }}</label>
                                <SelectField v-model="heightMode" @change="updateAscii">
                                    <option value="auto">{{ $t('page.tools.ascii-art-creator.height_mode.auto') }}</option>
                                    <option value="fixed">{{ $t('page.tools.ascii-art-creator.height_mode.fixed') }}</option>
                                </SelectField>
                            </div>

                            <div v-if="heightMode === 'fixed'" class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.height_label') }}</label>
                                <TextField type="number" v-model="height" @input="updateAscii" min="5" max="100000" />
                            </div>

                            <div v-else class="flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <label>{{ $t('page.tools.ascii-art-creator.aspect_correction_label') }}</label>
                                    <span>{{ aspectCorrection.toFixed(2) }}</span>
                                </div>
                                <TextField type="range" min="0.30" max="1.00" step="0.01" v-model.number="aspectCorrection"
                                    @input="updateAscii" class="accent-gift w-full" />
                            </div>

                            <div v-if="heightMode === 'fixed'" class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.fit_mode_label') }}</label>
                                <SelectField v-model="fitMode" @change="updateAscii">
                                    <option value="contain">{{ $t('page.tools.ascii-art-creator.fit_mode.contain') }}</option>
                                    <option value="cover">{{ $t('page.tools.ascii-art-creator.fit_mode.cover') }}</option>
                                </SelectField>
                            </div>
                        </div>
                    </details>

                    <details open class="group border-2 border-white/10 rounded-lg p-4">
                        <summary class="flex items-center justify-between text-white cursor-pointer select-none [&::-webkit-details-marker]:hidden">
                            <span>{{ $t('page.tools.ascii-art-creator.section.image') }}</span>
                            <IconDown class="size-4 transform transition-all group-open:rotate-180" />
                        </summary>

                        <div class="mt-4 space-y-4">
                            <div v-if="heightMode === 'fixed'" class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.background_label') }}</label>
                                <SelectField v-model="background" @change="updateAscii">
                                    <option value="white">{{ $t('page.tools.ascii-art-creator.background.white') }}</option>
                                    <option value="black">{{ $t('page.tools.ascii-art-creator.background.black') }}</option>
                                </SelectField>
                            </div>

                            <div class="flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <label>{{ $t('page.tools.ascii-art-creator.contrast_label') }}</label>
                                    <span>{{ contrast }}</span>
                                </div>
                                <TextField type="range" min="-128" max="128" v-model.number="contrast" @input="updateAscii"
                                    class="accent-gift w-full" />
                            </div>

                            <div class="flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <label>{{ $t('page.tools.ascii-art-creator.brightness_label') }}</label>
                                    <span>{{ brightness }}</span>
                                </div>
                                <TextField type="range" min="-128" max="128" v-model.number="brightness" @input="updateAscii"
                                    class="accent-gift w-full" />
                            </div>

                            <div class="pt-2 flex items-center justify-between">
                                <label>{{ $t('page.tools.ascii-art-creator.inverted_label') }}</label>
                                <CheckboxField v-model="inverted" @change="updateAscii" />
                            </div>
                        </div>
                    </details>

                    <details open class="group border-2 border-white/10 rounded-lg p-4">
                        <summary class="flex items-center justify-between text-white cursor-pointer select-none [&::-webkit-details-marker]:hidden">
                            <span>{{ $t('page.tools.ascii-art-creator.section.characters') }}</span>
                            <IconDown class="size-4 transform transition-all group-open:rotate-180" />
                        </summary>

                        <div class="mt-4 space-y-4">
                            <div class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.charset_label') }}</label>
                                <SelectField v-model="charsetPreset" @change="updateAscii">
                                    <option value="standard">{{ $t('page.tools.ascii-art-creator.charset.standard') }}</option>
                                    <option value="dense">{{ $t('page.tools.ascii-art-creator.charset.dense') }}</option>
                                    <option value="blocks">{{ $t('page.tools.ascii-art-creator.charset.blocks') }}</option>
                                    <option value="binary">{{ $t('page.tools.ascii-art-creator.charset.binary') }}</option>
                                    <option value="custom">{{ $t('page.tools.ascii-art-creator.charset.custom') }}</option>
                                </SelectField>
                            </div>

                            <div v-if="charsetPreset === 'custom'" class="flex flex-col gap-2">
                                <label>{{ $t('page.tools.ascii-art-creator.custom_charset_label') }}</label>
                                <TextField v-model="customCharset" @input="updateAscii" />
                            </div>
                        </div>
                    </details>

                    <details class="group border-2 border-white/10 rounded-lg p-4">
                        <summary class="flex items-center justify-between text-white cursor-pointer select-none [&::-webkit-details-marker]:hidden">
                            <span>{{ $t('page.tools.ascii-art-creator.section.preview') }}</span>
                            <IconDown class="size-4 transform transition-all group-open:rotate-180" />
                        </summary>

                        <div class="mt-4 space-y-4">
                            <div class="flex flex-col gap-2">
                                <div class="flex justify-between">
                                    <label>{{ $t('page.tools.ascii-art-creator.zoom_label') }}</label>
                                    <span>{{ zoom.toFixed(2) }}×</span>
                                </div>
                                <TextField type="range" min="0.10" max="10.00" step="0.10" v-model.number="zoom" class="accent-gift w-full" />
                                <p class="text-sm text-left  text-neutral-400">{{ $t('page.tools.ascii-art-creator.zoom_help') }}</p>
                            </div>
                        </div>
                    </details>
                </div>

                <hr />

                <div class="flex flex-wrap justify-center gap-4">
                    <div>
                        <Button @click="copyToClipboard" :disabled="!asciiArt">
                            <div class="flex items-center justify-center gap-2">
                                <IconShare v-if="copied" class="size-6 fill-white" />
                                <span>{{ copied ? $t('page.tools.ascii-art-creator.copied') : $t('page.tools.ascii-art-creator.copy_button') }}</span>
                            </div>
                        </Button>
                    </div>
                    <div>
                        <Button @click="downloadAscii" :disabled="!asciiArt">
                            {{ $t('page.tools.ascii-art-creator.download_button') }}
                        </Button>
                    </div>
                    <div>
                        <Button @click="resetSettings" :disabled="!originalImage">
                            {{ $t('page.tools.ascii-art-creator.reset_button') }}
                        </Button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
    
    <GoogleAd adSlot="1673954919" customClass="mt-8" />
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
    title: 'page.tools.tool.ascii-art-creator.title',
    description: 'page.tools.tool.ascii-art-creator.description',
    image: '/images/seo/ascii-art-creator.jpg'
})

const width = ref(100)
const heightMode = ref('auto')
const height = ref(60)
const aspectCorrection = ref(0.5)
const fitMode = ref('contain')
const background = ref('white')
const charsetPreset = ref('standard')
const customCharset = ref('@%#*+=-:. ')
const contrast = ref(0)
const brightness = ref(0)
const inverted = ref(false)
const zoom = ref(1)
const uploadedFile = ref(null)
const PREVIEW_BASE_PX = 8
const previewPx = computed(() =>
{
    const value = Number(zoom.value)
    const safe = Number.isFinite(value) ? value : 1
    return Math.max(1, Math.round(PREVIEW_BASE_PX * safe))
})
const asciiArt = ref('')
const copied = ref(false)
let originalImage = null
let fileName = ''
let debounceTimer = null

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const onPreviewWheel = (event) =>
{
    if (!event?.ctrlKey) return
    event.preventDefault()

    const delta = event.deltaY
    const direction = delta > 0 ? -1 : 1
    const next = clamp(Number(zoom.value) + direction * 0.1, 0.1, 10)
    zoom.value = Number(next.toFixed(2))
}

const CHARSETS = {
    standard: '@%#*+=-:. ',
    dense: '@$B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:",^`\'. ',
    blocks: '█▓▒░ ',
    binary: '10 '
}

const activeCharset = computed(() =>
{
    const selected = charsetPreset.value === 'custom'
        ? String(customCharset.value ?? '')
        : String(CHARSETS[charsetPreset.value] ?? CHARSETS.standard)

    // Keep first occurrence order, avoid empty/1-char palettes.
    const unique = Array.from(new Set(Array.from(selected)))
    if (unique.length < 2)
    {
        return Array.from(CHARSETS.standard)
    }
    return unique
})

const handleImageUpload = (file) => {
    if (!file) return

    fileName = file.name
    const reader = new FileReader()
    reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
            originalImage = img
            generateAscii()
        }
        img.src = e.target.result
    }
    reader.readAsDataURL(file)
}

const updateAscii = () => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(generateAscii, 100)
}

const toIntOr = (value, fallback) =>
{
    const parsed = Number.parseInt(String(value ?? ''), 10)
    return Number.isFinite(parsed) ? parsed : fallback
}

const generateAscii = () => {
    if (!originalImage) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    const finalWidth = Math.max(1, toIntOr(width.value, 100))

    const aspectRatio = originalImage.height / originalImage.width
    const computedHeight = Math.floor(finalWidth * aspectRatio * aspectCorrection.value)
    const finalHeight = heightMode.value === 'fixed'
        ? Math.max(1, toIntOr(height.value, computedHeight))
        : Math.max(1, computedHeight)

    // Basic safety guard to avoid freezing the tab on huge outputs.
    const estimatedChars = finalWidth * finalHeight
    const MAX_CHARS = 2_000_000
    if (estimatedChars > MAX_CHARS)
    {
        asciiArt.value = t('page.tools.ascii-art-creator.too_large', { chars: estimatedChars.toLocaleString() })
        return
    }

    canvas.width = finalWidth
    canvas.height = finalHeight

    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'

    // In auto mode, we draw the image stretched to the ASCII grid size.
    // The aspect correction is already encoded in the number of rows.
    if (heightMode.value !== 'fixed')
    {
        ctx.drawImage(originalImage, 0, 0, finalWidth, finalHeight)
    } else
    {
        ctx.fillStyle = background.value === 'black' ? 'black' : 'white'
        ctx.fillRect(0, 0, finalWidth, finalHeight)

        const srcW = originalImage.width
        const srcH = originalImage.height
        const scale = fitMode.value === 'cover'
            ? Math.max(finalWidth / srcW, finalHeight / srcH)
            : Math.min(finalWidth / srcW, finalHeight / srcH)

        const drawW = srcW * scale
        const drawH = srcH * scale
        const dx = (finalWidth - drawW) / 2
        const dy = (finalHeight - drawH) / 2

        ctx.drawImage(originalImage, dx, dy, drawW, drawH)
    }

    const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight)
    const data = imageData.data
    
    const chars = activeCharset.value
    const charsLen = chars.length
    let ascii = ''

    for (let y = 0; y < finalHeight; y++) {
        let line = ''
        for (let x = 0; x < finalWidth; x++) {
            const offset = (y * finalWidth + x) * 4
            let r = data[offset]
            let g = data[offset + 1]
            let b = data[offset + 2]


            const factor = (259 * (contrast.value + 255)) / (255 * (259 - contrast.value))
            r = factor * (r - 128) + 128
            g = factor * (g - 128) + 128
            b = factor * (b - 128) + 128


            r += brightness.value
            g += brightness.value
            b += brightness.value


            r = Math.max(0, Math.min(255, r))
            g = Math.max(0, Math.min(255, g))
            b = Math.max(0, Math.min(255, b))

            const gray = 0.2126 * r + 0.7152 * g + 0.0722 * b

            let charIndex = Math.floor((gray / 255) * (charsLen - 1))
            
            if (inverted.value) {
                charIndex = charsLen - 1 - charIndex
            }

            line += chars[charIndex]
        }
        ascii += line + '\n'
    }

    asciiArt.value = ascii
}

const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(asciiArt.value)
        copied.value = true
        setTimeout(() => copied.value = false, 2000)
    } catch (err) {
        console.error('Failed to copy:', err)
    }
}

const downloadAscii = () => {
    const blob = new Blob([asciiArt.value], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    
    const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName
    a.download = `${nameWithoutExt}-ascii.txt`
    
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

const resetSettings = () =>
{
    width.value = 100
    heightMode.value = 'auto'
    height.value = 60
    aspectCorrection.value = 0.5
    fitMode.value = 'contain'
    background.value = 'white'
    charsetPreset.value = 'standard'
    customCharset.value = '@%#*+=-:. '
    contrast.value = 0
    brightness.value = 0
    inverted.value = false
    zoom.value = 1
    generateAscii()
}
</script>
