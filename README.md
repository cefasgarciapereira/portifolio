This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Writing a blog post

Posts are Markdown files in `content/blog/`, one per post. The site is the original source; Medium is only a distribution channel. Everything is rendered at build time, so the flow is: write the `.md`, commit, push — the deploy publishes it.

1. Create `content/blog/<slug>.md`:

   ```md
   ---
   title: My new post
   slug: my-new-post            # URL: /blog/my-new-post (lowercase kebab-case, never change it after publishing)
   date: 2026-11-12             # original publication date
   description: One or two sentences, up to ~160 characters, used for search results and social cards.
   tags: [typescript, web-development]
   lang: en                     # en | pt
   # Optional:
   # updated: 2026-12-01        # last meaningful edit (dateModified in JSON-LD, lastmod in the sitemap)
   # translation: meu-novo-post # slug of the same post in the other language → hreflang + language toggle
   # mediumUrl: https://medium.com/...  # where it was cross-posted
   # cover: /blog/my-new-post/cover.jpg # social image; defaults to the first image in the post
   ---

   Post body in Markdown. Don't repeat the title as a heading — start sections at `##`.
   ```

2. Put images in `public/blog/<slug>/` as optimized **WebP** (e.g. `cwebp -q 82 -m 6 -resize 1600 0 in.jpg -o 01.webp`; animated GIFs: `gif2webp -lossy`), no wider than ~1600px, and reference them with root-relative paths. An image followed on the next line by an italic line becomes a figure with a caption:

   ```md
   ![Describe the image for screen readers](/blog/my-new-post/diagram.png)
   *Optional caption, links allowed*
   ```

3. Supported: headings, lists, links, images, blockquotes, GFM tables and fenced code with syntax highlighting (` ```ts `, ` ```python `, ` ```bash `…).
4. Run `npm run dev` and open `/blog/<slug>` to check it in both themes. Invalid frontmatter fails the build with the file name.

**Cross-posting to Medium:** after the deploy, use Medium's *Import a story* with the cefas.me URL (it sets the canonical link automatically), or paste the post and set *Story settings → Advanced → Customize canonical link* to the cefas.me URL. The full-content feed at `/blog/rss.xml` can be used for this too.

## SEO & indexing notes

- Canonical host is `https://www.cefas.me` (`src/utils/seo.ts`). `cefas.me` and `http://` variants redirect to it at the Vercel domain level — these show up in Search Console as "Page with redirect", which is expected.
- English lives at the root, Portuguese under `/pt`. Blog posts only exist in their original language at `/blog/<slug>`; `/pt/blog/<slug>` permanently redirects there (`next.config.mjs`), and the language toggler on a post points to `/pt/blog`.
- Legacy routes from the old Vite site (`/post`, `/index.html`) permanently redirect to their current equivalents.
- `sitemap.xml` lists every language version as its own `<url>` with full hreflang alternates, plus every post from `content/blog/`.
- CVs: `public/cv_portuguese.pdf` and `public/cv_english.pdf`, offered side by side in the contacts list.
