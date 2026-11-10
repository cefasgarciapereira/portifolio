import { Translation } from "@/contexts/language";

export interface LayoutTranslation {
  skip: string;
}

export const content: Translation<LayoutTranslation> = {
  en: {
    skip: "skip to content",
  },
  pt: {
    skip: "pular para o conteúdo",
  },
};
