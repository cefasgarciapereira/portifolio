import { Metadata } from "next";

import BlogList from "@/components/templates/BlogList";
import { languageAlternates } from "@/utils/seo";

const description =
  "Articles on software engineering, full-stack development and web technology by Cefas Garcia Pereira.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: languageAlternates("en", "/blog", "/pt/blog"),
  openGraph: {
    type: "website",
    title: "Blog | Cefas Garcia Pereira",
    description,
    url: "/blog",
    siteName: "Cefas Garcia Pereira",
    locale: "en_US",
  },
};

export default function Page() {
  return <BlogList locale="en" />;
}
