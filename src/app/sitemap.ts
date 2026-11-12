import { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/seo";
import { formatSlug } from "@/utils/blog";
import { fetchMediumItems } from "@/components/templates/BlogList";

export const revalidate = 3600;

function localizedEntry(
  enPath: string,
  ptPath: string,
  path: string,
  lastModified?: Date
): MetadataRoute.Sitemap[number] {
  return {
    url: `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified } : {}),
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
  let posts: Awaited<ReturnType<typeof fetchMediumItems>> = [];
  try {
    posts = await fetchMediumItems();
  } catch {
    posts = [];
  }

  // lastmod must reflect real content changes. Stamping "now" on every request
  // teaches Google to ignore the field, which slows recrawling of new posts.
  // The blog index changes when a post is published; the home page has no
  // reliable date, so it gets none.
  const latestPost = posts
    .map((post) => new Date(post.pubDate))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b.getTime() - a.getTime())[0];

  // Every language version gets its own <url> entry (with the full set of
  // hreflang alternates), as required by Google for localized sitemaps.
  const staticPages: MetadataRoute.Sitemap = [
    localizedEntry("/", "/pt", "/"),
    localizedEntry("/", "/pt", "/pt"),
    localizedEntry("/blog", "/pt/blog", "/blog", latestPost),
    localizedEntry("/blog", "/pt/blog", "/pt/blog", latestPost),
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${formatSlug(post.title)}`,
    lastModified: new Date(post.pubDate),
  }));

  return [...staticPages, ...postPages];
}
