import ThemeToggler from "../../organisms/ThemeToggler"
import ContrastToggler from "../../organisms/ContrastToggler"
import LanguageToggler from "../../organisms/LanguageToggler"
import HomeButton from "../HomeButton/HomeButton"
import useNavigation from "../../../services/useNavigation"
import BackButton from "../BackButton"

export default function Toolbar() {
    const { location } = useNavigation()
    return (
        <div className="toolbar">
            {
                location.includes("/post") &&
                <BackButton path="/blog" />
            }
            <HomeButton />
            <ThemeToggler />
            <ContrastToggler />
            <LanguageToggler />
        </div>
    )
}