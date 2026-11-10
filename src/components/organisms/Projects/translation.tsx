import { Translation } from "@/contexts/language";

import { ProjectCategory } from "./data";

export type ProjectFilter = ProjectCategory | "all";

export interface ProjectsTranslation {
  label: string;
  title: string;
  filterAria: string;
  hint: string;
  count: string;
  close: string;
  role: string;
  year: string;
  status: string;
  filters: Record<ProjectFilter, string>;
}

export const content: Translation<ProjectsTranslation> = {
  en: {
    label: "03 — work",
    title: "projects",
    filterAria: "filter projects",
    hint: "click a project to open its details",
    count: "projects",
    close: "close",
    role: "role",
    year: "year",
    status: "status",
    filters: { all: "all", produto: "product", web: "web", backend: "backend" },
  },
  pt: {
    label: "03 — trabalhos",
    title: "projetos",
    filterAria: "filtrar projetos",
    hint: "clique em um projeto para abrir os detalhes",
    count: "projetos",
    close: "fechar",
    role: "papel",
    year: "ano",
    status: "status",
    filters: { all: "todos", produto: "produto", web: "web", backend: "backend" },
  },
};
