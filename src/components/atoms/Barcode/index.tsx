import { CSSProperties } from "react";

import styles from "./barcode.module.css";

export const BARCODE_TRIGGER = "barcode-trigger";

const BAR_COUNT = 46;
const SEED = 7;
const BAR_WIDTHS = [2, 3, 5, 8];
const BAR_GAPS = [2, 4, 7];

function nextSeed(seed: number) {
  return (seed * 9301 + 49297) % 233280;
}

function pickFrom<T>(options: T[], seed: number): T {
  return options[Math.floor((seed / 233280) * options.length)];
}

function generateBars() {
  const bars: { width: number; gap: number }[] = [];
  let seed = SEED;
  for (let index = 0; index < BAR_COUNT; index++) {
    seed = nextSeed(seed);
    const width = pickFrom(BAR_WIDTHS, seed);
    seed = nextSeed(seed);
    const gap = pickFrom(BAR_GAPS, seed);
    bars.push({ width, gap });
  }
  return bars;
}

const BARS = generateBars();

interface BarcodeProps {
  className?: string;
}

export default function Barcode({ className = "" }: BarcodeProps) {
  return (
    <div className={`${styles.barcode} ${className}`} aria-hidden="true">
      {BARS.map((bar, index) => (
        <span
          key={index}
          className={styles.bar}
          style={{ width: bar.width, marginRight: bar.gap, "--bar-index": index } as CSSProperties}
        />
      ))}
    </div>
  );
}
