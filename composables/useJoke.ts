import { ref } from 'vue';

// Define the structure of the joke data
type JokeData = {
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

function decodeHTMLEntities(text: string): string
{
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

export function useJoke()
{
    const joke = ref<JokeData | null>(null);
    const error = ref<string | null>(null);

    const fetchJoke = async (lang: string = 'de') =>
    {
        try
        {
            const url = `https://v2.jokeapi.dev/joke/Any?lang=${encodeURIComponent(lang)}&blacklistFlags=nsfw,religious,racist,sexist,explicit`;

            const response = await fetch(url);
            if (!response.ok)
            {
                throw new Error('Failed to fetch the joke');
            }

            const data: JokeData = await response.json();

            if (data.error)
            {
                throw new Error('API returned an error');
            }

            // Decode HTML entities in the joke content
            if (data.type === 'single' && data.joke)
            {
                data.joke = decodeHTMLEntities(data.joke);
            } else if (data.type === 'twopart' && data.setup && data.delivery)
            {
                data.setup = decodeHTMLEntities(data.setup);
                data.delivery = decodeHTMLEntities(data.delivery);
            }

            joke.value = data;
            error.value = null;
        } catch (err: unknown)
        {
            console.error('Error fetching joke:', err);
            joke.value = null;
            error.value = err instanceof Error ? err.message : 'Unknown error occurred';
        }
    };

    return {
        joke,
        error,
        fetchJoke,
    };
}