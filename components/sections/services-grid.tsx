import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart3, Bot, LayoutGrid, MessageSquare, Workflow } from 'lucide-react'

const icons = [Workflow, MessageSquare, Bot, BarChart3, LayoutGrid]

export function ServicesGrid() {
  const t = useTranslations('services')
  const locale = useLocale()
  const services = t.raw('items') as Array<{ title: string; description: string }>

  return (
    <section className="section-padding-y">
      <div className="container-custom">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h2>
          <p className="copy-20 text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length]
            const href = `/${locale}/diensten`
            return (
              <Link key={service.title} href={href} className="group h-full">
                <Card className="card-gradient-stripe relative h-full overflow-hidden transition-all duration-300 ease-out">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:color-mix(in_oklab,var(--brand-soft)_65%,transparent)] text-[color:var(--brand)] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,var(--brand)_0%,var(--accent)_100%)] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="flex items-center justify-between text-lg font-semibold text-body">
                      {service.title}
                      <ArrowRight className="h-4 w-4 text-[color:var(--fg-muted)] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[color:var(--accent)]" />
                    </CardTitle>
                    <CardDescription className="leading-relaxed text-[color:var(--fg-subtle)]">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
