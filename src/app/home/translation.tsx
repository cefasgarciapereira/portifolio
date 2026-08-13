import { Translation } from "@/contexts/language"

export interface HomeTranslation {
  intro: string;
  role: string;
  getInTouch: string;
  conclusion1: string;
  conclusion2: string;
  available: string;
}

const CAREER_START_YEAR = 2016;
const yearsOfExperience = new Date().getFullYear() - CAREER_START_YEAR;

export const content: Translation<HomeTranslation> = {
  en: {
    intro: `Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG). I've been working for more than ${yearsOfExperience} years in processes and development of web applications, iOS/Android apps, prototyping, UI/UX with experience in React, React Native, NodeJs, Python, MongoDB and other technologies. I am currently a Sr. Software Engineer at Deel.`,
    role: "Software Engineer",
    getInTouch: "Get In Touch",
    conclusion1: "In the last years, I've had the pleasure of collaborating on projects for startups, small and large companies from different sectors and different parts of the world. Working to enhance and refine business through technology.",
    conclusion2: "I seek to design simple and effective solutions, without reinventing the wheel. For this I use tools such as prototyping, development through iterations and I am always inspired by big names in the area such as: Linus Torvalds, Uncle Bob, Peter Desmet and Don Norman.",
    available: "Available for projects"
  },
  pt: {
    intro: `Mestre em Engenharia de Software (PUC-MG) e Bacharel em Ciência da Computação (PUC-MG). Trabalho a mais de ${yearsOfExperience} anos em processos e desenvolvimento de aplicações web, apps iOS/Android, prototipação, UI/UX com experiência em React, React Native, NodeJs, Python, MongoDB e outras tecnologias. Atualmente sou Sr. Engenheiro de Software na Deel.`,
    role: "Engenheiro de Software",
    getInTouch: "Entre em contato",
    conclusion1: "Nos últimos anos, tive o prazer de colaborar em projetos de startups, pequenas e grandes empresas de diversos setores e diversas partes do mundo. Trabalhando para potencializar e refinar os negócios através da tecnologia.",
    conclusion2: "Busco projetar soluções simples e eficazes, sem reiventar a roda. Para isso utilizo ferramentas como prototipagem, desenvolvimento através de iterações e sempre me inspiro em grandes nomes da área como: Linus Torvalds, Uncle Bob, Peter Desmet e Don Norman.",
    available: "Disponível para projetos."
  }
}