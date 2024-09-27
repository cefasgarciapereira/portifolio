import { Translation } from "../../../contexts/language";

export interface PostCardTranslation {
  read: string
}

export const content: Translation<PostCardTranslation> = {
  pt: {
    read: "de leitura"
  },
  en: {
    read: "read"
  }
}