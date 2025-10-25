import type { Metadata } from "next"
import Script from 'next/script'
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { SkipToContent } from "@/components/layout/skip-to-content"

export const metadata: Metadata = {
  title: "Caribbean Azure | Slimme AI Automatisering",
  description:
    "Slimme automatisering die waarde oplevert. AI-workflows die tijd besparen en omzet verhogen.",
  keywords: ["AI", "automatisering", "integratie", "chatbots", "Nederland"],
  metadataBase: new URL('https://www.caribbeanazure.com'),
  openGraph: {
    title: "Caribbean Azure | Slimme AI Automatisering",
    description: "Slimme automatisering die waarde oplevert. AI-workflows die tijd besparen en omzet verhogen.",
    url: 'https://www.caribbeanazure.com',
    siteName: 'Caribbean Azure',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Caribbean Azure - Slimme AI Automatisering',
      },
    ],
    locale: 'nl_NL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Caribbean Azure | Slimme AI Automatisering",
    description: "Slimme automatisering die waarde oplevert. AI-workflows die tijd besparen en omzet verhogen.",
    images: ['/api/og'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
  }>) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <head>
        {/* Plausible Analytics - EU-hosted, GDPR-compliant */}
        <Script
          defer
          data-domain="caribbeanazure.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-surface text-body antialiased">
        <SkipToContent />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
