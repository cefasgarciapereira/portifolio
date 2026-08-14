import Footer from "@/components/organisms/Footer";
import Header from "@/components/organisms/Header";
import { Language } from "@/contexts/language";
import { htmlLang } from "@/utils/seo";

interface LayoutProps {
  children: JSX.Element;
  locale?: Language;
}

export default function Layout({ children, locale = "en" }: LayoutProps) {
  return (
    <html lang={htmlLang(locale)}>
      <body className={`container`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
