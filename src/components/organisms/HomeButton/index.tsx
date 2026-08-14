'use client';

import Link from "next/link";

import useLocale from "@/hooks/useLocale";
import { localizedPath } from "@/utils/seo";

export default function HomeButton() {
  const locale = useLocale();

  return (
    <Link href={localizedPath(locale, "/")} className="menu-item">
      home
    </Link>
  );
}
