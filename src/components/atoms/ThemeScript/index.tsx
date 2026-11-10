"use client";

import { useLayoutEffect } from "react";

import { applyStoredTheme, themeInitScript } from "@/utils/theme";

const INERT_SCRIPT_TYPE = "text/plain";

export default function ThemeScript() {
  const isServerRender = typeof window === "undefined";

  useLayoutEffect(applyStoredTheme, []);

  return (
    <script
      type={isServerRender ? undefined : INERT_SCRIPT_TYPE}
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
      suppressHydrationWarning
    />
  );
}
