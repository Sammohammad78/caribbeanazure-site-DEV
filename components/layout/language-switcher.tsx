'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { Globe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { locales, localeNames } from '@/lib/i18n'

interface LanguageSwitcherProps {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: string) => {
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
    <div className={cn('flex items-center gap-2', className)}>
      <Globe
        className="h-4 w-4 text-[color:var(--fg-muted)]"
        aria-hidden="true"
      />
      <div className="flex items-center gap-1">
        {locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              'rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)] focus:ring-offset-2',
              locale === loc
                ? 'bg-[color:var(--accent)] text-white shadow-sm'
                : 'text-[color:var(--fg-muted)] hover:bg-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] hover:text-[color:var(--fg)]'
            )}
            aria-label={`Switch to ${localeNames[loc]}`}
            aria-current={locale === loc ? 'true' : 'false'}
          >
            {loc.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
