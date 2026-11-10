"use client";

import useClock from "@/hooks/useClock";
import effects from "@/styles/effects.module.css";

import styles from "./clock.module.css";

interface ClockProps {
  label: string;
  timeZone: string;
}

export default function Clock({ label, timeZone }: ClockProps) {
  const time = useClock(timeZone);
  const [hours, minutes] = time ?? ["--", "--"];

  return (
    <span className={styles.clock}>
      {label} {hours}
      <i className={effects.blink}>:</i>
      {minutes}
    </span>
  );
}
