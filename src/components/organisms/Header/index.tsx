import Link from "next/link";

import Container from "@/components/atoms/Container";
import LanguageToggler from "@/components/organisms/LanguageToggler";
import ThemeToggler from "@/components/organisms/ThemeToggler";
import { Language } from "@/contexts/language";
import typography from "@/styles/typography.module.css";
import { localizedPath } from "@/utils/seo";

import { content } from "./translation";
import styles from "./header.module.css";

interface HeaderProps {
  locale: Language;
}

export default function Header({ locale }: HeaderProps) {
  const text = content[locale];

  return (
    <header className={styles.header} id="root">
      <Container className={styles.bar}>
        <Link className={`${styles.brand} ${typography.display}`} href={localizedPath(locale, "/")}>
          cefas
        </Link>
        <div className={styles.controls}>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            {text.status}
          </span>
          <LanguageToggler />
          <ThemeToggler locale={locale} />
        </div>
      </Container>
    </header>
  );
}
