import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import enCommon from '../locales/en/common.json';
import enNavigation from '../locales/en/navigation.json';
import enContent from '../locales/en/content.json';
import ptCommon from '../locales/pt/common.json';
import ptNavigation from '../locales/pt/navigation.json';
import ptContent from '../locales/pt/content.json';
import esCommon from '../locales/es/common.json';
import esNavigation from '../locales/es/navigation.json';
import esContent from '../locales/es/content.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,
    react: {
      useSuspense: false
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage']
    },
    resources: {
      en: {
        common: enCommon,
        navigation: enNavigation,
        content: enContent
      },
      pt: {
        common: ptCommon,
        navigation: ptNavigation,
        content: ptContent
      },
      es: {
        common: esCommon,
        navigation: esNavigation,
        content: esContent
      }
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;