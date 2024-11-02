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
        },

        footer: {
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
        },

        consent_panel: {
            text: "This website uses content from third-party sources (e.g. <a href='https://itch.io/docs/legal/privacy-policy' target='_blank'>Itch.io</a>), which may transmit data to external servers. Please agree to load this content.",
            button: "Load content",
        }
      },
      de: {
        navbar: {
            home: "Home",
            projects: "Projekte",
            skills: "Skills",
            blog: "Blog",
        },

        footer: {
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
        },

        consent_panel: {
            text: "Diese Website verwendet Inhalte von Drittanbietern (z. B. <a href='https://itch.io/docs/legal/privacy-policy' target='_blank'>Itch.io</a>), die möglicherweise Daten an externe Server übermitteln. Bitte stimme zu, den Inhalt zu laden.",
            button: "Inhalt laden",
        }
      }
    }
  }))