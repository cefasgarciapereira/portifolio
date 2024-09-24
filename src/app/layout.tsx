import type { Metadata } from "next";
import localFont from "next/font/local";

import "@/app/style/globals.css";
import "@/app/style/variables.css";

import Footer from "@/app/components/organisms/Footer"
import Toolbar from "@/app/components/organisms/Toolbar"
import { LangueProvider } from "@/app/contexts/language"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Cefas Garcia Pereira",
  description: "Cefas Garcia Pereira has Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LangueProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} container`}>
          {children}
          <Footer />
          <Toolbar />
        </body>
      </html>
    </LangueProvider>
  );
}
