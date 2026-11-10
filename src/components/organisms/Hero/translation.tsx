import { Translation } from "@/contexts/language";

export interface HeroTranslation {
  label: string;
  role: string;
  tagline: string;
  description: string;
  stack: string;
  seeProjects: string;
  getInTouch: string;
  handAria: string;
  logoAria: string;
}

export const content: Translation<HeroTranslation> = {
  en: {
    label: "introduction",
    role: "Software Engineer",
    tagline: "Digital Solutions",
    description:
      "In the last years, I've had the pleasure of collaborating on projects for startups, small and large companies from different sectors and different parts of the world. Working to enhance and refine business through technology.",
    stack: "> React · Node · Python · AI",
    seeProjects: "see projects ↓",
    getInTouch: "get in touch",
    handAria: "see projects",
    logoAria: "Cefas Garcia Pereira logo",
  },
  pt: {
    label: "apresentação",
    role: "Engenheiro de Software",
    tagline: "Soluções Digitais",
    description:
      "Nos últimos anos, tive o prazer de colaborar em projetos de startups, pequenas e grandes empresas de diversos setores e diversas partes do mundo. Trabalhando para potencializar e refinar os negócios através da tecnologia.",
    stack: "> React · Node · Python · IA",
    seeProjects: "ver projetos ↓",
    getInTouch: "entre em contato",
    handAria: "ver projetos",
    logoAria: "logo de Cefas Garcia Pereira",
  },
};
