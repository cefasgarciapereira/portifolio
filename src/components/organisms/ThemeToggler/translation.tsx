import { Translation } from "@/contexts/language";

export interface ThemeTogglerTranslation {
  aria: string;
  light: string;
  dark: string;
}

export const content: Translation<ThemeTogglerTranslation> = {
  en: {
    aria: "toggle light and dark theme",
    light: "light",
    dark: "dark",
  },
  pt: {
    aria: "alternar tema claro e escuro",
    light: "claro",
    dark: "escuro",
  },
};
