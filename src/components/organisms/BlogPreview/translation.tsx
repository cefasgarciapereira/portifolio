import { Translation } from "@/contexts/language";

export interface BlogPreviewTranslation {
  label: string;
  title: string;
  readAll: string;
}

export const content: Translation<BlogPreviewTranslation> = {
  en: {
    label: "05 — notes",
    title: "blog",
    readAll: "all posts →",
  },
  pt: {
    label: "05 — notas",
    title: "blog",
    readAll: "todos os posts →",
  },
};
