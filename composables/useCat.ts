import { ref } from 'vue';
import { useFetch, useRuntimeConfig } from '#app';

type CatImage = {
    url: string;
    id: string;
    votes: number;
}

export default function useCatImage()
{
    const apiKey = useRuntimeConfig().public.catApiKey as string;

    // Define refs to store the cat image data and any potential error
    const catData = ref<CatImage | null>(null);
    const error = ref<string | null>(null);

    // Fetch a random cat image
    const fetchCatImage = async () =>
    {
        try
        {
            const { data, error: fetchError } = await useFetch<CatImage[]>('https://api.thecatapi.com/v1/images/search')

            // Access the error from fetchError.value and check for its properties
            if (fetchError.value)
            {
                throw new Error(fetchError.value.message); // Use fetchError.value.message
            }

            // Set the first cat image data if available, or null if not
            catData.value = data.value && data.value.length > 0 ? data.value[0] : null;
        } catch (err)
        {
            // Handle the error and set the error message
            error.value = (err as Error).message;
            catData.value = null;
        }
    };

    return {
        catData,
        error,
        fetchCatImage,
    };
}
