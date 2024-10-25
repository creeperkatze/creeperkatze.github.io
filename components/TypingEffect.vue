<template>
    <span class="text-green-600 fancy-shadow">&zwnj; {{ displayedPhrase }}</span>
</template>

<script>
export default {
    props: {
        phrases: {
            type: Array,
        },
        loop: {
            type: Boolean,
            default: true // Set to false if you want it to stop after one cycle by default
        },
        typingSpeed: {
            type: Number,
            default: 100 // Speed of typing in milliseconds
        },
        pauseTime: {
            type: Number,
            default: 1000 // Pause after typing a phrase in milliseconds
        },
        deletingSpeed: {
            type: Number,
            default: 50 // Speed of deleting in milliseconds
        }
    },
    data()
    {
        return {
            currentPhraseIndex: 0,
            displayedPhrase: ""
        };
    },
    mounted()
    {
        this.typePhrase();
    },
    methods: {
        async typePhrase()
        {
            while (true)
            {
                const phrase = this.phrases[this.currentPhraseIndex];

                // Typing phase
                for (let i = 0; i <= phrase.length; i++)
                {
                    this.displayedPhrase = phrase.substring(0, i);
                    await this.sleep(this.typingSpeed);
                }

                // Pause after typing
                await this.sleep(this.pauseTime);

                // Deleting phase, only if loop is true or we're not on the last phrase
                if (this.loop || this.currentPhraseIndex < this.phrases.length - 1)
                {
                    for (let i = phrase.length; i >= 0; i--)
                    {
                        this.displayedPhrase = phrase.substring(0, i);
                        await this.sleep(this.deletingSpeed);
                    }
                }

                // Move to the next phrase
                this.currentPhraseIndex++;

                // Reset the index if loop is enabled, else stop on the last phrase
                if (this.currentPhraseIndex >= this.phrases.length)
                {
                    if (this.loop)
                    {
                        this.currentPhraseIndex = 0; // Start from the beginning if looping
                    } else
                    {
                        break; // Stop if we've reached the last phrase and loop is false
                    }
                }
            }
        },
        sleep(ms)
        {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
    },
};
</script>

<style>
.fancy-shadow
{
    text-shadow: 1px 3px 0 black, 0px 10px 4px #aba8a8;
}
</style>
