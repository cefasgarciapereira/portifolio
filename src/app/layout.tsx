import "@/styles/globals.css";
import "@/styles/variables.css";
import { Fragment } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import defaultMetadata from "@/utils/metadata";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      {process.env.NODE_ENV === "production" && (
        <Fragment>
          <SpeedInsights />
          <GoogleAnalytics gaId="G-W9YJPQYTDG" />
        </Fragment>
      )}
      {children}
    </Fragment>
  );
}
