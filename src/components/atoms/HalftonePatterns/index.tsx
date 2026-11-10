import styles from "./halftonepatterns.module.css";

export const HALFTONE_MARK_FILL = "url(#halftone-mark)";
export const HALFTONE_BACKGROUND_FILL = "url(#halftone-background)";
export const HALFTONE_FADE_MASK = "url(#halftone-fade)";

export default function HalftonePatterns() {
  return (
    <svg className={styles.hidden} aria-hidden="true" focusable="false">
      <defs>
        <pattern id="halftone-mark" width="2.6" height="2.6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle className={styles.markDot} cx="1.3" cy="1.3" r="1.05" />
        </pattern>
        <pattern id="halftone-background" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle className={styles.backgroundDot} cx="3" cy="3" r="1.25" />
        </pattern>
        <linearGradient id="halftone-fade-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".85" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="halftone-fade">
          <rect x="-20" y="-20" width="200" height="140" fill="url(#halftone-fade-gradient)" />
        </mask>
      </defs>
    </svg>
  );
}
