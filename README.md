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

## SEO & indexing notes

- Canonical host is `https://www.cefas.me` (`src/utils/seo.ts`). `cefas.me` and `http://` variants redirect to it at the Vercel domain level — these show up in Search Console as "Page with redirect", which is expected.
- English lives at the root, Portuguese under `/pt`. Blog posts only exist in their original language at `/blog/<slug>`; `/pt/blog/<slug>` permanently redirects there (`next.config.mjs`), and the language toggler on a post points to `/pt/blog`.
- Legacy routes from the old Vite site (`/post`, `/index.html`) permanently redirect to their current equivalents.
- `sitemap.xml` lists every language version as its own `<url>` with full hreflang alternates. Posts come from the Medium RSS feed (via rss2json), which only returns the latest 10 articles — older posts drop out of the sitemap and their URLs return 404.
- If the Medium feed is unavailable, post pages throw instead of returning 404, so ISR keeps serving the last good version.
- CVs: `public/cv_portuguese.pdf` and `public/cv_english.pdf`, offered side by side in the contacts list.
