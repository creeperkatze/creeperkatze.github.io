import { ref } from 'vue'

type CatImage = {
    id: string;
    url: string;
}

export default function useCatImage()
{
    const catData = ref<CatImage | null>(null);
    const error = ref<string | null>(null);

    const fetchCatImage = async () =>
    {
        catData.value = null;
        try
        {
            const data = await $fetch<CatImage>('https://api.thecatapi.com/v1/images/search');
            catData.value = data[0];
        }
        catch (err)
        {
            error.value = (err as Error).message || 'An unknown error occurred.';
            catData.value = null;
        }
    };

    return {
        catData,
        error,
        fetchCatImage,
    };
}