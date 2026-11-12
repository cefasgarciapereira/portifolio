import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "@/utils/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Cefas Garcia Pereira — Engenheiro de Software";

export default function Image() {
  return renderOgImage({
    kicker: "~/inicio",
    title: "Cefas Garcia Pereira",
    description: "Engenheiro de Software e desenvolvedor full-stack criando aplicações web, apps mobile, automações e integrações com IA.",
    locale: "pt",
  });
}
