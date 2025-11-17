import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface LanguageSwitcherProps {
  variant?: 'full' | 'compact';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'full' }) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === Language.EN ? Language.TE : Language.EN);
  };

  const baseClasses = "flex items-center justify-center rounded-lg transition-colors duration-200 font-medium";
  
  const variantClasses = {
    full: "w-full p-3 bg-brand-surface hover:bg-opacity-80 text-brand-text",
    compact: "p-2 hover:bg-brand-surface text-white"
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`${baseClasses} ${variantClasses[variant]}`}
    >
      {language === Language.EN ? 'తెలుగు' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;
