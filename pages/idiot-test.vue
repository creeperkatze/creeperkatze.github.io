<template>
    <div class="max-w-screen-md mx-auto">
        <h1>{{ $t("page.idiot_test.title") }}</h1>
        <p class="mb-4">{{ $t("page.idiot_test.subtitle") }}</p>
        <div v-if="!allQuestionsAnswered"
            class="sticky top-4 max-w-xl mx-auto p-4 bg-white border-2 border-black rounded-lg mb-4 z-10">
            <div class="w-full bg-gray-200 h-2 rounded-full">
                <div class="bg-black h-2 rounded-full" :style="{ width: percentageAnswered + '%' }" />
            </div>
            <p class="mt-2 text-center">
                {{ $t("page.idiot_test.progress") }}{{ percentageAnswered }}%
            </p>
        </div>
        <ul>
            <li v-for="(question, index) in questions" :key="index" class="bg-white border-2 mb-2 rounded-lg p-2"
                :class="{
                    'border-green-600': question.isCorrect,
                    'border-red-600': !question.isCorrect && question.isCorrect != undefined,
                }">
                <div class="relative flex items-start" :class="{ 'opacity-50': question.isCorrect !== undefined }">
                    <p class="absolute left-0 text-left">{{ index + 1 }}.</p>
                    <p class="pl-8 text-left">
                        {{ question.text }}
                    </p>
                </div>
                <div class="answers flex flex-shrink justify-center gap-2">
                    <input v-model="question.answer" type="text" placeholder="Schreibe deine Antwort"
                        class="bg-white text-black border-black hover:text-black no-outline min-w-0 px-4 pt-2 pb-2 rounded-lg border-2 transition ease-in-out disabled:opacity-50 disabled:pointer-events-none"
                        :class="{
                        }" :disabled="question.isCorrect !== undefined" @keydown.enter="checkAnswer(index)">
                    <button
                        class="no-outline min-w-0 px-4 rounded-lg border-2 transition ease-in-out text-black border-black hover:bg-gray-400 hover:text-black disabled:opacity-50 disabled:pointer-events-none"
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
            <h1 class="mb-4">{{ $t("page.idiot_test.results") }}</h1>
            <h3>{{ $t("page.idiot_test.score") }}{{ score }} / {{ questions.length }}</h3>
            <h3>{{ $t("page.idiot_test.percentage") }}{{ percentageCorrect }}%</h3>
            <hr class="rounded border-[1px] mt-4 mb-4">
            <h1 class="mt-4">{{ $t("page.idiot_test.rank_title") }}</h1>
            <p class="mb-4">{{ $t("page.idiot_test.disclaimer") }}</p>
            <div class="bg-yellow-400 mb-2 rounded-lg p-2 border-8 border-yellow-600">
                <h1>{{ $t("page.idiot_test.rank.name." + rank) }}</h1>
                <h4 class="mb-4">{{ $t("page.idiot_test.rank.description." + rank) }}</h4>
                <img :src="images[`${rank}`]" class="mb-2 rounded-lg w-full center">
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { filename } from 'pathe/utils'

definePageMeta({
    title: "page.idiot_test.title",
    description: "page.idiot_test.description",
    image: "/images/seo/idiot-test.jpg"
});

const router = useRouter();

let correctSound;
let wrongSound;

onMounted(() =>
{
    correctSound = new Audio("/audio/correct.mp3");
    wrongSound = new Audio("/audio/wrong.mp3");
});

const glob = import.meta.glob('@/assets/images/idiot-test/*.jpg', { eager: true })
const images = Object.fromEntries(
    Object.entries(glob).map(([key, value]) => [filename(key), value.default])
)

