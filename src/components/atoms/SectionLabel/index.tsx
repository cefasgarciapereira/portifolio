import { ReactNode } from "react";

import effects from "@/styles/effects.module.css";

import styles from "./sectionlabel.module.css";

interface SectionLabelProps {
  children: ReactNode;
  withCursor?: boolean;
  className?: string;
}

export default function SectionLabel({ children, withCursor = false, className = "" }: SectionLabelProps) {
  return (
    <span className={`${styles.label} ${className}`}>
      {children}
      {withCursor && <span className={`${styles.cursor} ${effects.blink}`} aria-hidden="true" />}
    </span>
  );
}
