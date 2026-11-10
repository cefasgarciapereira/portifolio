import { Language } from "@/contexts/language";

export const stack = ["React", "React Native", "Next.js", "Node.js", "TypeScript", "JavaScript", "Python", "MongoDB"];

export interface ResumeFile {
  path: string;
  hrefLang: string;
}

export const resumeFiles: Record<Language, ResumeFile> = {
  pt: { path: "/cv_portuguese.pdf", hrefLang: "pt-BR" },
  en: { path: "/cv_english.pdf", hrefLang: "en" },
};
