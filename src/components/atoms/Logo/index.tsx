import effects from "@/styles/effects.module.css";
import { SPIN_TRIGGER } from "@/utils/effects";

import styles from "./logo.module.css";

const LOGO_PATH =
  "M 1990 3884 c -334 -38 -605 -128 -843 -281 -229 -146 -466 -388 -607 -618 -113 -185 -212 -466 -251 -715 -18 -110 -18 -410 0 -520 40 -255 137 -527 252 -712 115 -184 318 -407 474 -523 379 -280 811 -407 1270 -375 237 17 519 96 738 207 151 76 419 287 538 424 170 195 320 466 388 699 10 36 22 73 26 82 5 13 -6 23 -52 46 -103 52 -290 122 -395 147 -329 80 -549 48 -873 -125 -336 -181 -426 -211 -568 -191 -247 34 -443 208 -501 442 -21 84 -21 220 0 290 57 193 229 367 410 414 67 17 206 20 284 5 129 -24 282 -131 357 -249 35 -54 35 -54 431 -48 219 4 520 7 670 7 272 0 272 0 266 43 -19 134 -98 376 -165 510 -93 183 -216 352 -360 494 -285 280 -571 434 -967 520 -97 21 -149 26 -302 28 -102 2 -201 1 -220 -1 z";

interface LogoProps {
  label: string;
  className?: string;
}

export default function Logo({ label, className = "" }: LogoProps) {
  return (
    <svg className={`${styles.logo} ${SPIN_TRIGGER} ${className}`} viewBox="0 0 4260 4080" role="img" aria-label={label}>
      <path className={`${styles.mark} ${effects.slowSpin}`} d={LOGO_PATH} strokeWidth={150} />
    </svg>
  );
}
