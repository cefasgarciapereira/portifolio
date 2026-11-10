import Link from "next/link";

import GlitchText, { GLITCH_TRIGGER } from "@/components/atoms/GlitchText";
import { ArrowIcon } from "@/components/atoms/Icons";
import { MediumItem } from "@/components/templates/BlogList";
import { formatSlug, handlePubDate, handleReadTime } from "@/utils/blog";

import styles from "./postlist.module.css";

interface PostListProps {
  posts: MediumItem[];
}

export default function PostList({ posts }: PostListProps) {
  return (
    <ul className={styles.list}>
      {posts.map((post) => {
        const date = handlePubDate(post.pubDate);
        const meta = [post.categories?.[0], `${handleReadTime(post.content)} min`].filter(Boolean).join(" · ");

        return (
          <li key={post.guid}>
            <Link className={`${styles.post} ${GLITCH_TRIGGER}`} href={`/blog/${formatSlug(post.title)}`}>
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
