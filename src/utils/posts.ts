import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import type { Language } from "@/contexts/language";
import { renderMarkdown } from "@/utils/markdown";
import { SITE_URL } from "@/utils/seo";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const WORDS_PER_MINUTE = 220;

export interface PostMeta {
  slug: string;
  title: string;
  /** Original publication date, ISO 8601. */
  date: string;
  /** Last meaningful edit, ISO 8601. Defaults to `date`. */
  updated: string;
  description: string;
  tags: string[];
  lang: Language;
  /** Slug of the same post in the other language, if there is one. */
  translation?: string;
  mediumUrl?: string;
  /** Root-relative path of the cover image (first image in the post by default). */
  cover?: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
}

function toIsoDate(value: unknown, field: string, file: string): string {
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    throw new Error(`${file}: "${field}" must be a valid date`);
  }
  return date.toISOString();
}

function requireString(data: Record<string, unknown>, field: string, file: string): string {
  const value = data[field];
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${file}: frontmatter "${field}" is required`);
  }
  return value.trim();
}

function firstImage(markdown: string): string | undefined {
  return markdown.match(/!\[[^\]]*\]\(\s*<?([^)\s>]+)/)?.[1];
}

function readingMinutes(markdown: string): number {
  const words = markdown.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function parsePostFile(file: string): Post {
  const source = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(source);

  const slug = requireString(data, "slug", file);
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(`${file}: slug "${slug}" must be lowercase kebab-case`);
  }

  const lang = data.lang ?? "en";
  if (lang !== "en" && lang !== "pt") {
    throw new Error(`${file}: lang must be "en" or "pt"`);
  }

  const date = toIsoDate(data.date, "date", file);

  return {
    slug,
    title: requireString(data, "title", file),
    date,
    updated: data.updated ? toIsoDate(data.updated, "updated", file) : date,
    description: requireString(data, "description", file),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    lang,
    translation: typeof data.translation === "string" ? data.translation : undefined,
    mediumUrl: typeof data.mediumUrl === "string" ? data.mediumUrl : undefined,
    cover: typeof data.cover === "string" ? data.cover : firstImage(content),
    readingMinutes: readingMinutes(content),
    html: renderMarkdown(content),
  };
}

let cachedPosts: Post[] | undefined;

/** Every post, newest first. Parsed once per production build; re-read in dev so edits show up. */
export function getAllPosts(): Post[] {
  if (cachedPosts && process.env.NODE_ENV === "production") return cachedPosts;
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const posts = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(parsePostFile)
    .sort((a, b) => b.date.localeCompare(a.date));

  const seen = new Set<string>();
  for (const post of posts) {
    if (seen.has(post.slug)) throw new Error(`Duplicate post slug "${post.slug}"`);
    seen.add(post.slug);
  }

  cachedPosts = posts;
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

/**
 * Posts to list for a locale: a post written in the other language is hidden
 * when it has a translation in this one, so each article appears once.
 */
export function getPostsForLocale(locale: Language): Post[] {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.lang === locale || !post.translation || getPost(post.translation)?.lang !== locale
  );
}

/** YYYY-MM-DD, for display and `<time>`. */
export function formatPostDate(iso: string): string {
  return iso.slice(0, 10);
}

/** Absolute canonical URL of a post. Posts live at /blog/<slug> whatever their language. */
export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

/**
 * Root-relative URL of each language version of a post, or undefined when
 * the post exists in a single language.
 */
export function postLanguageVersions(post: PostMeta): Partial<Record<Language, string>> | undefined {
  const translation = post.translation ? getPost(post.translation) : undefined;
  if (!translation || translation.lang === post.lang) return undefined;
  return {
    [post.lang]: `/blog/${post.slug}`,
    [translation.lang]: `/blog/${translation.slug}`,
  };
}

/** hreflang map (`en`, `pt-BR`, `x-default`) for a translated post. */
export function postHreflang(post: PostMeta): Record<string, string> | undefined {
  const versions = postLanguageVersions(post);
  if (!versions) return undefined;
  return {
    ...(versions.en ? { en: versions.en } : {}),
    ...(versions.pt ? { "pt-BR": versions.pt } : {}),
    "x-default": versions.en ?? `/blog/${post.slug}`,
  };
}
