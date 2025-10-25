'use client'

import { useTranslations } from 'next-intl'

type OutcomeKey = 'speed' | 'deals' | 'work'

const outcomeOrder: OutcomeKey[] = ['speed', 'deals', 'work']

export function OutcomesStrip() {
  const t = useTranslations('outcomes')

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <div className="grid gap-6 md:grid-cols-3">
          {outcomeOrder.map((key) => (
            <div
              key={key}
              className="card flex h-full flex-col gap-3 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8 text-center"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--fg-muted)]">
                {t(`${key}.title`)}
              </p>
              <p className="text-4xl font-bold text-body">{t(`${key}.value`)}</p>
              <p className="text-sm text-[color:var(--fg-subtle)]">{t(`${key}.footnote`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

