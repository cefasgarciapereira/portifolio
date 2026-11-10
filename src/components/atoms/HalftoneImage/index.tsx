import { CSSProperties } from "react";

import effects from "@/styles/effects.module.css";

import styles from "./halftoneimage.module.css";

interface HalftoneImageProps {
  src: string;
  label: string;
  className?: string;
}

export default function HalftoneImage({ src, label, className = "" }: HalftoneImageProps) {
  const style = { "--mask": `url(${src})` } as CSSProperties;

  return <span role="img" aria-label={label} className={`${styles.halftone} ${effects.logoGlitch} ${className}`} style={style} />;
}
