import { ReactNode } from "react";

import Container from "@/components/atoms/Container";
import GlitchText from "@/components/atoms/GlitchText";
import SectionLabel from "@/components/atoms/SectionLabel";

import styles from "./section.module.css";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  aside?: ReactNode;
  withCursor?: boolean;
  titleAs?: "h1" | "h2";
}

export default function Section({ id, label, title, children, aside, withCursor = false, titleAs = "h2" }: SectionProps) {
  return (
    <section className={styles.section} id={id}>
      <Container>
        <div className={styles.reveal}>
          <header className={styles.header}>
            <div>
              <SectionLabel withCursor={withCursor}>{label}</SectionLabel>
              <GlitchText as={titleAs} text={title} className={styles.title} />
            </div>
            {aside}
          </header>
          {children}
        </div>
      </Container>
    </section>
  );
}
