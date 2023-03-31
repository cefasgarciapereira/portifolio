import Footer from "../../organisms/Footer"
import Toolbar from "../../organisms/Toolbar"

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