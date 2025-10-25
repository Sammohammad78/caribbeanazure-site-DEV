import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'
import { AlertCircle, Home, ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export default function NotFound() {
  const locale = useLocale()

  const suggestions = [
    { href: `/${locale}`, label: locale === 'nl' ? 'Homepage' : 'Home', icon: Home },
    { href: `/${locale}/diensten`, label: locale === 'nl' ? 'Diensten' : 'Services', icon: Search },
    { href: `/${locale}/contact`, label: 'Contact', icon: ArrowLeft },
  ]

  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.default} />
        </div>

        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center">
          <div className="container-custom">
            <div className="mx-auto max-w-2xl text-center">
              {/* Error Icon */}
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--accent-soft)_65%,transparent)] text-[color:var(--accent)] mb-8">
                <AlertCircle className="h-12 w-12" />
              </div>

              {/* Error Code */}
              <h1 className="text-8xl font-bold tracking-tight text-[color:var(--brand)] mb-4">
                404
              </h1>

              {/* Error Message */}
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                {locale === 'nl' ? 'Pagina niet gevonden' : 'Page not found'}
              </h2>

              <p className="text-lg text-[color:var(--fg-subtle)] mb-8">
                {locale === 'nl'
                  ? 'De pagina die je zoekt bestaat niet of is verplaatst.'
                  : 'The page you are looking for does not exist or has been moved.'}
              </p>

              {/* Suggestions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                {suggestions.map((link) => (
                  <Button key={link.href} asChild variant="outline">
                    <Link href={link.href} className="inline-flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  </Button>
                ))}
              </div>

              {/* Additional Help */}
              <p className="text-sm text-[color:var(--fg-muted)]">
                {locale === 'nl' ? (
                  <>
                    Blijft het probleem? Neem{' '}
                    <Link href={`/${locale}/contact`} className="text-[color:var(--brand)] hover:underline">
                      contact met ons op
                    </Link>
                    .
                  </>
                ) : (
                  <>
                    Still having issues?{' '}
                    <Link href={`/${locale}/contact`} className="text-[color:var(--brand)] hover:underline">
                      Contact us
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}
