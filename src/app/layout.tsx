import type { Metadata } from "next";
import { Merriweather, Roboto_Flex } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BackToHome from "@/components/BackToHome";
import ScrollToTop from "@/components/ScrollToTop";

const merriweather = Merriweather({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Compendio D&D 3.5 - El recurso más completo en español",
  description: "El compendio más completo de Dungeons & Dragons 3.5 en español. Monstruos, hechizos, clases, objetos y más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${merriweather.variable} ${roboto.variable} antialiased flex min-h-screen flex-col`}
      >
        <Header />
        <BackToHome />
        <ScrollToTop />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
