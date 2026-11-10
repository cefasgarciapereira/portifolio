import Button from "@/components/atoms/Button";
import PostList from "@/components/organisms/PostList";
import Section from "@/components/organisms/Section";
import { MediumItem } from "@/components/templates/BlogList";
import { Language } from "@/contexts/language";
import { localizedPath } from "@/utils/seo";

import { content } from "./translation";

interface BlogPreviewProps {
  locale: Language;
  posts: MediumItem[];
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
