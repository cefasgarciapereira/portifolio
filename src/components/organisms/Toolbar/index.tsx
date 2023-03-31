import ThemeToggler from "../../atoms/ThemeToggler"
import ContrastToggler from "../../atoms/ContrastToggler"
import LanguageToggler from "../../atoms/LanguageToggler"

export default function Toolbar() {
    return (
        <div className="toolbar">
            <ThemeToggler />
            <ContrastToggler />
            <LanguageToggler />
        </div>
    )
}