const questions = reactive(
    [
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
            text: "Ein Bauer hat 10 Schafe, alle sterben außer 9. Wie viele Schafe hat er noch?",
            correctAnswers: ["9", "neun"],
            explanation: "Wenn alle außer 9 sterben, leben noch 9.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Berlin schreibt man am Anfang mit 'B' und hinten mit 'h'. Stimmt das?",
            correctAnswers: ["ja"],
            explanation: "Natürlich schreibt man 'hinten' mit 'h'.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Ist es in der Schweiz erlaubt, dass ein Mann die Schwester seiner Witwe heiratet?",
            correctAnswers: ["geht nicht", "unmöglich", "nicht möglich", "nein weil der mann dann tod ist", "der mann ist dann tod", "mann ist tot", "nein weil der mann dann nicht mehr lebt"],
            explanation: "Das geht nicht. Der Mann würde dann nicht mehr leben.",
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
        {
            text: "Woher kommt eine Ente, die in Duisburg im Rhein schwimmt?",
            correctAnswers: ["ei", "aus einem Ei", "einem ei", "aus dem ei"],
            explanation: "Aus einem Ei.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Eine Taube kann eher 1500kg Weizen fressen als ein Pferd. Stimmt das?",
            correctAnswers: ["ja"],
            explanation: "Ja, eine Taube frisst kein Pferd.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Womit fängt der Tag an und hört die Nacht auf?",
            correctAnswers: ["t", "buchstabe t"],
            explanation: "Mit dem Buchstaben 't'.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Was steht hinter dem Kölner Dom?",
            correctAnswers: ["fragezeichen", "ein fragezeichen", "?", "ein ?"],
            explanation: "Ein Fragezeichen.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Was macht ein Glaser, wenn er kein Glas hat?",
            correctAnswers: ["er trinkt aus der Flasche", "trinken aus der Flasche", "trinkt aus der flasche", "aus der flasche trinken", "aus flasche trinken"],
            explanation: "Er trinkt aus der Flasche.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Wie viele Leitern bräuchte man von der Erde bis zum Mond?",
            correctAnswers: ["1", "eine", "nur eine", "eine große", "eine lange", "eine, sie muss nur lang genug sein", "nur eine, sie muss nur lang genug sein"],
            explanation: "Nur eine, sie muss nur lang genug sein.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Von sechs Kerzen werden vier ausgeblasen. Wie viele bleiben übrig?",
            correctAnswers: ["4", "vier"],
            explanation: "Vier, die restlichen brennen ab.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Was ergibt sieben und sieben und sieben?",
            correctAnswers: ["feinen sand", "sand"],
            explanation: "Feinen Sand.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Erhält ein Nachtwächter, der am Tage stirbt, eine Pension?",
            correctAnswers: ["nein", "er stirbt", "er ist tod", "tod", "geht nicht", "nicht möglich", "unmöglich"],
            explanation: "Nein, er ist Tod.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Auf einer Stange sitzen 10 Tauben. Ein Jäger schießt eine Taube ab. Wie viele sitzen noch da?",
            correctAnswers: ["0", "keine", "null"],
            explanation: "Keine, weil die anderen durch den Schuss davonfliegen",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "'Du bist mein Sohn, aber ich bin nicht dein Vater'. Wer sagt das?",
            correctAnswers: ["mutter", "mudda", "mama"],
            explanation: "Die Mutter.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Auf dem Dorfplatz steht ein schwerer Stein. Jeden morgen, wenn der Hahn kräht, bewegt er sich. Ist das möglich?",
            correctAnswers: ["ja"],
            explanation: "Ja, der Hahn kann sich bewegen.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Kann ein Mensch, der westlich von New York lebt, in Manchester begraben sein?",
            correctAnswers: ["nein", "lebt noch", "geht nicht", "unmöglich", "nicht möglich"],
            explanation: "Nein, er lebt ja noch.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Du gehst um 8 Uhr ins Bett und schläfst sofort ein. Dein Wecker ist so gestellt, dass du um 9 Uhr aufwachst, wie lange hast du geschlafen?",
            correctAnswers: ["1 stunde", "eine stunde", "1", "1h"],
            explanation: "Eine Stunde.",
            answer: undefined,
            isCorrect: undefined,
        },
        {
            text: "Was war am 24.12.1969 in Berlin?",
            correctAnswers: ["weihnachten", "heiligabend"],
            explanation: "Heiligabend.",
            answer: undefined,
            isCorrect: undefined,
        },
    ]);

const score = computed(() =>
    questions.reduce((total, question) => total + (question.isCorrect ? 1 : 0), 0)
);

const answered = computed(() =>
    questions.reduce((total, question) => total + (question.isCorrect !== undefined ? 1 : 0), 0)
);

const percentageAnswered = computed(() =>
{
    const totalQuestions = questions.length;
    return totalQuestions === 0 ? 0 : Math.round((answered.value / totalQuestions) * 100);
});

const percentageCorrect = computed(() =>
{
    const totalQuestions = questions.length;
    return totalQuestions === 0 ? 0 : Math.round((score.value / totalQuestions) * 100);
});


const rank = computed(() =>
{
    const percentage = percentageCorrect.value;
    const rankThresholds = {
        4: [100, 100],
        3: [75, 99],
        2: [60, 74],
        1: [25, 59],
        0: [0, 24],
    };

    for (const [rank, [min, max]] of Object.entries(rankThresholds))
    {
        if (percentage >= min && percentage <= max)
        {
            return Number(rank);
        }
    }
    return 0;
});

const allQuestionsAnswered = computed(() =>
    questions.every((question) => question.isCorrect !== undefined)
);

// Watch for changes in `allQuestionsAnswered`
watch(allQuestionsAnswered, (newValue) =>
{
    if (newValue)
    {
        router.replace({ name: router.currentRoute.name, hash: '#results' });
    }
});

function checkAnswer(index)
{
    let sound;

    if (this.validateAnswer(this.questions[index].answer, this.questions[index].correctAnswers))
    {
        this.questions[index].isCorrect = true;
        sound = correctSound;
    } else
    {
        this.questions[index].isCorrect = false;
        sound = wrongSound;
    }

    sound.currentTime = 0; // Restart sound
    sound.play();
}

function validateAnswer(userAnswer, correctAnswers)
{
    if (!userAnswer || !correctAnswers || correctAnswers.length === 0)
    {
        return false;
    }

    const normalizedInput = userAnswer.toLowerCase().trim();

    return correctAnswers.some(correctAnswer =>
    {
        const normalizedCorrect = correctAnswer.toLowerCase().trim();

        // 1. Exact match (always check for exact match)
        if (normalizedInput === normalizedCorrect)
        {
            console.log("Answer was an exact match")
            return true;
        }

        // 2. Check if normalizedCorrect is contained within normalizedInput
        // Only do this if the correct answer is longer than 2 characters
        if (normalizedCorrect.length > 2 && normalizedInput.includes(normalizedCorrect))
        {
            console.log("Answer was included")
            return true;
        }

        console.log("Answer was not found")
        return false
    });
}
</script>