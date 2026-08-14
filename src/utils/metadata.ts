import { Metadata } from "next";
import { SITE_URL } from "@/utils/seo";

const description =
  "Cefas Garcia Pereira is a Software Engineer and full-stack developer based in Poços de Caldas, Minas Gerais, Brazil, building web applications, mobile apps, automations and AI integrations.";

const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cefas Garcia Pereira | Software Engineer",
    template: "%s | Cefas Garcia Pereira",
  },
  description,
  keywords: [
    "Cefas",
    "Garcia",
    "Pereira",
    "Cefas Garcia Pereira",
    "Software Engineer",
    "Full Stack Developer",
    "Software Engineer Brazil",
    "Engenheiro de Software",
    "Desenvolvedor Full Stack",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Python",
  ],
  authors: [{ name: "Cefas Garcia Pereira", url: SITE_URL }],
  creator: "Cefas Garcia Pereira",
  publisher: "Cefas Garcia Pereira",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    title: "Cefas Garcia Pereira | Software Engineer",
    url: SITE_URL,
    siteName: "Cefas Garcia Pereira",
    locale: "en_US",
    description,
    images: [
      {
        url: "/logo.svg",
        width: 300,
        height: 300,
        alt: "Cefas Garcia Pereira",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Cefas Garcia Pereira | Software Engineer",
    description,
    images: ["/logo.svg"],
  },
};

export default defaultMetadata;
