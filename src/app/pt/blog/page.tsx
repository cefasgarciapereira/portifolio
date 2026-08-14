import { Metadata } from "next";

import BlogList from "@/components/templates/BlogList";
import { languageAlternates } from "@/utils/seo";

export const revalidate = 3600;

const description =
  "Artigos sobre engenharia de software, desenvolvimento full-stack e tecnologia web por Cefas Garcia Pereira.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: languageAlternates("pt", "/blog", "/pt/blog"),
  openGraph: {
    type: "website",
    title: "Blog | Cefas Garcia Pereira",
    description,
    url: "/pt/blog",
    siteName: "Cefas Garcia Pereira",
    locale: "pt_BR",
  },
};

export default function Page() {
  return <BlogList locale="pt" />;
}
