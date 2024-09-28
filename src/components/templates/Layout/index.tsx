import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <body className={`container`}>
        <Header />
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
