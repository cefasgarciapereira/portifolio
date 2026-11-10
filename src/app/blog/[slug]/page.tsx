import { Metadata } from "next";
import { notFound } from "next/navigation";

import styles from "./post.module.css";
import Layout from "@/components/templates/Layout";
import JsonLd from "@/components/atoms/JsonLd";
import Button from "@/components/atoms/Button";
import Container from "@/components/atoms/Container";
import GlitchText from "@/components/atoms/GlitchText";
import SectionLabel from "@/components/atoms/SectionLabel";

import { formatSlug, handlePubDate, extractImageSrc } from "@/utils/blog";
import { fetchMediumItems } from "@/components/templates/BlogList";
import { SITE_URL, PERSON_ID, stripHtml } from "@/utils/seo";

export const revalidate = 3600;

async function getPost(slug: string) {
  const items = await fetchMediumItems();
  // An empty feed means rss2json/Medium failed, not that the post is gone.
  // Throwing keeps the last good ISR version instead of caching a 404.
  if (items.length === 0) {
    throw new Error("Medium feed unavailable");
  }
  return items.find((item) => formatSlug(item.title) === slug);
}

export async function generateStaticParams() {
  try {
    const items = await fetchMediumItems();
    return items.map((item) => ({ slug: formatSlug(item.title) }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const description = stripHtml(post.description);
  const thumbnail = extractImageSrc(post.description) || "/logo.svg";
  const url = `/blog/${slug}`;

  return {
    title: post.title,
    description,
    keywords: post.categories,
    authors: [{ name: "Cefas Garcia Pereira", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url,
      siteName: "Cefas Garcia Pereira",
      publishedTime: new Date(post.pubDate).toISOString(),
      authors: ["Cefas Garcia Pereira"],
      images: [{ url: thumbnail }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [thumbnail],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const description = stripHtml(post.description);
  const thumbnail = extractImageSrc(post.description) || `${SITE_URL}/logo.svg`;
  const url = `${SITE_URL}/blog/${slug}`;
  const isoDate = new Date(post.pubDate).toISOString();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: url,
    url,
    headline: post.title,
    description,
    image: thumbnail,
    datePublished: isoDate,
    dateModified: isoDate,
    keywords: post.categories?.join(", "),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Cefas Garcia Pereira",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Cefas Garcia Pereira",
      url: SITE_URL,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <Layout locale="en">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Container>
        <article className={styles.post}>
          <header className={styles.header}>
            <SectionLabel withCursor>
              <time dateTime={isoDate}>{handlePubDate(post.pubDate)}</time>
            </SectionLabel>
            <GlitchText as="h1" text={post.title} className={styles.title} />
          </header>
          <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
          <Button href={post.link} target="_blank" rel="noopener noreferrer" variant="primary">
            View this article on Medium ↗
          </Button>
        </article>
      </Container>
    </Layout>
  );
}
