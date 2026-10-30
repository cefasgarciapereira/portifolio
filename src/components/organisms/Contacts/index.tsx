'use client'

import Link from "next/link"

import { Language } from "@/contexts/language"
import useLocale from "@/hooks/useLocale"
import { localizedPath } from "@/utils/seo"

import styles from "./contacts.module.css"

const buildContacts = (locale: Language) => [
  {
    label: "Blog",
    link: localizedPath(locale, "/blog"),
    target: "_self"
  },
  {
    label: "Linkedin",
    link: "https://www.linkedin.com/in/cefas-garcia-pereira",
    target: "_blank"
  },
  {
    label: "Medium",
    link: "https://cefasgpereira.medium.com/",
    target: "_blank"
  },
  {
    label: "Email",
    link: "mailto:cefasgarciapereira@gmail.com",
    target: "_blank"
  },
  {
    label: "Github",
    link: "https://github.com/cefasgarciapereira",
    target: "_blank"
  }
]

const cvOptions = [
  { label: "Português (PT-BR)", link: "/cv_portuguese.pdf", hrefLang: "pt-BR" },
  { label: "English (EN)", link: "/cv_english.pdf", hrefLang: "en" }
]

export default function Contacts() {
  const locale = useLocale()
  const contacts = buildContacts(locale)
  return (
    <ul className={styles.mt2}>
      {
        contacts.map((contact, index) => (
          <li key={index}>
            <Link
              className={styles.linkSimple}
              href={contact.link}
              style={{
                opacity: +(1 - (index * 0.15))
              }}
              target={contact.target}
            >
              {contact.label}
            </Link>
          </li>
        ))
      }
      <li>
        <details
          className={styles.cv}
          style={{
            opacity: +(1 - (contacts.length * 0.15))
          }}
        >
          <summary className={styles.linkSimple}>CV</summary>
          <ul className={styles.cvOptions}>
            {cvOptions.map((option) => (
              <li key={option.link}>
                <a
                  className={styles.linkSimple}
                  href={option.link}
                  hrefLang={option.hrefLang}
                  type="application/pdf"
                  download
                >
                  {option.label}
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  )
}