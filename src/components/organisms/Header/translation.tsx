import { Translation } from "@/contexts/language";

export interface HeaderTranslation {
  status: string;
}

export const content: Translation<HeaderTranslation> = {
  en: {
    status: "available for projects",
  },
  pt: {
    status: "disponível para projetos",
  },
};
