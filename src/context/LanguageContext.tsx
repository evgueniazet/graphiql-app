'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { Locale } from '../types/Locale';

interface LanguageContextProps {
  language: Locale;
  setLanguage: React.Dispatch<React.SetStateAction<Locale>>;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const languageFromStorage = localStorage.getItem('language');
  const defaultLanguage: Locale = 'en';

  const [language, setLanguage] = useState<Locale>(
    (languageFromStorage as Locale) || defaultLanguage
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
