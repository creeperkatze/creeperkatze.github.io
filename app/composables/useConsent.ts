import { ref, onMounted } from 'vue'

const itemName = 'user-consent'

// Create a single, shared state
const consent = ref<boolean | null>(null);
let isInitialized = false;

export default function useConsent() {
    if (!isInitialized) {
        isInitialized = true;
        onMounted(() => {
            const storedConsent = localStorage.getItem(itemName);
            consent.value = storedConsent !== null ? storedConsent === 'true' : null;
        });
    }

    function setConsent(value: boolean) {
        consent.value = value;
        localStorage.setItem(itemName, value.toString());
    }

    return {
        consent,
        setConsent
    };
}
