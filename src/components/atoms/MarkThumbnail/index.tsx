import { HALFTONE_BACKGROUND_FILL, HALFTONE_FADE_MASK } from "@/components/atoms/HalftonePatterns";
import HalftoneMark, { MarkName } from "@/components/atoms/HalftoneMark";
import effects from "@/styles/effects.module.css";

import styles from "./markthumbnail.module.css";

type MarkThumbnailSize = "card" | "detail";

const MARK_TRANSFORMS: Record<MarkThumbnailSize, string> = {
  card: "translate(56 26)",
  detail: "translate(50 18) scale(1.3)",
};

interface MarkThumbnailProps {
  mark: MarkName;
  size: MarkThumbnailSize;
}

export default function MarkThumbnail({ mark, size }: MarkThumbnailProps) {
  return (
    <svg className={`${styles.thumbnail} ${effects.logoGlitch}`} viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect className={styles.dots} x="-10" y="-10" width="180" height="120" fill={HALFTONE_BACKGROUND_FILL} mask={HALFTONE_FADE_MASK} />
      <g transform={MARK_TRANSFORMS[size]}>
        <g className={styles.mark}>
          <HalftoneMark mark={mark} />
        </g>
      </g>
    </svg>
  );
}
