import Link from "next/link"

import HomeButton from "@/components/organisms/HomeButton"
import ThemeToggler from "@/components/organisms/ThemeToggler"
import ContrastToggler from "@/components/organisms/ContrastToggler"
import LanguageToggler from "@/components/organisms/LanguageToggler"

import styles from "./toolbar.module.css"

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <HomeButton />
      <Link href="/blog">blog</Link>
      <ThemeToggler />
      <ContrastToggler />
      <LanguageToggler />
    </div>
  )
}