import { Marked, type Tokens } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js/lib/common";

/**
 * Markdown → HTML for blog posts. Runs only at build time (server components),
 * so neither marked nor highlight.js ships to the browser.
 *
 * Conventions on top of GFM:
 * - An image on its own line, optionally followed on the next line by an
 *   italic line, becomes `<figure>` with that line as `<figcaption>`.
 * - Fenced code is highlighted when a language is given (```ts).
 * - HTML comments (<!-- note -->) are dropped from the output.
 */
const marked = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";
      return hljs.highlight(code, { language }).value;
    },
  }),
  {
    gfm: true,
    renderer: {
      paragraph(token: Tokens.Paragraph) {
        const parts = token.tokens.filter(
          (child) => !(child.type === "text" && child.raw.trim() === "") && child.type !== "br"
        );
        const [image, caption, ...rest] = parts;
        const isFigure =
          image?.type === "image" && rest.length === 0 && (!caption || caption.type === "em");

        if (!isFigure) return false;

        const img = this.parser.parseInline([image]);
        const figcaption =
          caption?.type === "em"
            ? `<figcaption>${this.parser.parseInline((caption as Tokens.Em).tokens)}</figcaption>`
            : "";
        return `<figure>${img}${figcaption}</figure>\n`;
      },
      image({ href, title, text }: Tokens.Image) {
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        return `<img src="${escapeAttr(href)}" alt="${escapeAttr(text)}"${titleAttr} loading="lazy" decoding="async">`;
      },
      html({ text }: Tokens.HTML | Tokens.Tag) {
        // HTML comments are notes for the author, not for readers.
        return text.replace(/<!--[\s\S]*?-->/g, "");
      },
      link({ href, title, tokens }: Tokens.Link) {
        const label = this.parser.parseInline(tokens);
        const titleAttr = title ? ` title="${escapeAttr(title)}"` : "";
        const external = /^https?:\/\//.test(href) && !href.startsWith("https://www.cefas.me");
        const rel = external ? ` target="_blank" rel="noopener noreferrer"` : "";
        return `<a href="${escapeAttr(href)}"${titleAttr}${rel}>${label}</a>`;
      },
    },
  }
);

function escapeAttr(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

export function renderMarkdown(markdown: string): string {
  return marked
    .parse(markdown, { async: false })
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, "</table></div>");
}
