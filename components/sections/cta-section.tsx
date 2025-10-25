'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export function CTASection() {
  const t = useTranslations('cta')
  const locale = useLocale()

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-[32px] border border-[color:color-mix(in_oklab,var(--accent)_35%,transparent)] bg-[linear-gradient(135deg,color-mix(in_oklab,var(--brand)_80%,transparent)0%,color-mix(in_oklab,var(--accent)_82%,transparent)100%)] px-8 py-16 shadow-[0_40px_120px_rgb(45_43_99/28%)] md:px-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_55%)] opacity-80 mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%22160%22 height%3D%22160%22 viewBox%3D%220%200%20160%20160%22 fill%3D%22none%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cpath d%3D%22M0 159.5H159.5V0H0v159.5Zm21.5-21.5h116.5V21.5H21.5v116.5Z%22 fill%3D%22rgba(255,255,255,0.08)%22/%3E%3C/svg%3E')] opacity-30" />

          <div className="relative mx-auto max-w-3xl text-center space-y-8 text-white">
            <h2 className="text-4xl md:text-5xl font-bold">
              {t('title')}
            </h2>
            <p className="text-xl text-white/85">
              {t('subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href={`/${locale}/contact`}>
                  <Calendar className="mr-2 h-5 w-5" />
                  {t('button')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
