import { Translation } from "@/contexts/language";

export interface NavigationItem {
  id: string;
  label: string;
}

export interface BottomNavTranslation {
  aria: string;
  items: NavigationItem[];
}

export const content: Translation<BottomNavTranslation> = {
  en: {
    aria: "sections",
    items: [
      { id: "root", label: "root" },
      { id: "perfil", label: "profile" },
      { id: "xp", label: "xp" },
      { id: "projetos", label: "work" },
      { id: "cv", label: "cv" },
      { id: "blog", label: "blog" },
      { id: "contato", label: "contact" },
    ],
  },
  pt: {
    aria: "seções",
    items: [
      { id: "root", label: "root" },
      { id: "perfil", label: "perfil" },
      { id: "xp", label: "xp" },
      { id: "projetos", label: "projetos" },
      { id: "cv", label: "cv" },
      { id: "blog", label: "blog" },
      { id: "contato", label: "contato" },
    ],
  },
};

export const SECTION_IDS = content.en.items.map((item) => item.id);
