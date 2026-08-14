'use client'

import Link from "next/link"

import HomeButton from "@/components/organisms/HomeButton"
import ThemeToggler from "@/components/organisms/ThemeToggler"
import ContrastToggler from "@/components/organisms/ContrastToggler"
import LanguageToggler from "@/components/organisms/LanguageToggler"
import useLocale from "@/hooks/useLocale"
import { localizedPath } from "@/utils/seo"

import styles from "./menu.module.css"

export default function Toolbar() {
  const locale = useLocale()

  return (
    <div className={styles.menu}>
      <HomeButton />
      <Link href={localizedPath(locale, "/blog")} className="menu-item">blog</Link>
      <ThemeToggler />
      <ContrastToggler />
      <LanguageToggler />
    </div>
  )
}
