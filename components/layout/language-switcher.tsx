'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = () => {
    // Toggle between nl and en
    const newLocale = locale === 'nl' ? 'en' : 'nl'

    // Remove current locale prefix from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || ''

    // Build new path with new locale
    const newPath = newLocale === 'nl'
      ? pathWithoutLocale || '/'
      : `/en${pathWithoutLocale}`

    router.push(newPath)
    router.refresh() // Force refresh to load new locale content
  }

  return (
    <button
      onClick={switchLocale}
      className={cn(
        'inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200',
        'border border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]',
        'bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)]',
        'text-[color:var(--fg-muted)] hover:text-[color:var(--fg)]',
        'hover:border-[color:color-mix(in_oklab,var(--accent)_25%,transparent)]',
        'focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2',
        className
      )}
      aria-label={`Switch to ${locale === 'nl' ? 'English' : 'Nederlands'}`}
    >
      <Languages className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{locale.toUpperCase()}</span>
    </button>
  )
}
