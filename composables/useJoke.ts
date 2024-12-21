import { ref } from 'vue'

// Define the structure of the joke data
type Joke = {
    error: boolean;
    category: string;
    type: 'single' | 'twopart';
    joke?: string;
    setup?: string;
    delivery?: string;
    flags: {
        nsfw: boolean;
        racist: boolean;
        sexist: boolean;
        religious: boolean;
        political: boolean;
        explicit: boolean;
    };
    id: number;
    safe: boolean;
    lang: string;
};

export default function useJoke()
{
    const jokeData = ref<Joke | null>(null);
    const error = ref<string | null>(null);

    const fetchJoke = async (lang: string = 'de') =>
    {
        jokeData.value = null;
        try
        {
            const url = `https://v2.jokeapi.dev/joke/Any?lang=${encodeURIComponent(lang)}&blacklistFlags=nsfw,religious,racist,sexist,explicit`;
            const data = await $fetch<Joke>(url);

            // Decode HTML entities in the joke content
            if (data.type === 'single' && data.joke)
            {
                data.joke = decodeHTMLEntities(data.joke);
            } else if (data.type === 'twopart' && data.setup && data.delivery)
            {
                data.setup = decodeHTMLEntities(data.setup);
                data.delivery = decodeHTMLEntities(data.delivery);
            }

            jokeData.value = data;
        }
        catch (err)
        {
            error.value = (err as Error).message || 'An unknown error occurred.';
            jokeData.value = null;
        }
    };

    return {
        jokeData,
        error,
        fetchJoke,
    };
}

function decodeHTMLEntities(text: string): string
{
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}