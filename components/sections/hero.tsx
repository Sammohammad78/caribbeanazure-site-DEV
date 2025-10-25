'use client'

import Hero3D from '@/components/3d/Hero3D'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()

  // Cursor tracking for 3D parallax (normalized to -0.5 to 0.5)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize cursor position to -0.5 to 0.5 range
      const x = (e.clientX / window.innerWidth) - 0.5
      const y = (e.clientY / window.innerHeight) - 0.5
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <section className="hero-glow relative min-h-[85vh] overflow-hidden">
      {/* Full-viewport 3D background (behind all content) */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <Hero3D className="h-full w-full" mousePosition={mousePosition} />
      </div>

      <div className="hero-glow__background" />
      <div className="container-custom relative z-10">
        <div className="flex items-center justify-center py-20 md:py-32 lg:py-40">
          <motion.div
            className="flex max-w-4xl flex-col gap-8 text-center"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex max-w-max items-center gap-3 self-center rounded-full border border-[color:color-mix(in_oklab,var(--fg)_16%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[color:var(--brand)] shadow-[0_0_12px_color-mix(in_oklab,var(--brand)_60%,transparent)]" />
              Caribbean Azure · Automation Studio
            </motion.div>

            <motion.h1
              className="text-balance font-bold tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('title')}
            </motion.h1>

            <motion.p
              className="text-sm font-semibold uppercase tracking-[0.28em] text-[color:var(--fg-muted)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              {t('qualifier')}
            </motion.p>

            <motion.p
              className="copy-20 text-[color:var(--fg-subtle)]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col items-center justify-center gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/${locale}/contact`}>
                  {t('cta.primary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="btn-outline w-full sm:w-auto"
              >
                <Link href={`/${locale}/cases`}>
                  {t('cta.secondary')}
                  <ArrowRight className="size-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 border-t border-[color:color-mix(in_oklab,var(--fg)_10%,transparent)] pt-8 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div className="flex gap-6 text-sm text-[color:var(--fg-subtle)]">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Implementaties
                  </p>
                  <p className="text-lg font-semibold text-body">150+</p>
                </div>
                <div className="h-12 w-px bg-[color:color-mix(in_oklab,var(--fg)_12%,transparent)]" />
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--fg-muted)]">
                    Gem. ROI
                  </p>
                  <p className="text-lg font-semibold text-body">612%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Removed duplicate 3D hero - now using only full-viewport background */}
        </div>
      </div>
    </section>
  )
}

