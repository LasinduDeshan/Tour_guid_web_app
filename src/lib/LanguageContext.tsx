"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, translations } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, defaultValue?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  // Load language from localStorage on client side mount
  useEffect(() => {
    const savedLang = localStorage.getItem("preferred_language") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "fr" || savedLang === "de" || savedLang === "es" || savedLang === "zh")) {
      setLanguageState(savedLang);
      document.cookie = `preferred_language=${savedLang}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred_language", lang);
    document.cookie = `preferred_language=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  };

  // Safe translation helper with clean dynamic database fallback
  const t = (key: string, defaultValue?: string): string => {
    if (!key) return "";
    
    const activeDict = translations[language];
    
    // 1. Direct key match (e.g. "nav.tours")
    if (activeDict && activeDict[key]) {
      return activeDict[key];
    }
    
    // 2. Trimmed database-value dynamic match (e.g. "Colombo Tours")
    const trimmedKey = key.trim();
    if (activeDict && activeDict[trimmedKey]) {
      return activeDict[trimmedKey];
    }
    
    // 3. Fallback to default translation
    return defaultValue !== undefined ? defaultValue : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider");
  }
  return context;
};
