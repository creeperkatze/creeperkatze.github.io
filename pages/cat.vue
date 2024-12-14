<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="bg-white rounded-lg border-2 p-4">
            <div v-if="catData">
                <img :src="catData.url" :alt="$t('page.cat.image.cat')" class="center max-h-[600px] mb-4">
            </div>
            <div v-else>
                <p v-if="error">Error: {{ error }}</p>
                <img v-else src="~/assets/images/loading.svg" class="center w-16">
            </div>
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

const { catData, error, fetchCatImage } = useCat();

onMounted(() =>
{
    fetchCatImage();
});

</script>