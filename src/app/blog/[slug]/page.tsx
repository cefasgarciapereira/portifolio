import styles from "./post.module.css";
import Layout from "@/components/templates/Layout";

import { formatSlug, handlePubDate } from "@/utils/blog";
import defaultMetadata from "@/utils/metadata";
import { Metadata } from "next";

export interface MediumData {
  status: string;
  feed: MediumFeed;
  items: Array<MediumItem>;
}

interface MediumFeed {
  author: string;
  description: string;
  image: string;
  link: string;
  title: string;
  url: string;
}

interface MediumItem {
  author: string;
  categories: Array<string>;
  content: string;
  description: string;
  enclosure: object;
  guid: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  title: string;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cefasgpereira"
  );
  const data = (await response.json()) as MediumData;
  const post = data.items.filter((item) => formatSlug(item.title) === params.slug)[0];

  return {
    ...defaultMetadata,
    title: post.title,
    description: post.description,
    keywords: post.categories,
    openGraph: {
      title: post.title,
      url: `https://www.cefas.me/blog/${params.slug}`,
      siteName: post.title,
      description: post.description,
      images: [
        {
          url: post.thumbnail,
          width: 300,
          height: 300,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.thumbnail,
          width: 300,
          height: 300,
        },
      ],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cefasgpereira"
  );
  const data = (await response.json()) as MediumData;
  const post = data.items.filter((item) => formatSlug(item.title) === params.slug)[0];

  return (
    <Layout>
      <div className={styles.postPage}>
        <h1>{post.title}</h1>
        <span>{handlePubDate(post.pubDate)}</span>
        <a href={post.link} style={{ margin: "1rem 0" }}></a>
        <div className={styles.postPageContentWrapper}>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </Layout>
  );
}
