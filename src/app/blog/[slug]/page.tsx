import { Metadata } from "next";
import { notFound } from "next/navigation";

import styles from "./post.module.css";
import Layout from "@/components/templates/Layout";
import JsonLd from "@/components/atoms/JsonLd";

import { formatSlug, handlePubDate, extractImageSrc } from "@/utils/blog";
import { fetchMediumItems } from "@/components/templates/BlogList";
import { SITE_URL, PERSON_ID, stripHtml } from "@/utils/seo";

export const revalidate = 3600;

async function getPost(slug: string) {
  const items = await fetchMediumItems();
  return items.find((item) => formatSlug(item.title) === slug);
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  const description = stripHtml(post.description);
  const thumbnail = extractImageSrc(post.description) || "/logo.svg";
  const url = `/blog/${params.slug}`;

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

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const description = stripHtml(post.description);
  const thumbnail = extractImageSrc(post.description) || `${SITE_URL}/logo.svg`;
  const url = `${SITE_URL}/blog/${params.slug}`;
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
      <main>
        <JsonLd data={articleSchema} />
        <JsonLd data={breadcrumbSchema} />
        <article className={styles.postPage}>
          <header>
            <h1>{post.title}</h1>
            <time dateTime={isoDate}>{handlePubDate(post.pubDate)}</time>
          </header>
          <div className={styles.postPageContentWrapper}>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          <p>
            <a href={post.link} target="_blank" rel="noopener noreferrer">
              View this article on Medium
            </a>
          </p>
        </article>
      </main>
    </Layout>
  );
}
