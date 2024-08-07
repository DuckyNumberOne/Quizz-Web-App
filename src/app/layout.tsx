import "./styles/globals.css";
import Footer from "./components/footer/defaultFooters";
import Header from "./components/header/defaultHeaders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <Header />
        <div className="mt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
