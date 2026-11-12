import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog — Cefas Garcia Pereira";

export default function Image() {
  return renderOgImage({
    kicker: "~/blog",
    title: "blog",
    description: "Artigos sobre engenharia de software, desenvolvimento full-stack e tecnologia web por Cefas Garcia Pereira.",
    locale: "pt",
  });
}
