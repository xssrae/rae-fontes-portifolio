/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from 'react'

type Language = 'pt' | 'en'

interface LanguageContextValue {
  lang: Language
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang')
    return stored === 'en' ? 'en' : 'pt'
  })

  function toggleLang() {
    setLang((prev) => {
      const next = prev === 'pt' ? 'en' : 'pt'
      localStorage.setItem('lang', next)
      return next
    })
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage deve ser usado dentro de LanguageProvider')
  return ctx
}
