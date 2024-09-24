import Link from "next/link"

import styles from "./contacts.module.css"

const contacts = [
  {
    label: "Blog",
    link: "/blog"
  },
  {
    label: "Linkedin",
    link: "https://www.linkedin.com/in/cefas-garcia-pereira"
  },
  {
    label: "Medium",
    link: "https://cefasgpereira.medium.com/"
  },
  {
    label: "Email",
    link: "mailto:cefasgarciapereira@gmail.com"
  },
  {
    label: "Github",
    link: "https://github.com/cefasgarciapereira"
  },
  {
    label: "CV",
    link: "google.com.br"
  }
]

export default function Contacts() {
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
            >
              {contact.label}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}