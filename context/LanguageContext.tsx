
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Language } from '../types';
import { UI_TEXT } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  text: typeof UI_TEXT[Language.EN];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.EN);
  const text = UI_TEXT[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, text }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
