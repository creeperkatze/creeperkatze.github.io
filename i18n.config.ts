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

            index: {
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

            superslide: {
                mirror_reminder: "Mirror version coming here soon...",
                event: {
                    easter: "Easter",
                    summer: "Summer",
                    anniversary: "Anniversary",
                    halloween: "Halloween",
                    christmas: "Christmas",
                },
            },

            skills: {
                title_software: "Software",
                title_technologies: "Technologies & Frameworks",
            },

            blog: {
                title: "My Blog"
            },

            error: {
                404: "Even this cute cat couldn't find the page you were looking for ;(",
                else: "This cute cat is puzzled. An error occured ;(",
            },

            button: {
                default: "Button",
                home: "Home",
                back: "Back",
                new_joke: "Another one!",
                new_cat: "More!",
            },

            consent_panel: {
                text_part1: "This website uses content from third-party sources (e.g. ",
                text_part2: "Itch.io",
                text_part3: "), which may transmit data to external servers. Please agree to load this content.",
                button: "Load content",
            },

            joke: {
                credits_part1: "Jokey by ",
                credits_part2: "JokeAPI",
            },

            cat: {
                loading: "Loading...",
                credits_part1: "Cats by ",
                credits_part2: "TheCatAPI",
                credits: " ",
            },

            idiot_test: {
                title: "Idiot Test",
                subtitle: "Answer all questions to get your rank!",
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
        },
        de: {
            navbar: {
                home: "Home",
                projects: "Projekte",
                skills: "Skills",
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

            index: {
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

            superslide: {
                mirror_reminder: "Hier erscheint bald eine Mirror-Version...",
                event: {
                    easter: "Ostern",
                    summer: "Sommer",
                    anniversary: "Jubiläum",
                    halloween: "Halloween",
                    christmas: "Weihnachten",
                },
            },

            skills: {
                title_software: "Programme",
                title_technologies: "Technologien & Frameworks",
            },

            blog: {
                title: "Mein Blog"
            },

            error: {
                404: "Selbst diese süße Katze konnte die gesuchte Seite nicht finden ;(",
                else: "Diese süße Katze ist verwirrt. Es ist ein Fehler aufgetreten ;(",
            },

            button: {
                default: "Knopf",
                home: "Home",
                back: "Zurück",
                new_joke: "Noch einer!",
                new_cat: "Mehr!",
            },

            consent_panel: {
                text_part1: "Diese Website verwendet Inhalte von Drittanbietern (z. B. ",
                text_part2: "Itch.io",
                text_part3: "), die möglicherweise Daten an externe Server übermitteln. Bitte stimme zu, den Inhalt zu laden.",
                button: "Inhalt laden",
            },

            joke: {
                credits_part1: "Witze von ",
                credits_part2: "JokeAPI",
            },

            cat: {
                loading: "Lädt...",
                credits_part1: "Katzen von ",
                credits_part2: "TheCatAPI",
                credits: " ",
            },

            idiot_test: {
                title: "Idiotentest",
                subtitle: "Beantworte alle Fragen, um deinen Rang zu erhalten!",
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
        }
    }
}))