'use client'

import Link from "next/link"
import useTranslation from "@/hooks/useTranslation"
import { PostCardTranslation, content } from "./translation"
import { handleReadTime, handlePubDate } from "@/utils/blog"

import styles from "./postcard.module.css"

interface PostCardProps {
  author: string
  categories: Array<string>
  content: string
  description: string
  enclosure: object
  guid: string
  link: string
  pubDate: string
  thumbnail: string
  title: string
}

const PostCard = (props: PostCardProps) => {
  const text = useTranslation({ content }) as PostCardTranslation

  return (
    <div className={styles.postCard}>
      <h4>
        <Link href="/post">
          {props.title}
        </Link>
      </h4>
      <div className={styles.postCardData}>
        <span>{`${handleReadTime(props.content)} min `}{text.read}</span>
        <span>{handlePubDate(props.pubDate)}</span>
      </div>
      <div>
        {props.categories?.map((category, index) =>
          <span key={`${category}-${index}`} className={styles.tag}>
            {category}
          </span>
        )}
      </div>
    </div>
  )
}

export default PostCard