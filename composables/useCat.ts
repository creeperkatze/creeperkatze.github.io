import { ref } from 'vue';

interface CatImage {
    id: string;
    url: string;
}

export default function useCatImage() {
    const catData = ref<CatImage | null>(null);
    const error = ref<string | null>(null);

    const fetchCatImage = async () => {
        try {
            const data = await $fetch<CatImage[]>('https://api.thecatapi.com/v1/images/search');
            catData.value = data.length > 0 ? data[0] : null;
        } catch (err) {
            error.value = (err as Error).message || 'An unknown error occurred.';
            catData.value = null;
        }
    };

    // Return both catData and error so they are accessible in the component
    return {
        catData,
        error,
        fetchCatImage,
    };
}