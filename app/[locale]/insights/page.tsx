import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

type InsightPost = {
  slug: string
  title: string
  summary: string
  cta: string
}

export default async function InsightsPage({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'insights' })
  const posts = t.raw('posts') as InsightPost[]

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{t('title')}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{t('subtitle')}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="card flex h-full flex-col gap-4 rounded-3xl border-[color:color-mix(in_oklab,var(--fg)_12%,transparent)] bg-[color:color-mix(in_oklab,var(--panel)_70%,transparent)] p-8"
              >
                <CardHeader className="space-y-3 pb-0">
                  <CardTitle className="text-xl font-semibold text-body">{post.title}</CardTitle>
                  <CardDescription className="text-sm text-[color:var(--fg-subtle)]">
                    {post.summary}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex justify-start p-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/${params.locale}/insights/${post.slug}`}>
                      {post.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

