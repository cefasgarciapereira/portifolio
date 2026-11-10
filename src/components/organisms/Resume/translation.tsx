import { Translation } from "@/contexts/language";

export interface Education {
  degree: string;
  institution: string;
}

export interface ResumeTranslation {
  label: string;
  title: string;
  stackLabel: string;
  stackTitle: string;
  educationLabel: string;
  educationTitle: string;
  education: Education[];
  downloadLabel: string;
  downloadTitle: string;
  download: string;
  otherVersion: string;
}

export const content: Translation<ResumeTranslation> = {
  en: {
    label: "04 — cv",
    title: "résumé",
    stackLabel: "tools",
    stackTitle: "stack",
    educationLabel: "education",
    educationTitle: "studies",
    education: [
      { degree: "Master in Software Engineering", institution: "PUC Minas" },
      { degree: "Bachelor in Computer Science", institution: "PUC Minas" },
    ],
    downloadLabel: "download",
    downloadTitle: "full résumé",
    download: "download PDF",
    otherVersion: "versão em português",
  },
  pt: {
    label: "04 — cv",
    title: "currículo",
    stackLabel: "ferramentas",
    stackTitle: "stack",
    educationLabel: "formação",
    educationTitle: "estudos",
    education: [
      { degree: "Mestrado em Engenharia de Software", institution: "PUC Minas" },
      { degree: "Bacharelado em Ciência da Computação", institution: "PUC Minas" },
    ],
    downloadLabel: "download",
    downloadTitle: "currículo completo",
    download: "baixar PDF",
    otherVersion: "english version",
  },
};
