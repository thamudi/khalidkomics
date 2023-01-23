import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext({});

export const LanguageContextWrapper = ({ }) => {
  const [language, setLanguage] = useState('en-US');

  const languageState = {
    language,
    setLanguage
  }

  return (
    <LanguageContext.Provider value={languageState}>
    </LanguageContext.Provider>
  )
}