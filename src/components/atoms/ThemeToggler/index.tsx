import { useEffect, useState } from "react"
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggler() {
    const [isDark, setIsDark] = useState(true)

    useEffect(() => {
        let body = document.getElementsByTagName("body")[0]

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
        <button
            onClick={toggleDarkMode}
            className="btn--clean circular"
        >
            {isDark ? <FiSun /> : <FiMoon />}
        </button>
    )
}