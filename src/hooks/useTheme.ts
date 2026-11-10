"use client";

import { useCallback, useSyncExternalStore } from "react";

import {
  DEFAULT_THEME,
  THEME_FLASH_CLASS,
  THEME_STORAGE_KEY,
  Theme,
} from "@/utils/theme";

const FLASH_DURATION_MS = 380;

function readDocumentTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function readServerTheme(): Theme {
  return DEFAULT_THEME;
}

function subscribeToTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {}
}

function flashDocument() {
  const root = document.documentElement;
  root.classList.add(THEME_FLASH_CLASS);
  window.setTimeout(() => root.classList.remove(THEME_FLASH_CLASS), FLASH_DURATION_MS);
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribeToTheme, readDocumentTheme, readServerTheme);

  const toggleTheme = useCallback(() => {
    const nextTheme: Theme = readDocumentTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    persistTheme(nextTheme);
    flashDocument();
  }, []);

  return { theme, toggleTheme };
}
