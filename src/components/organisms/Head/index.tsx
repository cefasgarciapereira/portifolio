import React from "react";
import NextHead from "next/head";

export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function Head(props: HeadProps) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <title>Cefas Garcia Pereira</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="title" content="Cefas Garcia Pereira | M.Sc | Software Engineer" />
      <meta
        name="description"
        content="Crafting code, I engineer solutions with technical rigor and following the best practices."
      />
      <meta
        name="keywords"
        content="cefas, software engineer, developer, fullstack, reactjs, master, software, code, machine learning, front end, fullstack"
      />
      <meta name="language" content="english" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

      <meta property="og:title" content="Cefas Garcia Pereira" />
      <meta property="og:site_name" content="Cefas Garcia Pereira" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Cefas Garcia Pereira | M.Sc | Software Engineer" />
      <meta property="og:url" content="https://cefas.me/" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image" content="https://cefas.me/logo.svg" />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      <meta name="msapplication-TileImage" content="https://cefas.me/logo.svg" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cefas.me/" />
      <meta
        property="twitter:title"
        content="Cefas Garcia Pereira  | M.Sc | Software Engineer"
      />
      <meta
        property="twitter:description"
        content="Crafting code, I engineer solutions with technical rigor and following the best practices."
      />
      <meta property="twitter:image" content="https://cefas.me/logo.svg" />

      <meta property="og:url" content="https://cefas.me"></meta>

      <link rel="preconnect" href="https://your-font-file-host/" />
      <link rel="stylesheet" href="https://your-font-file-host/inter.css" />
    </NextHead>
  );
}
