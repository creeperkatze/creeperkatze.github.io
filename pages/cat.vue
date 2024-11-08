<template>
    <div class="flex flex-col justify-center items-center mx-4">
        <div class="rounded-lg border-gray-300 border-2 p-4">
            <div v-if="catData">
                <img :src="catData.url" alt="Random Cat Image" class="center max-w-screen-sm max-h-[600px] mb-4" />
            </div>
            <div v-else>
                <p v-if="error">Error: {{ error }}</p>
                <p v-else>{{ $t("cat.loading")}}</p>
            </div>
            <Button link="/cat" @click="fetchCatImage()" buttonTextKey="button.new_cat" :rainbowBackground="true" />
        </div>
    </div>
    <p class="mb-4" v-html="$t('cat.credits')"></p>
</template>

<script setup lang="ts">
useHead({
    title: "Cat | Creeperkatze",
})

useSeoMeta({
    title: "Cat | Creeperkatze",
    ogTitle: "Cat | Creeperkatze",
    twitterTitle: "Cat| Creeperkatze",
    description: "Get a random cat photo using TheCatAPI.",
    ogDescription: "Get a random cat photo using TheCatAPI.",
    twitterDescription: "Get a random cat photo using TheCatAPI.",
})

const { catData, error, fetchCatImage } = useCat();

onMounted(() =>
{
    fetchCatImage();
});

</script>