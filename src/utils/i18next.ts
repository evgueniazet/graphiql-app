import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from '../local/translationEn.json';
import translationPl from '../local/translationPl.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEn,
    },
    pl: {
      translation: translationPl,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
