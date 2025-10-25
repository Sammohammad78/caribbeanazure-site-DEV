'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function FAQSection() {
  const t = useTranslations('faq')
  const questions = t.raw('questions') as Array<{ q: string; a: string }>

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_92%,transparent)]">
      <div className="container-custom">
        <div className="mx-auto max-w-[660px] text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
            {t('title')}
          </h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">
            {t('subtitle')}
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {questions.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="card overflow-hidden rounded-2xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_75%,transparent)] shadow-[0_12px_44px_rgb(15_23_42/12%)]"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition-colors duration-200 hover:bg-[color:color-mix(in_oklab,var(--brand-soft)_22%,transparent)]"
                >
                  <span className="pr-8 text-base font-semibold text-body">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 flex-shrink-0 text-[color:var(--fg-muted)] transition-transform duration-300',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                <div
                  className={cn(
                    'overflow-hidden transition-all duration-300 ease-in-out',
                    isOpen ? 'max-h-96' : 'max-h-0'
                  )}
                >
                  <div className="px-6 pb-6 text-sm leading-relaxed text-[color:var(--fg-subtle)]">
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
