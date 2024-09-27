import type { Metadata } from "next";

import "@/styles/globals.css";
import "@/styles/variables.css";
import { LangueProvider } from "@/contexts/language";
import { Fragment } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Cefas Garcia Pereira",
  description:
    "Cefas Garcia Pereira has Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG).",
  keywords: "cefas, software engineer, developer, fullstack, reactjs, master, software, code, machine learning, fullstack, front end",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LangueProvider>
      <Fragment>
        <SpeedInsights />
        {children}
      </Fragment>
    </LangueProvider>
  );
}
