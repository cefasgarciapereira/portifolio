import Footer from "@/components/organisms/Footer";
import Head, { HeadProps } from "@/components/organisms/Head";
import Header from "@/components/organisms/Header";

interface LayoutProps {
  children: JSX.Element;
  head?: HeadProps;
}

export default function Layout(props: LayoutProps) {
  return (
    <html lang="en">
      <Head {...props.head} />
      <body className={`container`}>
        <Header />
        {props.children}
        <Footer />
      </body>
    </html>
  );
}
