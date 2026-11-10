import { Translation } from "@/contexts/language";

export interface ExperienceTranslation {
  label: string;
  title: string;
  logoAlt: string;
}

export const content: Translation<ExperienceTranslation> = {
  en: {
    label: "02 — path",
    title: "experience",
    logoAlt: "logo",
  },
  pt: {
    label: "02 — trajetória",
    title: "experiência",
    logoAlt: "logo da",
  },
};
