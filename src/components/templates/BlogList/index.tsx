import Layout from "@/components/templates/Layout";
import JsonLd from "@/components/atoms/JsonLd";
import PostList from "@/components/organisms/PostList";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";
import { formatSlug } from "@/utils/blog";
import {
  SITE_URL,
  PERSON_ID,
  htmlLang,
  localizedAbsolute,
} from "@/utils/seo";

import styles from "./bloglist.module.css";

export interface MediumItem {
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

interface MediumData {
  status: string;
  items: Array<MediumItem>;
}

const copy: Record<Language, { label: string; title: string; subtitle: string }> = {
  en: {
    label: "~/blog",
    title: "blog",
    subtitle:
      "Articles on software engineering, full-stack development and web technology by Cefas Garcia Pereira.",
  },
  pt: {
    label: "~/blog",
    title: "blog",
    subtitle:
      "Artigos sobre engenharia de software, desenvolvimento full-stack e tecnologia web por Cefas Garcia Pereira.",
  },
};

export async function fetchMediumItems(): Promise<MediumItem[]> {
  const response = await fetch(
    "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@cefasgpereira",
    { next: { revalidate: 3600 } }
  );
  const data = (await response.json()) as MediumData;
  return data?.items ?? [];
}

export default async function BlogList({ locale }: { locale: Language }) {
  const items = await fetchMediumItems();
  const text = copy[locale];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${localizedAbsolute(locale, "/blog")}#blog`,
    url: localizedAbsolute(locale, "/blog"),
    name: "Cefas Garcia Pereira — Blog",
    inLanguage: htmlLang(locale),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Cefas Garcia Pereira",
      url: SITE_URL,
    },
    blogPost: items.map((item) => ({
      "@type": "BlogPosting",
      headline: item.title,
      url: `${SITE_URL}/blog/${formatSlug(item.title)}`,
      datePublished: new Date(item.pubDate).toISOString(),
    })),
  };

  return (
    <Layout locale={locale}>
      <JsonLd data={blogSchema} />
      <Section id="blog" label={text.label} title={text.title} titleAs="h1" withCursor>
        <p className={styles.subtitle}>{text.subtitle}</p>
        <PostList posts={items} />
      </Section>
    </Layout>
  );
}
