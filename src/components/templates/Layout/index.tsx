import { Archivo, JetBrains_Mono } from "next/font/google";
import { ReactNode } from "react";

import ConsentScript from "@/components/atoms/ConsentScript";
import ScreenEffects from "@/components/atoms/ScreenEffects";
import ThemeScript from "@/components/atoms/ThemeScript";
import BottomNav from "@/components/organisms/BottomNav";
import ConsentBanner from "@/components/organisms/ConsentBanner";
import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { Language } from "@/contexts/language";
import { htmlLang } from "@/utils/seo";
import { DEFAULT_THEME } from "@/utils/theme";

import { content } from "./translation";
import styles from "./layout.module.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

interface LayoutProps {
  children: ReactNode;
  locale?: Language;
  /** Where the language toggle should go when the page has its own translations (e.g. a post). */
  languageLinks?: Partial<Record<Language, string>>;
}

export default function Layout({ children, locale = "en", languageLinks }: LayoutProps) {
  const text = content[locale];

  return (
    <html
      lang={htmlLang(locale)}
      data-theme={DEFAULT_THEME}
      className={`${archivo.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeScript />
        <ConsentScript />
        <ScreenEffects />
        <a className={styles.skip} href="#content">
          {text.skip}
        </a>
        <Header locale={locale} languageLinks={languageLinks} />
        <main id="content">{children}</main>
        <Footer locale={locale} />
        <BottomNav locale={locale} />
        <ConsentBanner locale={locale} />
      </body>
    </html>
  );
}
