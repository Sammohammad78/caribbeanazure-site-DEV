'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from './theme-toggle'
import { LanguageSwitcher } from './language-switcher'
import { Logo, LogoMark } from '@/components/brand/logo'

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Build locale-aware href (NL at root, EN with /en prefix)
  const buildHref = (slug: string) => {
    const path = slug ? `/${slug}` : '/'
    return locale === 'nl' ? path : `/en${path}`
  }

  const navItems = [
    { href: buildHref(''), label: t('nav.home') },
    { href: buildHref('oplossingen'), label: t('nav.solutions') },
    { href: buildHref('over-ons'), label: t('nav.about') },
    { href: buildHref('contact'), label: t('nav.contact') },
  ]

  return (
    <>
      {/* Skip to main content - WCAG 2.2 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[color:var(--brand)] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[color:var(--brand)]"
      >
        {locale === 'nl' ? 'Spring naar hoofdinhoud' : 'Skip to main content'}
      </a>
      <header className={cn(
        "sticky top-0 z-50 w-full border-b border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] bg-[color:color-mix(in_oklab,var(--bg)_82%,transparent)]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[color:color-mix(in_oklab,var(--bg)_75%,transparent)]/85 transition-shadow duration-200",
        isScrolled && "shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
      )}>
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between gap-4">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex items-center gap-3 transition-opacity duration-200 hover:opacity-80">
            <Logo className="hidden h-8 w-auto sm:block" />
            <LogoMark className="h-10 w-10 sm:hidden" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 text-sm font-medium md:flex">
            {navItems.map((item) => {
              // FIXED: Proper active state detection
              // For home page, only match exact path (not subpaths)
              // For other pages, match exact path or sub-paths
              const isHomePage = item.href === `/${locale}` || item.href === '/nl' || item.href === '/en'
              const normalizedPathname = pathname.endsWith('/') && pathname !== '/' ? pathname.slice(0, -1) : pathname
              const normalizedHref = item.href.endsWith('/') && item.href !== '/' ? item.href.slice(0, -1) : item.href

              const isActive = isHomePage
                ? normalizedPathname === normalizedHref
                : normalizedPathname === normalizedHref || normalizedPathname.startsWith(normalizedHref + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative transition-all duration-200 rounded-lg px-3 py-1.5",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--brand)] focus-visible:ring-offset-2",
                    isActive
                      ? "bg-[color:color-mix(in_oklab,var(--brand)_10%,transparent)] text-[color:var(--brand)] ring-1 ring-[color:color-mix(in_oklab,var(--brand)_20%,transparent)]"
                      : "text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]"
                  )}
                >
                  {item.label}
                  {/* Animated underline on hover (only when not active) */}
                  {!isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[color:var(--brand)] scale-x-0 transition-transform duration-200 group-hover:scale-x-100" />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Language Switcher, Theme Toggle & CTA */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle className="hidden md:inline-flex" />

            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link href={buildHref('contact')}>
                {t('common.bookIntake')}
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
    </>
  )
}
