'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { Logo, LogoMark } from '@/components/brand/logo'

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Updated navigation with new IA structure
  const buildHref = (slug: string) => (slug ? `/${locale}/${slug}` : `/${locale}`)

  const navItems = [
    { href: buildHref(''), label: t('nav.home') },
    { href: buildHref('oplossingen'), label: t('nav.solutions') },
    { href: buildHref('tarieven'), label: t('nav.pricing') },
    { href: buildHref('cases'), label: t('nav.cases') },
    { href: buildHref('contact'), label: t('nav.contact') },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_82%,transparent)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--bg)_75%,transparent)]/85">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
            <Logo className="hidden h-8 w-auto sm:block" />
            <LogoMark className="h-10 w-10 sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="lift-hover text-[color:var(--fg-muted)] transition-all duration-200 ease-out hover:text-[color:var(--fg)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher, Theme Toggle & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher className="hidden md:flex" />
            <ThemeToggle className="hidden md:inline-flex" />

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href={`/${locale}/contact`}>
                {locale === 'nl' ? 'Plan een intake' : 'Book an intake'}
              </Link>
            </Button>

            {/* Mobile menu button */}
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] text-[color:var(--fg)] transition-all duration-200 md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'overflow-hidden border-b border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_88%,transparent)]/95 transition-[max-height,opacity] duration-300 ease-out md:hidden',
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="container-custom flex flex-col gap-4 py-6">
          <div className="flex items-center justify-end gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-transparent px-4 py-2 text-sm font-medium text-[color:var(--fg-muted)] transition-all duration-200 hover:border-[color:color-mix(in_oklab,var(--accent)_25%,transparent)] hover:text-[color:var(--fg)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
