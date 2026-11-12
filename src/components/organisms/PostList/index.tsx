import Link from "next/link";

import GlitchText, { GLITCH_TRIGGER } from "@/components/atoms/GlitchText";
import { ArrowIcon } from "@/components/atoms/Icons";
import { formatPostDate, PostMeta } from "@/utils/posts";

import styles from "./postlist.module.css";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => {
        const date = formatPostDate(post.date);
        const meta = [post.tags[0], `${post.readingMinutes} min`].filter(Boolean).join(" · ");

        return (
          <li key={post.slug}>
            <Link
              className={`${styles.post} ${GLITCH_TRIGGER}`}
              href={`/blog/${post.slug}`}
              hrefLang={post.lang === "pt" ? "pt-BR" : "en"}
            >
              <time className={styles.date} dateTime={date}>
                {date}
              </time>
              <GlitchText as="h3" text={post.title} className={styles.title} />
              <span className={styles.meta}>{meta}</span>
              <ArrowIcon className={styles.arrow} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
