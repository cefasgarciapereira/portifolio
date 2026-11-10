import styles from "./screeneffects.module.css";

export default function ScreenEffects() {
  return (
    <>
      <svg className={styles.grain} aria-hidden="true">
        <filter id="screen-noise">
          <feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves={2} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#screen-noise)" />
      </svg>
      <div className={styles.scanlines} aria-hidden="true" />
    </>
  );
}
