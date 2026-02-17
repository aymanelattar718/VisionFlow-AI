'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { appConfig } from '@/config/app.config';
import arTranslations from '@/translations/ar.json';
import enTranslations from '@/translations/en.json';

type Language = 'ar' | 'en';
type TranslationKey = keyof typeof arTranslations;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

const translations: Record<Language, typeof arTranslations> = {
  ar: arTranslations,
  en: enTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Initialize language from localStorage synchronously on mount
  const getInitialLanguage = (): Language => {
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return appConfig.defaultLanguage as Language;
    }

    try {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'ar' || savedLanguage === 'en')) {
        return savedLanguage;
      }
    } catch (error) {
      // localStorage might not be available
      console.error('Error reading localStorage:', error);
    }
    return appConfig.defaultLanguage as Language;
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);
  const [mounted, setMounted] = useState(false);

  // Mark as mounted after first render
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = appConfig.languages[language].dir;
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  // Language change handler
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('language', lang);
      }
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        value = translations.en;
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object' && fallbackKey in value) {
            value = value[fallbackKey];
          } else {
            return key;
          }
        }
        return value;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  const dir = appConfig.languages[language].dir;

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};
