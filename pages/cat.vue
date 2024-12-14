<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="bg-white rounded-lg border-2 p-4 max-w-screen-xl">
            <div class="min-h-64 min-w-64 flex items-center justify-center m-auto align-middle">
                <div v-if="catData">
                    <img :src="catData.url" :alt="$t('page.cat.image.cat')" class="center max-h-[600px] mb-4">
                </div>
                <div v-else>
                    <p v-if="error" class="text-red-600">Error: {{ error }}</p>
                    <img v-else src="~/assets/icons/loading.svg" :alt="$t('page.cat.loading')" class="center w-16">
                </div>
            </div>
            <hr class="mt-4 mb-4">
            <Button link="/cat" :rainbowBackground="true" @click="fetchCatImage()">{{ $t('button.new_cat') }}</Button>
        </div>
    </div>
    <p class="mb-4">{{ $t("page.cat.credits_part1") }}<a href='https://thecatapi.com/' target='_blank'>{{
        $t("page.cat.credits_part2") }}</a></p>
</template>

<script setup>

definePageMeta({
    title: 'page.cat.title',
    description: 'page.cat.description',
    image: '/images/seo/cat.jpg'
})

const { catData, error, fetchCatImage } = useCatImage();

onMounted(() =>
{
    fetchCatImage();
});

</script>