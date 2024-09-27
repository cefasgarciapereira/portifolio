'use client'

import { useEffect, useState } from "react"

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]

    if (isDark) {
      body.classList.remove("theme-light")
      body.classList.add("theme-dark")
    } else {
      body.classList.remove("theme-dark")
      body.classList.add("theme-light")
    }
  }, [isDark])

  function toggleDarkMode() {
    setIsDark(!isDark)
  }

  return (
    <a className="menu-item cursor-pointer" onClick={toggleDarkMode}>
      {isDark ? "light mode" : "dark mode"}
    </a >
  )
}