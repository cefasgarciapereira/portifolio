import { Translation } from "@/contexts/language";

export interface ContactTranslation {
  label: string;
  title: string;
  headline: string;
  mail: string;
  socials: string;
}

export const content: Translation<ContactTranslation> = {
  en: {
    label: "06 — say hi",
    title: "contact",
    headline: "Available for projects",
    mail: "get in touch",
    socials: "socials",
  },
  pt: {
    label: "06 — fale comigo",
    title: "contato",
    headline: "Disponível para projetos",
    mail: "me envie um e-mail",
    socials: "redes",
  },
};
