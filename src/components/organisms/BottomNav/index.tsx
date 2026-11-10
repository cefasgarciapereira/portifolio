"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Clock from "@/components/atoms/Clock";
import Container from "@/components/atoms/Container";
import { Language } from "@/contexts/language";
import useActiveSection from "@/hooks/useActiveSection";
import { localizedPath } from "@/utils/seo";

import { content, SECTION_IDS } from "./translation";
import styles from "./bottomnav.module.css";

const CLOCK_LABEL = "SP";
const CLOCK_TIME_ZONE = "America/Sao_Paulo";

interface BottomNavProps {
  locale: Language;
}

export default function BottomNav({ locale }: BottomNavProps) {
  const pathname = usePathname();
  const activeId = useActiveSection(SECTION_IDS);
  const text = content[locale];
  const homePath = localizedPath(locale, "/");
  const isHome = pathname === homePath;

  return (
    <nav className={styles.nav} aria-label={text.aria}>
      <Container className={styles.content}>
        {text.items.map((item) => {
          const isActive = isHome && item.id === (activeId ?? SECTION_IDS[0]);
          return (
            <Link
              key={item.id}
              href={isHome ? `#${item.id}` : `${homePath}#${item.id}`}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
              aria-current={isActive ? "location" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
        <Clock label={CLOCK_LABEL} timeZone={CLOCK_TIME_ZONE} />
      </Container>
    </nav>
  );
}
