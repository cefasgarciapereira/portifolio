import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Blog — Cefas Garcia Pereira";

export default function Image() {
  return renderOgImage({
    kicker: "~/blog",
    title: "blog",
    description: "Articles on software engineering, full-stack development and web technology by Cefas Garcia Pereira.",
    locale: "en",
  });
}
