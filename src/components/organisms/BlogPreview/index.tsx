import Button from "@/components/atoms/Button";
import PostList from "@/components/organisms/PostList";
import Section from "@/components/organisms/Section";
import { Language } from "@/contexts/language";
import { PostMeta } from "@/utils/posts";
import { localizedPath } from "@/utils/seo";

import { content } from "./translation";

interface BlogPreviewProps {
  locale: Language;
  posts: PostMeta[];
}

export default function BlogPreview({ locale, posts }: BlogPreviewProps) {
  const text = content[locale];

  return (
    <Section
      id="blog"
      label={text.label}
      title={text.title}
      aside={<Button href={localizedPath(locale, "/blog")}>{text.readAll}</Button>}
    >
      <PostList posts={posts} />
    </Section>
  );
}
