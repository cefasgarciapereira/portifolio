import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/variables.css";

import Footer from "@/components/organisms/Footer";
import { LangueProvider } from "@/contexts/language";
import Header from "@/components/organisms/Header";
import Head, { HeadProps } from "@/components/organisms/Head";

export const metadata: Metadata = {
  title: "Cefas Garcia Pereira",
  description:
    "Cefas Garcia Pereira has Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG).",
};

export default function RootLayout({
  children,
  page
}: Readonly<{
  children: React.ReactNode;
  page: HeadProps
}>) {
  return (
    <LangueProvider>
      <html lang="en">
        <Head />
        <body className={`container`}>
          <link itemProp="thumbnailUrl" href="url_image" />
          <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
            <link itemProp="url" href="url_image" />
          </span>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </LangueProvider>
  );
}
