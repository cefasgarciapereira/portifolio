import { Metadata } from "next";

import Home from "@/app/home";
import { languageAlternates } from "@/utils/seo";

export const metadata: Metadata = {
  alternates: languageAlternates("en", "/", "/pt"),
};

export default function Page() {
  return <Home />;
}
