import { Metadata } from "next";

import Home from "@/app/home";
import { languageAlternates } from "@/utils/seo";

const description =
  "Cefas Garcia Pereira é Engenheiro de Software e desenvolvedor full-stack em Poços de Caldas, Minas Gerais, Brasil, criando aplicações web, aplicativos mobile, automações e integrações com Inteligência Artificial.";

export const metadata: Metadata = {
  title: { absolute: "Cefas Garcia Pereira | Engenheiro de Software" },
  description,
  alternates: languageAlternates("pt", "/", "/pt"),
  openGraph: {
    type: "website",
    title: "Cefas Garcia Pereira | Engenheiro de Software",
    description,
    url: "/pt",
    siteName: "Cefas Garcia Pereira",
    locale: "pt_BR",
    images: [
      {
        url: "/logo.svg",
        width: 300,
        height: 300,
        alt: "Cefas Garcia Pereira",
      },
    ],
  },
};

export default function Page() {
  return <Home />;
}
