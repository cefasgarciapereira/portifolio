import { Translation } from "@/contexts/language";

export interface FooterTranslation {
  madeWith: string;
}

export const content: Translation<FooterTranslation> = {
  en: {
    madeWith: "built with Next.js · hosted on Vercel",
  },
  pt: {
    madeWith: "feito com Next.js · hospedado na Vercel",
  },
};
