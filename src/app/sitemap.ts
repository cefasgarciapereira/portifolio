import { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/seo";
import { formatSlug } from "@/utils/blog";
import { fetchMediumItems } from "@/components/templates/BlogList";

export const revalidate = 3600;

function localizedEntry(
  enPath: string,
  ptPath: string,
  lastModified: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${enPath}`,
    lastModified,
    alternates: {
      languages: {
        en: `${SITE_URL}${enPath}`,
        "pt-BR": `${SITE_URL}${ptPath}`,
        "x-default": `${SITE_URL}${enPath}`,
      },
    },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    localizedEntry("/", "/pt", now),
    localizedEntry("/blog", "/pt/blog", now),
  ];

  let posts: Awaited<ReturnType<typeof fetchMediumItems>> = [];
  try {
    posts = await fetchMediumItems();
  } catch {
    posts = [];
  }

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${formatSlug(post.title)}`,
    lastModified: new Date(post.pubDate),
  }));

  return [...staticPages, ...postPages];
}
