'use client'

import { useContext } from "react"

import LanguageContext from "@/contexts/language"

export default function LanguageToggler() {
  const { language, selectLanguage } = useContext(LanguageContext)

  function toggleLanguage() {
    selectLanguage(language === "pt" ? "en" : "pt")
  }

  return (
    <a onClick={toggleLanguage} className="cursor-pointer">
      <div className="box-18">
        {language === "pt" ? "english" : "portuguese"}
      </div>
    </a>
  )
}