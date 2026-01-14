# Cosmos Simulation i18n (Internationalization)

This directory contains translation files for the Cosmos Simulation documentation.

## Supported Languages

| Code | Language   | Native Name |
| ---- | ---------- | ----------- |
| en   | English    | English     |
| es   | Spanish    | Español     |
| fr   | French     | Français    |
| de   | German     | Deutsch     |
| zh   | Chinese    | 中文        |
| ja   | Japanese   | 日本語      |
| pt   | Portuguese | Português   |
| hi   | Hindi      | हिन्दी         |
| ru   | Russian    | Русский     |
| ko   | Korean     | 한국어      |
| pl   | Polish     | Polski      |
| sv   | Swedish    | Svenska     |
| ar   | Arabic     | العربية     |
| nl   | Dutch      | Nederlands  |
| it   | Italian    | Italiano    |
| tr   | Turkish    | Türkçe      |

## File Structure

```
locales/
├── README.md           # This file
├── i18n.js             # i18n configuration for React apps
├── en.js               # English translations (Node.js module)
├── es.json             # Spanish translations
├── fr.json             # French translations
├── de.json             # German translations
├── zh.json             # Chinese translations
├── ja.json             # Japanese translations
├── pt.json             # Portuguese translations
├── hi.json             # Hindi translations
├── ru.json             # Russian translations
├── ko.json             # Korean translations
├── pl.json             # Polish translations
├── sv.json             # Swedish translations
├── ar.json             # Arabic translations
├── nl.json             # Dutch translations
├── it.json             # Italian translations
└── tr.json             # Turkish translations
```

## Usage

### Using with React and react-i18next

1. Install dependencies:
```bash
npm install i18next react-i18next
```

2. Import and use in your application:
```javascript
import i18n from './locales/i18n';
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('welcome.title')}</h1>
      <p>{t('common.loading')}</p>
    </div>
  );
}
```

3. Change language programmatically:
```javascript
// Change to Spanish
i18n.changeLanguage('es');

// Get current language
const currentLang = i18n.language;
```

### Using with Vanilla JavaScript

```javascript
// Simple translation function
const translations = {
  en: require('./en.js'),
  es: require('./es.json'),
  // ... other languages
};

function t(key, lang = 'en') {
  const keys = key.split('.');
  let result = translations[lang]?.translation;
  
  for (const k of keys) {
    result = result?.[k];
  }
  
  return result || translations.en.translation[key] || key;
}

// Usage
console.log(t('welcome.title', 'es')); // "Simulación Cosmos"
console.log(t('celestial.earth', 'fr')); // "Terre"
```

## Adding a New Language

1. Create a new file `locales/[lang].json` or `locales/[lang].js`
2. Follow the same structure as existing files
3. Add the language to the resources object in `i18n.js`
4. Add the language code and name to the table above

## Translation Keys

All translations use dot notation for organization:

- `nav.*` - Navigation items
- `welcome.*` - Welcome/landing page
- `common.*` - Common UI elements
- `docs.*` - Documentation section headers
- `module.*` - Module names
- `api.*` - API documentation terms
- `celestial.*` - Celestial body names
- `action.*` - Action verbs (button labels)
- `property.*` - Property names
- `unit.*` - Unit names
- `time.*` - Time-related terms
- `footer.*` - Footer items

## Contributing

To contribute translations:

1. Fork the repository
2. Create a new language file or update an existing one
3. Ensure all translation keys are present
4. Test the translations in the application
5. Submit a pull request

## Notes

- English (`en`) is the source language and should be kept up to date
- All languages should have the same set of keys
- Use proper UTF-8 encoding for all files
- JSON files must be valid JSON (no comments)
- JS files can include comments for translators

