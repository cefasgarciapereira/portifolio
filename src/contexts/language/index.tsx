'use client'

import { createContext, useState } from "react";

export type Language = 'en' | 'pt';
export type Translation<T> = { [key in Language]: T };

export interface LangueProviderProps {
  children: JSX.Element;
}

export interface LanguageContextValue {
  language: Language;
  selectLanguage: (newLanguage: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  selectLanguage: () => null,
});

export function LangueProvider({ children }: LangueProviderProps) {
  const [language, setLanguage] = useState<Language>('en');

  function selectLanguage(newLanguage: Language) {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider
      value={{
        language,
        selectLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );

}

export default LanguageContext;