<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="rounded-lg border-2 p-4">
            <div v-if="catData">
                <img :src="catData.url" alt="Random Cat Image" class="center max-h-[600px] mb-4">
            </div>
            <div v-else>
                <p v-if="error">Error: {{ error }}</p>
                <p v-else>{{ $t("cat.loading") }}</p>
            </div>
            <Button link="/cat" buttonTextKey="button.new_cat" :rainbowBackground="true" @click="fetchCatImage()" />
        </div>
    </div>
    <p class="mb-4">{{ $t("cat.credits_part1") }}<a href='https://thecatapi.com/' target='_blank'>{{
        $t("cat.credits_part2") }}</a></p>
</template>

<script setup lang="ts">

useHead({
    title: "Cat | Creeperkatze",
})

useSeoMeta({
    title: "Cat | Creeperkatze",
    ogTitle: "Cat | Creeperkatze",
    twitterTitle: "Cat | Creeperkatze",
    description: "Get a random cat photo using TheCatAPI.",
    ogDescription: "Get a random cat photo using TheCatAPI.",
    twitterDescription: "Get a random cat photo using TheCatAPI.",
    ogImage: "/images/cat/image.jpg",
    twitterImage: "/images/cat/image.jpg",
})

const { catData, error, fetchCatImage } = useCat();

onMounted(() =>
{
    fetchCatImage();
});

</script>