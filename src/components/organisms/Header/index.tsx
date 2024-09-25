import Logo from "@/components/atoms/Logo"
import Menu from "@/components/organisms/Menu"

import styles from "./header.module.css"

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <Menu />
    </header>
  )
}