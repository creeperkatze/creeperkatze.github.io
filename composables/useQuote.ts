import { ref } from 'vue'

type Quote = {
    quote: string;
    authorName: string;
    sourceLink: string;
}

export default function useQuote()
{
    const quoteData = ref<Quote | null>(null);
    const error = ref<string | null>(null);

    const fetchQuote = async (lang: string) =>
    {
        quoteData.value = null;
        try
        {
            const data = await $fetch<Quote>(`https://api.zitat-service.de/v1/quote?language=${encodeURIComponent(lang)}`);
            quoteData.value = data;
        }
        catch (err)
        {
            error.value = (err as Error).message || 'An unknown error occurred.';
            quoteData.value = null;
        }
    };

    return {
        quoteData,
        error,
        fetchQuote,
    };
}