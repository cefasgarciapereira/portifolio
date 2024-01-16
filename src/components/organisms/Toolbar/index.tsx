import ThemeToggler from "../../organisms/ThemeToggler"
import ContrastToggler from "../../organisms/ContrastToggler"
import LanguageToggler from "../../organisms/LanguageToggler"

export default function Toolbar() {
    return (
        <div className="toolbar">
            <ThemeToggler />
            <ContrastToggler />
            <LanguageToggler />
        </div>
    )
}