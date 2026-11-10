import { AsteriskShape } from "@/components/atoms/Icons";
import effects from "@/styles/effects.module.css";
import { SPIN_TRIGGER } from "@/utils/effects";

import styles from "./retrocomputer.module.css";

export default function RetroComputer() {
  return (
    <svg className={`${styles.computer} ${SPIN_TRIGGER}`} viewBox="0 0 400 344" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs>
        <pattern id="computer-dense" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="2.5" cy="2.5" r="2.15" fill="currentColor" />
        </pattern>
        <pattern id="computer-medium" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="2.5" cy="2.5" r="1.45" fill="currentColor" />
        </pattern>
        <pattern id="computer-light" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <circle cx="2.5" cy="2.5" r=".8" fill="currentColor" />
        </pattern>
      </defs>
      <g className={styles.body}>
        <path d="M282 66 L320 88 L320 240 L282 226 Z" fill="url(#computer-dense)" />
        <path d="M118 60 L282 66 L320 88 L156 82 Z" fill="url(#computer-light)" />
        <rect x="110" y="62" width="172" height="166" rx="10" fill="url(#computer-medium)" />
        <rect x="132" y="82" width="128" height="100" rx="9" fill="url(#computer-dense)" />
        <rect x="142" y="92" width="108" height="80" rx="5" fill="url(#computer-light)" />
        <rect className={styles.glow} x="142" y="92" width="108" height="80" rx="5" />
        <rect x="206" y="196" width="50" height="6" fill="url(#computer-dense)" />
        <path d="M114 228 L282 226 L320 240 L150 246 Z" fill="url(#computer-dense)" />
      </g>
      <path d="M150 266 L332 250 L376 296 L194 316 Z" fill="url(#computer-medium)" />
      <path d="M168 270 L326 256 L356 290 L198 306 Z" fill="url(#computer-light)" />
      <path d="M194 316 L376 296 L376 305 L196 325 Z" fill="url(#computer-dense)" />
      <ellipse cx="96" cy="298" rx="26" ry="15" fill="url(#computer-medium)" />
      <path d="M120 292 C152 282 150 252 182 250" fill="none" stroke="url(#computer-dense)" strokeWidth="5" />
      <polyline className={styles.zigzag} points="-8,92 46,236 72,152 106,212 128,164 170,268" fill="none" strokeWidth="15" strokeLinejoin="miter" />
      <g transform="translate(300 30) scale(3.667)">
        <AsteriskShape className={`${styles.asterisk} ${effects.slowSpin}`} />
      </g>
    </svg>
  );
}
