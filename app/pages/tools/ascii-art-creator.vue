<template>
    <div class="flex flex-col items-center justify-center space-y-4">
        <h1 class="text-3xl font-bold">{{ $t('page.tools.tool.ascii-art-creator.title') }}</h1>
        <p>{{ $t('page.tools.tool.ascii-art-creator.description') }}</p>

        <div class="w-full max-w-7xl p-6 glass-effect border-2 rounded-lg">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                <div class="lg:col-span-4 space-y-6">
                    
                    <div class="flex flex-col gap-2">
                        <label class="font-bold">{{ $t('page.tools.ascii-art-creator.upload_label') }}</label>
                        <input type="file" accept="image/*" @change="handleImageUpload" class="file-input file-input-bordered w-full text-white" />
                    </div>

                    <hr />

                    <div class="space-y-4">
                        <div class="flex flex-col gap-2">
                            <label class="font-bold">{{ $t('page.tools.ascii-art-creator.width_label') }}</label>
                            <TextField type="number" v-model="width" @input="updateAscii" min="10" max="100000" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between">
                                <label>{{ $t('page.tools.ascii-art-creator.contrast_label') }}</label>
                                <span>{{ contrast }}</span>
                            </div>
                            <TextField type="range" min="-128" max="128" v-model.number="contrast" @input="updateAscii" class="accent-gift w-full" />
                        </div>

                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between">
                                <label>{{ $t('page.tools.ascii-art-creator.brightness_label') }}</label>
                                <span>{{ brightness }}</span>
                            </div>
                            <TextField type="range" min="-128" max="128" v-model.number="brightness" @input="updateAscii" class="accent-gift w-full" />
                        </div>

                        <div class="pt-2 flex items-center justify-between">
                            <label>{{ $t('page.tools.ascii-art-creator.inverted_label') }}</label>
                            <CheckboxField v-model="inverted" @change="updateAscii" />
                        </div>
                    </div>

                    <hr />

                    <div class="grid grid-cols-2 gap-3">
                        <Button @click="copyToClipboard" class="w-full" :disabled="!asciiArt">
                            <div class="flex items-center justify-center gap-2">
                                <IconShare v-if="copied" class="w-5 h-5" />
                                <span>{{ copied ? $t('page.tools.ascii-art-creator.copied') : $t('page.tools.ascii-art-creator.copy_button') }}</span>
                            </div>
                        </Button>
                        <Button @click="downloadAscii" class="w-full" :disabled="!asciiArt">
                            {{ $t('page.tools.ascii-art-creator.download_button') }}
                        </Button>
                    </div>
                </div>

                <div class="lg:col-span-8 flex flex-col h-full min-h-[500px]">
                    <div class="flex-1 bg-black rounded-lg border-2 border-white/20 shadow-inner overflow-hidden relative group">
                        <div v-if="!asciiArt" class="absolute inset-0 flex flex-col items-center justify-center text-gray-500 space-y-4 p-8 text-center">
                            <div class="w-20 h-20 border-4 border-dashed border-gray-600 rounded-full flex items-center justify-center">
                                <span class="text-4xl font-bold opacity-50">?</span>
                            </div>
                            <div>
                                <p class="text-lg font-bold">No Image Selected</p>
                                <p class="text-sm opacity-70">Upload an image to generate ASCII art</p>
                            </div>
                        </div>

                        <div v-else class="absolute inset-0 overflow-auto p-4">
                            <pre class="text-[6px] md:text-[8px] leading-[6px] md:leading-[8px] font-mono text-white whitespace-pre font-bold select-all" 
                                 style="font-family: 'Courier New', Courier, monospace;">{{ asciiArt }}</pre>
                        </div>
                        
                        <div v-if="asciiArt" class="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <button @click="copyToClipboard" class="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-2 rounded-lg border border-white/10 transition-colors">
                                <IconShare v-if="copied" class="w-5 h-5 text-green-400" />
                                <span v-else>Copy</span>
                            </button>
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
const contrast = ref(0)
const brightness = ref(0)
const inverted = ref(false)
const asciiArt = ref('')
const copied = ref(false)
let originalImage = null
let fileName = ''
let debounceTimer = null

const ASCII_CHARS = ['@', '%', '#', '*', '+', '=', '-', ':', '.', ' ']

const handleImageUpload = (event) => {
    const file = event.target.files[0]
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

const generateAscii = () => {
    if (!originalImage) return

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    const aspectRatio = originalImage.height / originalImage.width

    const finalWidth = parseInt(width.value)
    const finalHeight = Math.floor(finalWidth * aspectRatio * 0.5)

    canvas.width = finalWidth
    canvas.height = finalHeight

    ctx.drawImage(originalImage, 0, 0, finalWidth, finalHeight)

    const imageData = ctx.getImageData(0, 0, finalWidth, finalHeight)
    const data = imageData.data
    
    let ascii = ''

    for (let y = 0; y < finalHeight; y++) {
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

            let charIndex = Math.floor((gray / 255) * (ASCII_CHARS.length - 1))
            
            if (inverted.value) {
                charIndex = ASCII_CHARS.length - 1 - charIndex
            }

            ascii += ASCII_CHARS[charIndex]
        }
        ascii += '\n'
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
</script>
