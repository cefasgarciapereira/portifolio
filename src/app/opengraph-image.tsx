import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Cefas Garcia Pereira — Software Engineer";

export default function Image() {
  return renderOgImage({
    kicker: "~/home",
    title: "Cefas Garcia Pereira",
    description: "Software Engineer and full-stack developer building web apps, mobile apps, automations and AI integrations.",
    locale: "en",
  });
}
