<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="glass-effect rounded-lg border-2 p-4  max-w-3xl">
            <div class="min-h-64 min-w-64 flex items-center justify-center m-auto align-middle">
                <div v-if="dogData">
                    <img :src="dogData.url" :alt="$t('page.dog.image.dog')" class="center max-h-[600px] mb-4">
                </div>
                <div v-else>
                    <p v-if="error" class="text-red-600">Error: {{ error }}</p>
                    <IconLoading :alt="$t('page.dog.loading')" class="center w-16" />
                </div>
            </div>
            <hr class="mt-4 mb-4">
            <Button :rainbowBackground="true" @click="fetchDogImage()">{{ $t('button.new_cat') }}</Button>
        </div>
    </div>
    <p class="my-4">{{ $t("page.dog.credits_part1") }}<a href='https://www.thedogapi.com/' target='_blank'>{{
        $t("page.dog.credits_part2") }}</a></p>
    <GoogleAd adSlot="9529963829" class="mb-8" />
</template>

<script setup>
definePageMeta({
    title: 'page.dog.title',
    description: 'page.dog.description',
    image: '/images/seo/dog.jpg'
});

const dogData = ref(null);
const error = ref(null);

const fetchDogImage = async () =>
{
    dogData.value = null;
    try
    {
        const data = await $fetch('https://api.thedogapi.com/v1/images/search');
        dogData.value = data[0];
    }
    catch (err)
    {
        error.value = (err).message || 'An unknown error occurred.';
        dogData.value = null;
    }
};

onMounted(() =>
{
    fetchDogImage();
});
</script>