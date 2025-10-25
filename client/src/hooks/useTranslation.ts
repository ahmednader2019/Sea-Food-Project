import { useLanguage } from '../contexts/LanguageContext';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';

const translations = {
  en: enTranslations,
  ar: arTranslations,
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, language };
}
