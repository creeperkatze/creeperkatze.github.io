// ~/composables/useConsent.ts
import { ref, onMounted } from 'vue';

// Create a single, shared state
const consent = ref<boolean | null>(null);
let isInitialized = false;

export default function useConsent() {
    if (!isInitialized) {
        isInitialized = true;
        onMounted(() => {
            const storedConsent = localStorage.getItem('user-consent');
            consent.value = storedConsent !== null ? storedConsent === 'true' : null;
        });
    }

    function setConsent(value: boolean) {
        consent.value = value;
        localStorage.setItem('user-consent', value.toString());
    }

    return {
        consent,
        setConsent
    };
}
