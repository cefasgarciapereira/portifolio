import Logo from "@/app/components/atoms/Logo"

import styles from "./logo.module.css"

export default function Header() {
  return (
    <header>
      <div className={styles.logo}>
        <Logo />
      </div>
    </header>
  )
}