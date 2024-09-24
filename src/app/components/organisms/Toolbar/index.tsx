import HomeButton from "@/app/components/organisms/HomeButton"
import ThemeToggler from "@/app/components/organisms/ThemeToggler"
import ContrastToggler from "@/app/components/organisms/ContrastToggler"
import LanguageToggler from "@/app/components/organisms/LanguageToggler"

export default function Toolbar() {
  return (
    <div className="toolbar">
      <HomeButton />
      <ThemeToggler />
      <ContrastToggler />
      <LanguageToggler />
    </div>
  )
}