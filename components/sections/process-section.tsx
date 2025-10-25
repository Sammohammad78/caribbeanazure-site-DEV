import { useTranslations } from 'next-intl'
import { Search, Wrench, Rocket } from 'lucide-react'

export function ProcessSection() {
  const t = useTranslations('process')

  const steps = [
    {
      icon: Search,
      number: '01',
      title: t('step1.title'),
      description: t('step1.description'),
    },
    {
      icon: Wrench,
      number: '02',
      title: t('step2.title'),
      description: t('step2.description'),
    },
    {
      icon: Rocket,
      number: '03',
      title: t('step3.title'),
      description: t('step3.description'),
    },
  ]

  return (
    <section className="section-padding-y bg-[color:color-mix(in_oklab,var(--bg)_85%,transparent)]">
      <div className="container-custom">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-3">
          <div className="pointer-events-none absolute left-1/2 top-20 hidden h-0.5 w-[calc(100%-160px)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,0.12),transparent)] opacity-60 dark:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.16),transparent)] md:block" />
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="card card-gradient-stripe lift-hover relative flex h-full flex-col items-center gap-6 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_68%,transparent)] p-10 text-center shadow-[0_18px_60px_rgb(15_23_42/10%)] transition-all duration-300"
              >
                <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--brand-soft)_55%,transparent)] text-[color:var(--brand)] shadow-[0_18px_40px_color-mix(in_oklab,var(--brand)_35%,transparent)]">
                  <Icon className="h-10 w-10" />
                  <span className="absolute -bottom-5 flex h-9 w-14 items-center justify-center rounded-full bg-[color:var(--accent)] text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_8px_24px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                    {step.number}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-body">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-[color:var(--fg-subtle)]">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
