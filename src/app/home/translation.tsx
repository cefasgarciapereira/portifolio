import { Translation } from "@/contexts/language"

export interface HomeTranslation {
  intro: string;
  role: string;
  getInTouch: string;
  conclusion1: string;
  conclusion2: string;
  available: string;
}

export const content: Translation<HomeTranslation> = {
  en: {
    intro: "Master in Software Engineering (PUC-MG) and Bachelor in Computer Science (PUC-MG). I've been working for more than 7 years in processes and development of web applications, iOS/Android apps, prototyping, UI/UX with experience in React, React Native, NodeJs, Python, MongoDB etc. I am currently a Software Engineer at CI&T.",
    role: "Software Engineer",
    getInTouch: "Get In Touch",
    conclusion1: "In the last years, I've had the pleasure of collaborating on projects for startups, small and large companies from different sectors. Working to enhance and refine business through technology.",
    conclusion2: "I seek to design simple and effective solutions, without reinventing the wheel. For this I use tools such as prototyping, development through iterations and I am always inspired by big names in the area such as: Uncle Bob, Peter Desmet, Don Norman and others.",
    available: "Available for projects"
  },
  pt: {
    intro: "Mestre em Engenharia de Software (PUC-MG) e Bacharel em Ciência da Computação (PUC-MG). Trabalho a mais de 7 anos em processos e desenvolvimento de aplicações web, apps iOS/Android, prototipação, UI/UX com experiência em React, React Native, NodeJs, Python, MongoDB etc. Atualmente sou Engenheiro de Software na CI&T.",
    role: "Engenheiro de Software",
    getInTouch: "Entre em contato",
    conclusion1: "Nos últimos anos, tive o prazer de colaborar em projetos de startups, pequenas e grandes empresas de diversos setores.Trabalhando para potencializar e refinar os negócios através da tecnologia.",
    conclusion2: "Busco projetar soluções simples e eficazes, sem reiventar a roda. Para isso utilizo ferramentas como prototipagem, desenvolvimento através de iterações e sempre me inspiro em grandes nomes da área como: Uncle Bob, Peter Desmet, Don Norman e outros.",
    available: "Disponível para projetos."
  }
}