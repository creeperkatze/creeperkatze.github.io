import fs from 'fs';

/**
 * Converts a TypeScript object into JSON format.
 * @param {Object} tsObject - The TypeScript object to be converted.
 * @param {string} outputFilePath - The path where the resulting JSON file should be saved.
 */
function convertToJson(tsObject, outputFilePath) {
    // Recursively convert the object to JSON
    const jsonObject = JSON.stringify(tsObject, null, 2);

    // Write the JSON object to a file
    fs.writeFile(outputFilePath, jsonObject, (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`JSON file has been saved to ${outputFilePath}`);
        }
    });
}

// Example TypeScript object structure
const tsStructure = {
    a: [{
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
        },]
};

// Define the output file path
const outputFilePath = './output.json';

// Convert the TypeScript object into JSON and save it to a file
convertToJson(tsStructure, outputFilePath);
