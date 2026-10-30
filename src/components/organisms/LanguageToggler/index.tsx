'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import useLocale from "@/hooks/useLocale"

/**
 * Switches language by navigating to the equivalent URL in the other locale,
 * so each language keeps its own indexable URL (en at root, pt under /pt).
 */
export default function LanguageToggler() {
  const pathname = usePathname() || "/"
  const isPt = useLocale() === "pt"

  // Blog posts only exist in their original language (/blog/<slug>), so from a
  // post the toggler points to the other locale's blog index instead of a 404.
  const isPost = /^\/blog\/[^/]+/.test(pathname)

  const counterpart = isPost
    ? "/pt/blog"
    : isPt
      ? pathname.replace(/^\/pt/, "") || "/"
      : `/pt${pathname === "/" ? "" : pathname}`

  return (
    <Link href={counterpart} className="menu-item cursor-pointer" hrefLang={isPt ? "en" : "pt-BR"}>
      {isPt ? "english" : "portuguese"}
    </Link>
  )
}
