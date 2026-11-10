import { Fact } from "@/components/atoms/FactList";
import { Translation } from "@/contexts/language";

export interface ProfileTranslation {
  label: string;
  title: string;
  paragraphs: string[];
  facts: Fact[];
}

const CAREER_START_YEAR = 2016;
const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

export const content: Translation<ProfileTranslation> = {
  en: {
    label: "01 — tldr",
    title: "profile",
    paragraphs: [
      `Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG), based in Poços de Caldas, Minas Gerais, Brazil. I've been working for more than ${yearsOfExperience} years building web applications, iOS/Android apps, landing pages, custom systems, process automations and AI integrations, with experience in React, React Native, NodeJs, Python, MongoDB and other technologies. I am currently a Sr. Software Engineer at Deel.`,
      "I seek to design simple and effective solutions, without reinventing the wheel. For this I use tools such as prototyping, development through iterations and I am always inspired by big names in the area such as: Linus Torvalds, Uncle Bob, Peter Desmet and Don Norman.",
    ],
    facts: [
      { term: "based", value: "Poços de Caldas, MG · Brazil" },
      { term: "role", value: "Sr. Software Engineer @ Deel" },
      { term: "experience", value: `${yearsOfExperience}+ years` },
      { term: "education", value: "MSc Software Engineering · PUC-MG" },
      { term: "status", value: "available for projects" },
    ],
  },
  pt: {
    label: "01 — tldr",
    title: "perfil",
    paragraphs: [
      `Mestre em Engenharia de Software (PUC-MG) e Bacharel em Ciência da Computação (PUC-MG), em Poços de Caldas, Minas Gerais, Brasil. Trabalho há mais de ${yearsOfExperience} anos desenvolvendo aplicações web, apps iOS/Android, landing pages, sistemas personalizados, automações de processos e integrações com Inteligência Artificial, com experiência em React, React Native, NodeJs, Python, MongoDB e outras tecnologias. Atualmente sou Sr. Engenheiro de Software na Deel.`,
      "Busco projetar soluções simples e eficazes, sem reiventar a roda. Para isso utilizo ferramentas como prototipagem, desenvolvimento através de iterações e sempre me inspiro em grandes nomes da área como: Linus Torvalds, Uncle Bob, Peter Desmet e Don Norman.",
    ],
    facts: [
      { term: "base", value: "Poços de Caldas, MG · Brasil" },
      { term: "cargo", value: "Sr. Engenheiro de Software @ Deel" },
      { term: "experiência", value: `${yearsOfExperience}+ anos` },
      { term: "formação", value: "Mestre em Eng. de Software · PUC-MG" },
      { term: "status", value: "disponível para projetos" },
    ],
  },
};
