import { MetadataRoute } from "next";

import { SITE_URL } from "@/utils/seo";
import { getAllPosts, postHreflang, postUrl } from "@/utils/posts";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  // lastmod must reflect real content changes. Stamping "now" on every request
  // teaches Google to ignore the field, which slows recrawling of new posts.
  // The blog index changes when a post is published; the home page has no
  // reliable date, so it gets none.
  const latestPost = posts.length
    ? new Date(Math.max(...posts.map((post) => Date.parse(post.updated))))
    : undefined;

  // Every language version gets its own <url> entry (with the full set of
  // hreflang alternates), as required by Google for localized sitemaps.
  const staticPages: MetadataRoute.Sitemap = [
    localizedEntry("/", "/pt", "/"),
    localizedEntry("/", "/pt", "/pt"),
    localizedEntry("/blog", "/pt/blog", "/blog", latestPost),
    localizedEntry("/blog", "/pt/blog", "/pt/blog", latestPost),
  ];

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const hreflang = postHreflang(post);
    return {
      url: postUrl(post.slug),
      lastModified: new Date(post.updated),
      ...(hreflang
        ? {
            alternates: {
              languages: Object.fromEntries(
                Object.entries(hreflang).map(([lang, path]) => [lang, `${SITE_URL}${path}`])
              ),
            },
          }
        : {}),
    };
  });

  return [...staticPages, ...postPages];
}
