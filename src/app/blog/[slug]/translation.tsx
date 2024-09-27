import { Translation } from "@/contexts/language";

export interface PostTranslation {
  read: string
}

export const content: Translation<PostTranslation> = {
  pt: {
    read: "Ler no Medium"
  },
  en: {
    read: "Read on Medium"
  }
}