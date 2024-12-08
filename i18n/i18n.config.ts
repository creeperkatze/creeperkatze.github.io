import { defineI18nConfig } from "#i18n";

export default defineI18nConfig(() => ({
    legacy: false,
    fallbackLocale: "en",
    locale: "en",
    messages: {
        en: {
            navbar: {
                home: "Home",
                projects: "Projects",
                skills: "Skills",
                blog: "Blog",
                joke: "Joke",
                cat: "Cat",
                idiot_test: "Idiot Test",
            },

            footer: {
                copyright: "Creeperkatze. All rights reserved.",
                text_part1: "Built with ",
                text_part2: " and ",
                text_part3: ". Source available on ",
                link_nuxt: "Nuxt",
                link_tailwind: "Tailwind",
                link_github: "Github",
            },

            project_descriptions: {
                superslide: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
                flappy_christmas: "Jump through the chimneys!",
                coming_soon: "Coming Soon",
            },

            page: {
                index: {
                    title: "Home",
                    description: "I'm Creeperkatze, a Unity game developer from Germany, with my current big project being Superslide. Currently also stumbling into web development.",
                    introduction: "Hello! I'm Creeperkatze",
                    typing_effect: {
                        unity_dev: "Unity Game Developer",
                        mobile_game_dev: "Mobile Game Developer",
                        web_dev: "Web Developer",
                        pixel_artist: "Pixel Artist",
                        superslide_dev: "Creator of Superslide",
                        stardew_modder: "Stardew Valley Modder",
                    },
                    welcome: "A Unity game developer from Germany, with my current big project being Superslide.\nThis website is still in early developement, and will change drastically over time.",
                    title_projects: "My Projects",
                },

                projects: {
                    title: "Projects",
                    description: "My Unity game developement projects, currently consisting of Superslide and Flappy Christmas",
                },

                superslide: {
                    title: "Superslide",
                    description: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
                    mirror_reminder: "Mirror version coming here soon...",
                    legal: "Legal",
                    privacy_policy: "Privacy Policy",
                    terms: "Terms & Conditions",
                    event: {
                        easter: "Easter",
                        summer: "Summer",
                        anniversary: "Anniversary",
                        halloween: "Halloween",
                        christmas: "Christmas",
                    },
                },

                flappy_christmas: {
                    title: "Flappy Christmas",
                    description: "Jump through the chimneys!",
                },

                skills: {
                    title: "Skills",
                    description: "My skills, including both software I'm working with and which technologies & frameworks I am using",
                    title_software: "Software",
                    title_technologies: "Technologies & Frameworks",
                },

                blog: {
                    title: "Blog",
                    heading: "My Blog",
                    description: "My blog, consisting of articles about Unity game developement, web developement, and more!",
                },

                joke: {
                    title: "Joke",
                    description: "Generate a random joke using JokeAPI.",
                    credits_part1: "Joke by ",
                    credits_part2: "JokeAPI",
                },

                yippee: {
                    title: "Yippee",
                    description: "Meine Mama hat mir einfach erlaubt, dass ich Cola trinken darf!"
                },

                cat: {
                    title: "Cat",
                    description: "Get a random cat photo using TheCatAPI.",
                    loading: "Loading...",
                    credits_part1: "Cats by ",
                    credits_part2: "TheCatAPI",
                    credits: " ",
                },

                idiot_test: {
                    title: "Idiot Test",
                    description: "Test whether you're an idiot with these crazy and tricky questions.",
                    text: "Have you ever wondered whether you're an idiot? Then you've come to the right place! Answer all 25 questions in this online idiot test to get your result!",
                    progress: "Progress: ",
                    results: "Results",
                    score: "Your score: ",
                    percentage: "That is: ",
                    rank_title: "Your rank:",
                    disclaimer: "(Please don't take it too seriously)",
                    rank: {
                        name: {
                            0: "Idiot",
                            1: "Amateur",
                            2: "NPC",
                            3: "Smarty pants",
                            4: "Genius",
                        },
                        description: {
                            0: "You somehow managed to answer hardly any questions correctly...",
                            1: "Well... You're not an idiot, but you can do better!",
                            2: "Not bad at all! A pretty... average score.",
                            3: "Ok, ok, not bad... But you're still not a genius.",
                            4: "You answered ALL the questions correctly... Respect!",
                        },
                    },
                },

                error: {
                    404: "Even this cute cat couldn't find the page you were looking for ;(",
                    else: "This cute cat is puzzled. An error occured ;(",
                },
            },

            button: {
                default: "Button",
                home: "Home",
                back: "Back",
                new_joke: "Another one!",
                new_cat: "More!",
                yippee: "Yippee!",
            },

            consent_panel: {
                text_part1: "This website uses content from third-party sources (e.g. ",
                text_part2: "Itch.io",
                text_part3: "), which may transmit data to external servers. Please agree to load this content.",
                button: "Load content",
            },

            superslide_disclaimer: {
                text: "This is the web version of Superslide. Your progress is not yet being saved.",
                button: "Continue",
            },
        },
        de: {
            navbar: {
                home: "Home",
                projects: "Projekte",
                skills: "Fähigkeiten",
                blog: "Blog",
                joke: "Witz",
                cat: "Kadze",
                idiot_test: "Idiotentest",
            },

            footer: {
                copyright: "Creeperkatze. Alle Rechte vorbehalten.",
                text_part1: "Erstellt mit ",
                text_part2: " und ",
                text_part3: ". Quelle verfügbar auf ",
                link_nuxt: "Nuxt",
                link_tailwind: "Tailwind",
                link_github: "Github",
            },

            project_descriptions: {
                superslide: "Slide durch epische Level, verbringe deine Zeit im Endlosmodus und erklimme die Ranglisten!",
                flappy_christmas: "Springe durch die Schornsteine!",
                coming_soon: "Kommt bald",
            },

            page: {
                index: {
                    title: "Home",
                    description: "Ich bin Creeperkatze, ein Unity-Spieleentwickler aus Deutschland. Mein aktuelles großes Projekt ist Superslide. Momentan beschäftige ich mich auch mit Webentwicklung.",
                    introduction: "Hallo! Ich bin Creeperkatze",
                    typing_effect: {
                        unity_dev: "Unity Spieleentwickler",
                        mobile_game_dev: "Handyspiel-Entwickler",
                        web_dev: "Web-Entwickler",
                        pixel_artist: "Pixelartist",
                        superslide_dev: "Ersteller von Superslide",
                        stardew_modder: "Stardew Valley Modder",
                    },
                    welcome: "Ein Unity-Spieleentwickler aus Deutschland, dessen aktuelles großes Projekt Superslide ist.\nDiese Website befindet sich noch in der Entwicklung und wird sich im Laufe der Zeit drastisch verändern.",
                    title_projects: "Meine Projekte",
                },

                projects: {
                    title: "Projekte",
                    description: "Meine Unity-Spielentwicklungsprojekte, derzeit bestehend aus Superslide und Flappy Christmas",
                },

                superslide: {
                    title: "Superslide",
                    description: "Slide durch epische Level, verbringe deine Zeit im Endlosmodus und erklimme die Ranglisten!",
                    mirror_reminder: "Hier erscheint bald eine Mirror-Version...",
                    legal: "Legales",
                    privacy_policy: "Datenschutzerklärung",
                    terms: "Nutzungsbedingungen",
                    event: {
                        easter: "Ostern",
                        summer: "Sommer",
                        anniversary: "Jubiläum",
                        halloween: "Halloween",
                        christmas: "Weihnachten",
                    },
                },

                flappy_christmas: {
                    title: "Flappy Christmas",
                    description: "Springe durch die Schornsteine!",
                },

                skills: {
                    title: "Fähigkeiten",
                    description: "Meine Fähigkeiten, darunter sowohl die Software, mit der ich arbeite, als auch die Technologien und Frameworks, die ich verwende",
                    title_software: "Programme",
                    title_technologies: "Technologien & Frameworks",
                },

                blog: {
                    title: "Blog",
                    heading: "Mein Blog",
                    description: "Mein Blog, mit Artikeln über die Entwicklung von Unity-Spielen, Web-Entwicklung und mehr!",
                },

                joke: {
                    title: "Witz",
                    description: "Generieren einen zufälligen Witz von der JokeAPI.",
                    credits_part1: "Witze von ",
                    credits_part2: "JokeAPI",
                },

                yippee: {
                    title: "Yippee",
                    description: "Meine Mama hat mir einfach erlaubt, dass ich Cola trinken darf!"
                },

                cat: {
                    title: "Kadze",
                    description: "Erhalte ein zufälliges Katzenfoto von TheCatAPI.",
                    loading: "Lädt...",
                    credits_part1: "Katzen von ",
                    credits_part2: "TheCatAPI",
                    credits: " ",
                },

                idiot_test: {
                    title: "Idiotentest",
                    description: "Teste mit diesen verrückten und kniffligen Fragen, ob du ein Idiot bist.",
                    text: "Hast du dich schon einmal gefragt, ob du ein Idiot bist? Dann bist du hier genau richtig! Beantworte in diesem Online-Idiotentest alle 25 Fragen, um dein Ergebnis zu erhalten!",
                    progress: "Fortschritt: ",
                    results: "Ergebnisse",
                    score: "Deine Punktzahl: ",
                    percentage: "Das sind: ",
                    rank_title: "Dein Rang:",
                    disclaimer: "(Bitte nicht zu ernst nehmen)",
                    rank: {
                        name: {
                            0: "Idiot",
                            1: "Amateur",
                            2: "NPC",
                            3: "Schlaumeier",
                            4: "Genie",
                        },
                        description: {
                            0: "Du hast es irgendwie geschafft kaum eine Frage richtig zu beantworten...",
                            1: "Na ja... Du bist zwar kein Idiot aber das geht besser!",
                            2: "Garnicht so übel! Eine ziemlich... durchschnittliche Punktzahl.",
                            3: "Ok, ok, nicht schlecht... Aber ein Genie bist du trotzdem nicht.",
                            4: "Du hast ALLE Fragen richtig beantwortet... Respekt!",
                        },
                    },
                },

                error: {
                    404: "Selbst diese süße Katze konnte die gesuchte Seite nicht finden ;(",
                    else: "Diese süße Katze ist verwirrt. Es ist ein Fehler aufgetreten ;(",
                },
            },

            button: {
                default: "Knopf",
                home: "Home",
                back: "Zurück",
                new_joke: "Noch einer!",
                new_cat: "Mehr!",
                yippee: "Yippee!",
            },

            consent_panel: {
                text_part1: "Diese Website verwendet Inhalte von Drittanbietern (z. B. ",
                text_part2: "Itch.io",
                text_part3: "), die möglicherweise Daten an externe Server übermitteln. Bitte stimme zu, den Inhalt zu laden.",
                button: "Inhalt laden",
            },

            superslide_disclaimer: {
                text: "Dies ist die Web-Version von Superslide. Dein Fortschritt wird momentan noch nicht gepeichert.",
                button: "Fortfahren",
            },
        }
    }
}))