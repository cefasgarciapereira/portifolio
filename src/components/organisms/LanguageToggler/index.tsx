'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Language } from "@/contexts/language"
import useLocale from "@/hooks/useLocale"

import styles from "./languagetoggler.module.css"

const LANGUAGES: { locale: Language; label: string; hrefLang: string }[] = [
  { locale: "pt", label: "PT", hrefLang: "pt-BR" },
  { locale: "en", label: "EN", hrefLang: "en" },
]

const ARIA_LABEL: Record<Language, string> = {
  en: "language",
  pt: "idioma",
}

function counterpartPath(pathname: string, target: Language) {
  const isPost = /^\/blog\/[^/]+/.test(pathname)
  if (isPost) {
    return target === "pt" ? "/pt/blog" : "/blog"
  }
  const basePath = pathname.replace(/^\/pt(?=\/|$)/, "") || "/"
  if (target === "en") {
    return basePath
  }
  return `/pt${basePath === "/" ? "" : basePath}`
}

export default function LanguageToggler() {
  const pathname = usePathname() || "/"
  const currentLocale = useLocale()

  return (
    <nav className={styles.toggler} aria-label={ARIA_LABEL[currentLocale]}>
      {LANGUAGES.map(({ locale, label, hrefLang }) => {
        const isActive = locale === currentLocale
        return (
          <Link
            key={locale}
            href={counterpartPath(pathname, locale)}
            hrefLang={hrefLang}
            aria-current={isActive ? "true" : undefined}
            className={`${styles.option} ${isActive ? styles.active : ""}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
