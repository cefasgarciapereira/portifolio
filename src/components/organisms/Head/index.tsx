import React from "react";
import NextHead from "next/head";

export interface HeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export default function Head({
  title = "Cefas Garcia Pereira",
  description = "Crafting code, I engineer solutions with technical rigor and following the best practices.",
  keywords = "cefas, software engineer, developer, fullstack, reactjs, master, software, code, machine learning, front end, fullstack",
  image = "https://cefas.me/logo.svg"

}: HeadProps) {
  return (
    <NextHead>
      <meta charSet="UTF-8" />
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <title>{title}</title>

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      <meta name="language" content="english" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Cefas Garcia Pereira" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content={description}
      />
      <meta property="og:url" content="https://cefas.me/" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="300" />
      <meta property="og:image:height" content="300" />

      <meta name="msapplication-TileImage" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://cefas.me/" />
      <meta
        property="twitter:title"
        content={title}
      />
      <meta
        property="twitter:description"
        content={description}
      />
      <meta property="twitter:image" content={image} />

      <meta property="og:url" content="https://cefas.me"></meta>
    </NextHead>
  );
}
