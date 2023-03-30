import Footer from "../../organisms/Footer"

interface LayoutProps {
    children: JSX.Element
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="container">
            {children}
            <Footer />
        </div>
    )
}