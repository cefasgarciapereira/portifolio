import Link from "next/link";

import Container from "@/components/atoms/Container";
import LanguageToggler from "@/components/organisms/LanguageToggler";
import ThemeToggler from "@/components/organisms/ThemeToggler";
import { Language } from "@/contexts/language";
import typography from "@/styles/typography.module.css";
import { localizedPath } from "@/utils/seo";

import styles from "./header.module.css";

interface HeaderProps {
  locale: Language;
  languageLinks?: Partial<Record<Language, string>>;
}

export default function Header({ locale, languageLinks }: HeaderProps) {
  return (
    <header className={styles.header} id="root">
      <Container className={styles.bar}>
        <Link className={`${styles.brand} ${typography.display}`} href={localizedPath(locale, "/")}>
          cefas
        </Link>
        <div className={styles.controls}>
          <LanguageToggler locale={locale} links={languageLinks} />
          <ThemeToggler locale={locale} />
        </div>
      </Container>
    </header>
  );
}
