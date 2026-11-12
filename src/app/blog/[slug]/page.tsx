import { Metadata } from "next";
import { notFound } from "next/navigation";

import styles from "./post.module.css";
import Layout from "@/components/templates/Layout";
import JsonLd from "@/components/atoms/JsonLd";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import GlitchText from "@/components/atoms/GlitchText";
import SectionLabel from "@/components/atoms/SectionLabel";

import {
  formatPostDate,
  getAllPosts,
  getPost,
  postHreflang,
  postLanguageVersions,
  postUrl,
} from "@/utils/posts";
import { SITE_URL, PERSON_ID, RSS_PATH, htmlLang, localizedAbsolute, localizedPath } from "@/utils/seo";

const AUTHOR_NAME = "Cefas Garcia Pereira";
const DEFAULT_IMAGE = "/logo.svg";

const BACK_LABEL = { en: "← all posts", pt: "← todos os posts" } as const;
const OG_LOCALE = { en: "en_US", pt: "pt_BR" } as const;

/** Every post is known at build time; anything else is a real 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const url = postUrl(slug);
  const hreflang = postHreflang(post);

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: AUTHOR_NAME, url: SITE_URL }],
    alternates: {
      canonical: url,
      ...(hreflang ? { languages: hreflang } : {}),
      types: { "application/rss+xml": RSS_PATH },
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      siteName: AUTHOR_NAME,
      locale: OG_LOCALE[post.lang],
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [SITE_URL],
      tags: post.tags,
    },
    // og:image is the card from ./opengraph-image.tsx; X falls back to it.
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  const url = postUrl(slug);
  const blogUrl = localizedAbsolute(post.lang, "/blog");
  const author = { "@type": "Person", "@id": PERSON_ID, name: AUTHOR_NAME, url: SITE_URL };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.cover ?? DEFAULT_IMAGE}`,
    datePublished: post.date,
    dateModified: post.updated,
    inLanguage: htmlLang(post.lang),
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    author,
    publisher: author,
    isPartOf: { "@type": "Blog", "@id": `${blogUrl}#blog`, url: blogUrl },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: localizedAbsolute(post.lang, "/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: blogUrl },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <Layout locale={post.lang} languageLinks={postLanguageVersions(post)}>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container>
        <article className={styles.post}>
          <header className={styles.header}>
            <SectionLabel withCursor>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            </SectionLabel>
            <GlitchText as="h1" text={post.title} className={styles.title} />
          </header>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.html }} />
          <Button href={localizedPath(post.lang, "/blog")}>{BACK_LABEL[post.lang]}</Button>
        </article>
      </Container>
    </Layout>
  );
}
