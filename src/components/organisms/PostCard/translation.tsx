import { Translation } from "../../../contexts/language";

export interface PostCardTranslation {
  read: string
}

export const content: Translation<PostCardTranslation> = {
  pt: {
    read: "read"
  },
  en: {
    read: "de leitura"
  }
}