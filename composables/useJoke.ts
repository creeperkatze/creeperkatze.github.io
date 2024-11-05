import { ref } from 'vue';

export function useJoke() {
  const joke = ref<string | null>(null);
  const error = ref<string | null>(null);

  const fetchJoke = async () => {
    try {
      const response = await fetch('https://witzapi.de/api/joke');
      if (!response.ok) {
        throw new Error('Failed to fetch the joke');
      }
      const data = await response.json();

      joke.value = data.length > 0 ? data[0].text : 'No joke found.';
      error.value = null;
    } catch (err) {
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