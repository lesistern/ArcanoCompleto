import type { Metadata, Viewport } from "next";
import { Merriweather, Roboto_Flex } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { SystemProvider } from "@/contexts/SystemContext";
import { ExperienceProvider } from "@/contexts/ExperienceContext";

const merriweather = Merriweather({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
  preload: true,
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  title: "Compendio D&D 3.5 - El recurso más completo en español",
  description: "El compendio más completo de Dungeons & Dragons 3.5 en español. Monstruos, hechizos, clases, objetos y más.",
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.png', sizes: 'any' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  other: {
    'preconnect': [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ],
  },
};

import DiceOverlay from "@/components/dice/DiceOverlay";
import DiceLauncher from "@/components/dice/DiceLauncher";
import ChatButtonWrapper from "@/components/chat/ChatButtonWrapper";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const headerLocale = requestHeaders.get('x-path-locale');
  const locale = (headerLocale && locales.includes(headerLocale as Locale))
    ? (headerLocale as Locale)
    : defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Preconnect hints para recursos externos */}
        <link rel="preconnect" href="https://akcuvlanpqpoizconuhm.supabase.co" />
        <link rel="dns-prefetch" href="https://akcuvlanpqpoizconuhm.supabase.co" />
      </head>
      <body
        className={`${merriweather.variable} ${roboto.variable} antialiased flex min-h-screen flex-col text-gray-100`}
      >
        <SystemProvider>
          <ExperienceProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </ExperienceProvider>
        </SystemProvider>

        <DiceOverlay />
        <ChatButtonWrapper />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
