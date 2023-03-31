import { useContext, useState } from "react"
import LanguageContext from "../../../contexts/language"

export default function LanguageToggler() {
    const { language, selectLanguage } = useContext(LanguageContext)

    function toggleLanguage() {
        selectLanguage(language === "pt" ? "en" : "pt")
    }

    return (
        <button
            onClick={toggleLanguage}
            className="btn--clean circular"
        >
            <div className="box-18">
                {language === "pt" ? "en" : "pt"}
            </div>
        </button>
    )
}