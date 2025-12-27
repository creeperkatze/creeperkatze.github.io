<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="glass-effect rounded-lg border-2 p-4  max-w-3xl">
            <div class="min-h-64 min-w-64 flex items-center justify-center m-auto align-middle">
                <div v-if="catData">
                    <img :src="catData.url" :alt="$t('page.cat.image.cat')" class="center max-h-[600px] mb-4">
                </div>
                <div v-else>
                    <p v-if="error" class="text-red-600">Error: {{ error }}</p>
                    <IconLoading :alt="$t('page.cat.loading')" class="center w-16" />
                </div>
            </div>
            <hr class="mt-4 mb-4">
            <Button :rainbowBackground="true" @click="fetchCatImage()">{{ $t('button.new_cat') }}</Button>
        </div>
    </div>
    <p class="my-4">{{ $t("page.cat.credits_part1") }}<a href='https://thecatapi.com/' target='_blank'>{{
        $t("page.cat.credits_part2") }}</a></p>
    <GoogleAd adSlot="1944770232" class="mb-8" />
</template>

<script setup>
definePageMeta({
    title: 'page.cat.title',
    description: 'page.cat.description',
    image: '/images/seo/cat.jpg'
});

const catData = ref(null);
const error = ref(null);

const fetchCatImage = async () =>
{
    catData.value = null;
    try
    {
        const data = await $fetch('https://api.thecatapi.com/v1/images/search');
        catData.value = data[0];
    }
    catch (err)
    {
        error.value = (err).message || 'An unknown error occurred.';
        catData.value = null;
    }
};

onMounted(() =>
{
    fetchCatImage();
});
</script>