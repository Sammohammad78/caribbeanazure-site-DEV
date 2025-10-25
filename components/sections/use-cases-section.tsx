'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useLocale } from 'next-intl'

export function UseCasesSection() {
  const t = useTranslations('useCases')
  const locale = useLocale()

  const useCases = [
    {
      title: t('items.0.title'),
      problem: t('items.0.problem'),
      solution: t('items.0.solution'),
      example: t('items.0.example'),
      outcome: t('items.0.outcome'),
      icon: '📧',
    },
    {
      title: t('items.1.title'),
      problem: t('items.1.problem'),
      solution: t('items.1.solution'),
      example: t('items.1.example'),
      outcome: t('items.1.outcome'),
      icon: '📄',
    },
    {
      title: t('items.2.title'),
      problem: t('items.2.problem'),
      solution: t('items.2.solution'),
      example: t('items.2.example'),
      outcome: t('items.2.outcome'),
      icon: '💬',
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[color:var(--bg)] py-20 md:py-28">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          className="mx-auto mb-16 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-center font-bold tracking-tight">
            {t('title')}
          </h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              className="card card-gradient-stripe group flex flex-col gap-6 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[color:var(--brand-soft)] text-4xl shadow-md">
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold tracking-tight text-[color:var(--fg)]">
                {useCase.title}
              </h3>

              {/* Problem */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--err)]">
                  Probleem
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--fg-muted)]">
                  {useCase.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand)]">
                  Onze oplossing
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--fg-muted)]">
                  {useCase.solution}
                </p>
              </div>

              {/* Example */}
              <div className="rounded-lg bg-[color:var(--brand-soft)] p-4">
                <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--brand-strong)]">
                  <Zap className="h-4 w-4" />
                  Voorbeeld
                </p>
                <p className="text-sm leading-relaxed text-[color:var(--fg)]">
                  {useCase.example}
                </p>
              </div>

              {/* Outcome */}
              <div className="mt-auto flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-[color:var(--ok)]" />
                <p className="text-sm font-semibold text-[color:var(--fg)]">
                  {useCase.outcome}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild size="lg">
            <Link href={`/${locale}/contact`}>
              {t('cta')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
