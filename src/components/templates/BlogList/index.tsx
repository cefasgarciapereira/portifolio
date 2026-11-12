import Layout from "@/components/templates/Layout";
import JsonLd from "@/components/atoms/JsonLd";
import PostList from "@/components/organisms/PostList";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";
import { getPostsForLocale } from "@/utils/posts";
import {
  SITE_URL,
  PERSON_ID,
  htmlLang,
  localizedAbsolute,
} from "@/utils/seo";

import styles from "./bloglist.module.css";

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

export default function BlogList({ locale }: { locale: Language }) {
  const posts = getPostsForLocale(locale);
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
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      inLanguage: htmlLang(post.lang),
    })),
  };

  return (
    <Layout locale={locale}>
      <JsonLd data={blogSchema} />
      <Section id="blog" label={text.label} title={text.title} titleAs="h1" withCursor>
        <p className={styles.subtitle}>{text.subtitle}</p>
        <PostList posts={posts} />
      </Section>
    </Layout>
  );
}
