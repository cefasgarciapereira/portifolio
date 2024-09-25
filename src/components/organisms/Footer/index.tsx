import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {`© ${new Date().getFullYear()} — Cefas Garcia Pereira`}
    </footer>
  )
}