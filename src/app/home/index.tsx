import JsonLd from "@/components/atoms/JsonLd";
import BlogPreview from "@/components/organisms/BlogPreview";
import Contact from "@/components/organisms/Contact";
import Experience from "@/components/organisms/Experience";
import Hero from "@/components/organisms/Hero";
import Profile from "@/components/organisms/Profile";
import Projects from "@/components/organisms/Projects";
import Resume from "@/components/organisms/Resume";
import Layout from "@/components/templates/Layout";
import { Language } from "@/contexts/language";
import { getPostsForLocale } from "@/utils/posts";
import { profilePageSchema } from "@/utils/seo";

const LATEST_POSTS_COUNT = 4;

interface HomeProps {
  locale: Language;
}

export default function Home({ locale }: HomeProps) {
  const posts = getPostsForLocale(locale).slice(0, LATEST_POSTS_COUNT);

  return (
    <Layout locale={locale}>
      <JsonLd data={profilePageSchema(locale)} />
      <Hero locale={locale} />
      <Profile locale={locale} />
      <Experience locale={locale} />
      <Projects locale={locale} />
      <Resume locale={locale} />
      <BlogPreview locale={locale} posts={posts} />
      <Contact locale={locale} />
    </Layout>
  );
}
