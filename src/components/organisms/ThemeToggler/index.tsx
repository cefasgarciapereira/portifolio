'use client'

import Button from "@/components/atoms/Button"
import { MoonIcon, SunIcon } from "@/components/atoms/Icons"
import { Language } from "@/contexts/language"
import useTheme from "@/hooks/useTheme"

import { content } from "./translation"

interface ThemeTogglerProps {
  locale: Language
}

export default function ThemeToggler({ locale }: ThemeTogglerProps) {
  const { theme, toggleTheme } = useTheme()
  const text = content[locale]
  const isDark = theme === "dark"

  return (
    <Button onClick={toggleTheme} aria-label={text.aria}>
      {isDark ? <SunIcon /> : <MoonIcon />}
      <span>{isDark ? text.light : text.dark}</span>
    </Button>
  )
}
