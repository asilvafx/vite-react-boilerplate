
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import your translation resources
import enTranslation from '../locale/en.json';
import frTranslation from '../locale/fr.json';
import esTranslation from '../locale/es.json';
import ptTranslation from '../locale/pt.json';

const customLanguageDetector = {
    type: 'languageDetector',
    async: false,
    detect: () => {
        let lang = localStorage.getItem('i18nextLng') || navigator.language || 'en';
        if (lang.startsWith('pt')) return 'pt';
        if (lang.startsWith('en')) return 'en';
        if (lang.startsWith('es')) return 'es';
        if (lang.startsWith('fr')) return 'fr';
        return 'en';
    },
    init: () => {},
    cacheUserLanguage: () => {},
};

i18n
    .use(customLanguageDetector)
    .use(initReactI18next)
    .init({
        // For more options, check the documentation
        supportedLngs: ['en', 'fr', 'es', 'pt'],
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false, // React already safes from xss
        },
        resources: {
            en: {
                translation: enTranslation,
            },
            es: {
                translation: esTranslation,
            },
            fr: {
                translation: frTranslation,
            },
            pt: {
                translation: ptTranslation,
            },
        },
    });

export default i18n;
