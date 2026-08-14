import { usePathname } from "next/navigation";

import { Language } from "@/contexts/language";

/**
 * Derives the active locale from the URL (single source of truth).
 * `/pt` and `/pt/...` are Portuguese; everything else is English.
 * Works during SSR (usePathname returns the request path), so the value
 * is present in the server-rendered HTML and stable across hydration.
 */
export default function useLocale(): Language {
  const pathname = usePathname() || "/";
  return pathname === "/pt" || pathname.startsWith("/pt/") ? "pt" : "en";
}
