import { getAllPosts, postUrl } from "@/utils/posts";
import { RSS_PATH, SITE_URL, htmlLang } from "@/utils/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Wrap HTML in CDATA, splitting any `]]>` so the section can't be closed early. */
function cdata(html: string): string {
  return `<![CDATA[${html.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

/** Feed readers (and Medium's importer) need absolute URLs for links and images. */
function absolutizeUrls(html: string): string {
  return html.replace(/(href|src)="\/(?!\/)/g, `$1="${SITE_URL}/`);
}

/**
 * Full-content RSS 2.0 feed. Every item's <link>/<guid> is the cefas.me URL,
 * so anything imported from it (e.g. into Medium) keeps cefas.me as canonical.
 */
export function GET() {
  const posts = getAllPosts();
  const lastBuildDate = posts.length
    ? new Date(Math.max(...posts.map((post) => Date.parse(post.updated))))
    : new Date();

  const items = posts
    .map((post) => {
      const url = postUrl(post.slug);
      // A frontmatter `cover` that isn't already in the body is shown first.
      const cover =
        post.cover && !post.html.includes(`src="${post.cover}"`)
          ? `<p><img src="${post.cover}" alt="${escapeXml(post.title)}"></p>`
          : "";
      const footer = `<p>Originally published at <a href="${url}">${url}</a>.</p>`;
      const content = absolutizeUrls(cover + post.html + footer);
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>Cefas Garcia Pereira</dc:creator>
      <dc:language>${htmlLang(post.lang)}</dc:language>
      <description>${escapeXml(post.description)}</description>
${post.tags.map((tag) => `      <category>${escapeXml(tag)}</category>`).join("\n")}
      <content:encoded>${cdata(content)}</content:encoded>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Cefas Garcia Pereira — Blog</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}${RSS_PATH}" rel="self" type="application/rss+xml"/>
    <description>Articles on software engineering, full-stack development and web technology by Cefas Garcia Pereira.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <image>
      <url>${SITE_URL}/logo.svg</url>
      <title>Cefas Garcia Pereira — Blog</title>
      <link>${SITE_URL}/blog</link>
    </image>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
