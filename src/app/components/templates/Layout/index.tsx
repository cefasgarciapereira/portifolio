import Footer from "@/app/components/organisms/Footer"
import Toolbar from "@/app/components/organisms/Toolbar"

interface LayoutProps {
  children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="container">
      {children}
      <Footer />
      <Toolbar />
    </div>
  )
}