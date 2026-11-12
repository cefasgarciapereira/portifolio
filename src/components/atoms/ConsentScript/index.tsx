"use client";

import { consentDefaultScript } from "@/utils/consent";

const INERT_SCRIPT_TYPE = "text/plain";

/**
 * Sets the Google consent defaults while the HTML is parsed, before hydration
 * and therefore before the GA tag (loaded `afterInteractive`) runs.
 * Same pattern as `ThemeScript`: on the client the tag is inert so React never re-runs it.
 */
export default function ConsentScript() {
  const isServerRender = typeof window === "undefined";

  return (
    <script
      type={isServerRender ? undefined : INERT_SCRIPT_TYPE}
      dangerouslySetInnerHTML={{ __html: consentDefaultScript }}
      suppressHydrationWarning
    />
  );
}
