"use client";

import { useEffect, useState } from "react";

const REFRESH_INTERVAL_MS = 15000;

export default function useClock(timeZone: string) {
  const [time, setTime] = useState<string[] | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const update = () => setTime(formatter.format(new Date()).split(":"));
    update();
    const interval = window.setInterval(update, REFRESH_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return time;
}
