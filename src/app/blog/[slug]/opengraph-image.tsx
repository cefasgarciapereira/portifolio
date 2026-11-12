import { formatPostDate, getAllPosts, getPost } from "@/utils/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog post by Cefas Garcia Pereira";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) throw new Error(`No post for slug "${slug}"`);

  return renderOgImage({
    kicker: "~/blog",
    title: post.title,
    description: post.description,
    meta: [formatPostDate(post.date), `${post.readingMinutes} min`, post.lang === "pt" ? "pt-BR" : "en"],
    locale: post.lang,
  });
}
