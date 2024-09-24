import { Translation } from "@/app/contexts/language"

export interface ExperienceTranslation {
  knowMyLastJobs: string
}

export const content: Translation<ExperienceTranslation> = {
  en: {
    knowMyLastJobs: "Know my latest works: "
  },
  pt: {
    knowMyLastJobs: "Conheça meus últimos trabalhos: "
  }
}