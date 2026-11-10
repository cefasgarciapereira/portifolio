import { ElementType } from "react";

import typography from "@/styles/typography.module.css";

import styles from "./glitchtext.module.css";

export const GLITCH_TRIGGER = "glitch-trigger";

interface GlitchTextProps {
  text: string;
  as?: ElementType;
  className?: string;
}

export default function GlitchText({ text, as: Tag = "span", className = "" }: GlitchTextProps) {
  return (
    <Tag className={`${typography.display} ${styles.glitch} ${className}`} data-text={text}>
      {text}
    </Tag>
  );
}
