export default defineI18nConfig(() => ({
    legacy: false,
    fallbackLocale: "en",
    locale: "en",
    messages: {
      en: {
        welcome: "Hello! I'm Creeperkatze. A Unity game developer from Germany, with my current big project being Superslide.\nThis website is still in early developement, and will change drastically over time.",
        navbar: {
            home: "Home",
            projects: "Projects",
            skills: "Skills"
        },

        project_descriptions: {
            superslide: "Slide through epic levels, spend your time in endless mode and climb the leaderboards!",
            flappy_christmas: "Jump through the chimneys!",
            coming_soon: "Coming Soon",
        },

        index: {
            title_projects: "My Projects",
        },
    
        superslide: {
            mirror_reminder: "Mirror version coming here soon...",
        },

        skills: {
            title_software: "Software",
            title_technologies: "Technologies & Frameworks",
        }

      },
      de: {
        welcome: "Hallo! Ich bin Creeperkatze.\nEin Unity-Spieleentwickler aus Deutschland, dessen aktuelles großes Projekt Superslide ist.\nDiese Website befindet sich noch in der Entwicklung und wird sich im Laufe der Zeit drastisch verändern.",
        navbar: {
            home: "Home",
            projects: "Projekte",
            skills: "Skills"
        },

        project_descriptions: {
            superslide: "Slide durch epische Level, verbringe deine Zeit im Endlosmodus und erklimme die Ranglisten!",
            flappy_christmas: "Springe durch die Schornsteine!",
            coming_soon: "Kommt bald",
        },
   
        index: {
            title_projects: "Meine Projekte",
        },

        superslide: {
            mirror_reminder: "Hier erscheint bald eine Mirror-Version...",
        },

        skills: {
            title_software: "Programme",
            title_technologies: "Technologien & Frameworks",
        }
      }
    }
  }))