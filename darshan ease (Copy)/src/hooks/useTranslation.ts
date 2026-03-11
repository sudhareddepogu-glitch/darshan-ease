import { useEffect } from "react";
import { translations, Language, TranslationKey } from "../data/translations";

export function useTranslation(language: Language, setLanguage: (lang: Language) => void) {
  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("darshanease-language") as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, [setLanguage]);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("darshanease-language", language);
  }, [language]);

  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    let text = translations[language][key] || translations.en[key] || key;
    
    // Replace parameters in the text
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        text = text.replace(`{${param}}`, String(value));
      });
    }
    
    return text;
  };

  return { t };
}
