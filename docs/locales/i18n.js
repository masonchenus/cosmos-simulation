// i18n Configuration for Cosmos Simulation
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Load language files
i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: require('./en.js'),
    es: require('./es.json'),
    fr: require('./fr.json'),
    de: require('./de.json'),
    zh: require('./zh.json'),
    ja: require('./ja.json'),
    pt: require('./pt.json'),
    hi: require('./hi.json'),
    ru: require('./ru.json'),
    ko: require('./ko.json'),
    pl: require('./pl.json'),
    sv: require('./sv.json'),
    ar: require('./ar.json'),
    nl: require('./nl.json'),
    it: require('./it.json'),
    tr: require('./tr.json'),
  },
});

// Export for use in components
export default i18next;

// Example usage in components:
// import { useTranslation } from 'react-i18next';
// const { t } = useTranslation();
// return <h1>{t('welcome.title')}</h1>;

// Change language programmatically:
// i18n.changeLanguage('es');

