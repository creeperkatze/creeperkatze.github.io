import { ref } from 'vue'

type DogImage = {
    id: string;
    url: string;
}

export default function useDogImage()
{
    const dogData = ref<DogImage | null>(null);
    const error = ref<string | null>(null);

    const fetchDogImage = async () =>
    {
        dogData.value = null;
        try
        {
            const data = await $fetch<DogImage>('https://api.thedogapi.com/v1/images/search');
            dogData.value = data[0];
        }
        catch (err)
        {
            error.value = (err as Error).message || 'An unknown error occurred.';
            dogData.value = null;
        }
    };

    return {
        dogData,
        error,
        fetchDogImage,
    };
}