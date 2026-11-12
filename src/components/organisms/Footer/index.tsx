import Container from "@/components/atoms/Container";
import { ConsentPreferencesLink } from "@/components/organisms/ConsentBanner";
import { Language } from "@/contexts/language";

import { content } from "./translation";
import styles from "./footer.module.css";

interface FooterProps {
  locale: Language;
}

export default function Footer({ locale }: FooterProps) {
  const text = content[locale];

  return (
    <footer className={styles.footer}>
      <Container className={styles.content}>
        <span>{`© ${new Date().getFullYear()} Cefas Garcia Pereira`}</span>
        <span>{text.madeWith}</span>
        <span>cefas.me</span>
        <ConsentPreferencesLink locale={locale} />
      </Container>
    </footer>
  );
}
