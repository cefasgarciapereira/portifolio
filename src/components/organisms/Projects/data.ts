import { MarkName } from "@/components/atoms/HalftoneMark";
import { Language, Translation } from "@/contexts/language";

import { projectEntries } from "./project-entries";

export type ProjectCategory = "produto" | "web" | "backend";

interface ProjectContent {
  id: string;
  mark: MarkName;
  title: Translation<string>;
  kicker: Translation<string>;
  summary: Translation<string>;
  description: Translation<string>;
  role: Translation<string>;
  year: string;
  status: Translation<string>;
  tags: Translation<string[]>;
}

interface PinnedProject extends ProjectContent {
  pinned: true;
  category?: undefined;
}

interface CategorizedProject extends ProjectContent {
  pinned?: false;
  category: ProjectCategory;
}

export type Project = PinnedProject | CategorizedProject;

function yearRange(year: string) {
  const years = year.split("–").map(Number);
  return { start: years[0], end: years[years.length - 1] };
}

function byMostRecent(first: Project, second: Project) {
  const firstRange = yearRange(first.year);
  const secondRange = yearRange(second.year);
  return secondRange.end - firstRange.end || secondRange.start - firstRange.start;
}

function byPinnedThenMostRecent(first: Project, second: Project) {
  return Number(Boolean(second.pinned)) - Number(Boolean(first.pinned)) || byMostRecent(first, second);
}

export const projects = [...projectEntries].sort(byPinnedThenMostRecent);

export interface LocalizedProject {
  id: string;
  number: string;
  mark: MarkName;
  pinned: boolean;
  category?: ProjectCategory;
  title: string;
  kicker: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  status: string;
  tags: string[];
}

export function localizeProject(project: Project, index: number, locale: Language): LocalizedProject {
  return {
    id: project.id,
    number: `P/${String(index + 1).padStart(2, "0")}`,
    mark: project.mark,
    pinned: Boolean(project.pinned),
    category: project.category,
    title: project.title[locale],
    kicker: project.kicker[locale],
    summary: project.summary[locale],
    description: project.description[locale],
    role: project.role[locale],
    year: project.year,
    status: project.status[locale],
    tags: project.tags[locale],
  };
}
