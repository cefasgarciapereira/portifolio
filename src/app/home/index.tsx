import JsonLd from "@/components/atoms/JsonLd";
import BlogPreview from "@/components/organisms/BlogPreview";
import Contact from "@/components/organisms/Contact";
import Experience from "@/components/organisms/Experience";
import Hero from "@/components/organisms/Hero";
import Profile from "@/components/organisms/Profile";
import Projects from "@/components/organisms/Projects";
import Resume from "@/components/organisms/Resume";
import Layout from "@/components/templates/Layout";
import { fetchMediumItems, MediumItem } from "@/components/templates/BlogList";
import { Language } from "@/contexts/language";
import { profilePageSchema } from "@/utils/seo";

const LATEST_POSTS_COUNT = 4;

async function fetchLatestPosts(): Promise<MediumItem[]> {
  try {
    const items = await fetchMediumItems();
    return items.slice(0, LATEST_POSTS_COUNT);
  } catch {
    return [];
  }
}

interface HomeProps {
  locale: Language;
}

export default async function Home({ locale }: HomeProps) {
  const posts = await fetchLatestPosts();

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
