
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import your translation resources
import enTranslation from '../locale/en.json';
import frTranslation from '../locale/fr.json';
import esTranslation from '../locale/es.json';
import ptTranslation from '../locale/pt.json';

i18n
    .use(LanguageDetector)
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
