import HomeButton from "@/app/components/organisms/HomeButton"
import ThemeToggler from "@/app/components/organisms/ThemeToggler"
import ContrastToggler from "@/app/components/organisms/ContrastToggler"
import LanguageToggler from "@/app/components/organisms/LanguageToggler"

import styles from "./toolbar.module.css"

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <HomeButton />
      <ThemeToggler />
      <ContrastToggler />
      <LanguageToggler />
    </div>
  )
}