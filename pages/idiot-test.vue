<template>
    <audio ref="wrongSound" src="/audio/wrong.mp3" />
    <audio ref="correctSound" src="/audio/correct.mp3" />

    <div class="max-w-screen-md mx-auto">
        <h1>{{ $t("idiot_test.title") }}</h1>
        <p class="mb-4">{{ $t("idiot_test.subtitle") }}</p>
        <ul>
            <li v-for="(question, index) in questions" :key="index" class="question border-2 mb-2 rounded-lg p-2"
                :class="{
                    'border-green-600': question.isCorrect,
                    'border-red-600': !question.isCorrect && question.isCorrect != undefined,
                }">
                <p :class="{ 'opacity-50': question.isCorrect !== undefined }">{{ question.text }}</p>
                <div class="answers flex flex-wrap justify-center gap-2">
                    <input v-model="question.answer" type="text" placeholder="Schreibe deine Antwort"
                        class="no-outline px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out text-black border-black hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                        :class="{
                        }" :disabled="question.isCorrect !== undefined" @keydown.enter="checkAnswer(index)">

                    <!-- Add a validation button -->
                    <button
                        class="no-outline px-4 rounded-lg border-2 transition ease-in-out text-black border-black hover:bg-gray-400 hover:text-black disabled:opacity-50 disabled:pointer-events-none"
                        :disabled="question.isCorrect !== undefined" @click="checkAnswer(index)">
                        <IconSubmit />
                    </button>
                </div>
                <p v-if="question.isCorrect != undefined" :class="{
                    'text-green-600': question.isCorrect,
                    'text-red-600': !question.isCorrect && question.isCorrect != undefined,
                }">{{ question.explanation }}</p>
            </li>
        </ul>

        <div v-if="allQuestionsAnswered" id="results" class="mt-4">
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mb-4">{{ $t("idiot_test.results") }}</h1>
            <h3>{{ $t("idiot_test.score") }}{{ score }} / {{ questions.length }}</h3>
            <h3>{{ $t("idiot_test.percentage") }}{{ percentage }}%</h3>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mt-4">{{ $t("idiot_test.rank_title") }}</h1>
            <p class="mb-4">{{ $t("idiot_test.disclaimer") }}</p>
            <div class="bg-yellow-400 mb-2 rounded-lg p-2 border-8 border-yellow-600">
                <h1>{{ $t("idiot_test.rank.name." + rank) }}</h1>
                <h4 class="mb-4">{{ $t("idiot_test.rank.description." + rank) }}</h4>
                <img :src="`/images/idiot-test/${rank}.jpg`" class="mb-2 rounded-lg w-full center">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data()
    {
        useHead({
            title: "Idiot Test | Creeperkatze",
        })

        useSeoMeta({
            title: "Idiot Test | Creeperkatze",
            ogTitle: "Idiot Test | Creeperkatze",
            twitterTitle: "Idiot Test | Creeperkatze",
            description: "Test if youre an idiot with these crazy and tricky questions.",
            ogDescription: "Test if youre an idiot with these crazy and tricky questions.",
            twitterDescription: "Test if youre an idiot with these crazy and tricky questions.",
        })

        return {
            questions: [
                {
                    text: "Wie oft kann man 1 von 20 abziehen?",
                    correctAnswers: ["1 mal", "1", "ein mal", "einmal"],
                    explanation: "Nur ein mal, danach zieht man schon von 19 ab.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Du überholst den zweitschnellsten Läufer, auf welchem Platz bist du jetzt?",
                    correctAnswers: ["platz 2", "2", "2.", "zwei", "zweiten"],
                    explanation: "Du hast seinen Platz, also den zweiten übernommen.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Welche Worte stehen auf dem Rand eines 1 Euro-Stücks?",
                    correctAnswers: ["nichts", "keine", "gar nichts"],
                    explanation: "Da stand noch nie was xD.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Wie viele Geburtstage hat der Mensch?",
                    correctAnswers: ["1", "ein", "einen"],
                    explanation: "Selbstverständlich wird man nur einmal geboren",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Einige Monate haben 31 Tage, andere 30. Wie viele Monate haben 28 Tage?",
                    correctAnswers: ["12", "zwölf", "alle"],
                    explanation: "Alle Monate haben mindestens 28 Tage.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Ein Bauer hat 10 Schafe, alle sterben außer 9. Wie viele lebende Schafe hat er noch?",
                    correctAnswers: ["9", "neun"],
                    explanation: "Wenn alle außer 9 sterben, leben noch 9.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Berlin schreibt man am Anfang mit 'B' und hinten mit 'h'. Stimmt das?",
                    correctAnswers: ["ja", "klar"],
                    explanation: "Natürlich schreibt man 'hinten' mit 'h'.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Ist es in der Schweiz erlaubt, dass ein Mann die Schwester seiner Witwe heiratet?",
                    correctAnswers: ["geht nicht", "unmöglich", "nicht möglich", "nein weil der mann dann tod ist", "der mann ist dann tod", "mann ist tot", "nein weil der mann dann nicht mehr lebt"],
                    explanation: "Nein. Der Mann lebt dann nicht mehr.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Du hast eine Streichholzschachtel und betrittst einen Raum, in dem sich nichts als eine Petroleumlampe, ein Kamin und ein Ölofen befinden. Was zündest du zuerst an?",
                    correctAnswers: ["streichholz", "das streichholz"],
                    explanation: "Natürlich das Streichholz.",
                    answer: undefined,
                    isCorrect: undefined,
                },
                {
                    text: "Gibt es in England den 17. Juni?",
                    correctAnswers: ["ja", "klar",],
                    explanation: "Na klar.",
                    answer: undefined,
                    isCorrect: undefined,
                },
            ],
        };
    },
    computed: {
        score()
        {
            return this.questions.reduce((total, question) =>
            {
                return total + (question.isCorrect ? 1 : 0);
            }, 0);

        },
        percentage()
        {
            const totalQuestions = this.questions.length;
            if (totalQuestions === 0)
            {
                return 0; // Avoid division by zero if there are no questions
            }
            return Math.round((this.score / totalQuestions) * 100);
        },
        rank()
        {
            const percentage = this.percentage;

            // Define the rank thresholds
            const rankThresholds = {
                4: [100, 100],
                3: [75, 99],
                2: [60, 74],
                1: [25, 59],
                0: [0, 24]
            };

            // Determine the rank based on percentage and thresholds
            for (const [rank, [min, max]] of Object.entries(rankThresholds))
            {
                if (percentage >= min && percentage <= max)
                {
                    return Number(rank);
                }
            }
            return 0; // Default to 0 if no rank matches
        },
        allQuestionsAnswered()
        {
            // Check if all questions have been answered (isCorrect is not undefined)
            return this.questions.every(question => question.isCorrect !== undefined);
        }
    },
    watch: {
        // Watch for changes in `allQuestionsAnswered`
        allQuestionsAnswered(newValue)
        {
            if (newValue) {
                this.$router.replace({ name: this.$route.name, hash: '#results' });   
            }
        }
    },
    methods: {
        checkAnswer(index)
        {
            let sound;

            if (this.validateAnswer(this.questions[index].answer, this.questions[index].correctAnswers))
            {
                this.questions[index].isCorrect = true;
                sound = this.$refs.correctSound;
            }
            else
            {
                this.questions[index].isCorrect = false;
                sound = this.$refs.wrongSound;
            }

            sound.currentTime = 0; // Restart sound
            sound.play();
        },

        editDistance(s1, s2)
        {
            const len1 = s1.length;
            const len2 = s2.length;
            const dp = Array(len1 + 1).fill().map(() => Array(len2 + 1).fill(0));

            for (let i = 0; i <= len1; i++)
            {
                for (let j = 0; j <= len2; j++)
                {
                    if (i === 0)
                    {
                        dp[i][j] = j;
                    } else if (j === 0)
                    {
                        dp[i][j] = i;
                    } else if (s1[i - 1] === s2[j - 1])
                    {
                        dp[i][j] = dp[i - 1][j - 1];
                    } else
                    {
                        dp[i][j] = Math.min(dp[i - 1][j - 1] + 1, Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1));
                    }
                }
            }
            return dp[len1][len2];
        },

        // Function to calculate similarity percentage between two strings
        calculateSimilarity(s1, s2)
        {
            const longer = s1.length > s2.length ? s1 : s2;
            const shorter = s1.length <= s2.length ? s1 : s2;

            if (longer.length === 0) return 1.0;
            const dist = this.editDistance(longer, shorter);
            return (longer.length - dist) / longer.length;
        },

        // Function to validate if the selected answer is similar enough to any of the correct answers
        validateAnswer(selectedAnswer, correctAnswers, threshold = 0.8)
        {
            if (!selectedAnswer || !correctAnswers || correctAnswers.length === 0)
            {
                return false;
            }

            return correctAnswers.some(correctAnswer =>
            {
                const similarity = this.calculateSimilarity(selectedAnswer.toLowerCase(), correctAnswer.toLowerCase());
                console.log(similarity);
                return similarity >= threshold; // Returns true if similarity exceeds the threshold
            });
        }
    }
};
</script>