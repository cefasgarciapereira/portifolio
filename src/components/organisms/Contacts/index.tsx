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
  },
  {
    label: "CV",
    link: "/cv_english.pdf",
    target: "_blank"
  }
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
    </ul>
  )
}