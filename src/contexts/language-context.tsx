"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

type Language = "en" | "ru";

type Translations = typeof en;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Translations> = { en, ru };

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const getDescendantProp = (
  obj: Record<string, unknown>,
  desc: string
): unknown => {
  const arr = desc.split(".");
  while (arr.length) {
    const next = arr.shift();
    if (next && obj.hasOwnProperty(next)) {
      obj = obj[next];
    } else {
      return undefined;
    }
  }
  return obj;
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("ru");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && ["en", "ru"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
    } else {
      document.documentElement.lang = language;
    }
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const translation = getDescendantProp(translations[language], key);
    return translation || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
