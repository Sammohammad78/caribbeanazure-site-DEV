import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

type InsightPost = {
  slug: string
  title: string
  summary: string
  cta: string
}

export default async function InsightDetailPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const { locale, slug } = params
  const t = await getTranslations({ locale, namespace: 'insights' })
  const posts = t.raw('posts') as InsightPost[]
  const placeholder = t('detailPlaceholder')
  const invite = t('detailInvite')
  const post = posts.find((item) => item.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <Header />
      <main>
        <section className="section-padding-y hero-glow">
          <div className="container-custom text-center">
            <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">{post.title}</h1>
            <p className="mt-6 text-lg text-[color:var(--fg-subtle)]">{post.summary}</p>
          </div>
        </section>

        <section className="section-padding-y">
          <div className="container-custom mx-auto max-w-3xl space-y-6 text-sm text-[color:var(--fg-subtle)]">
            <p>{placeholder}</p>
            <p>{invite}</p>
            <Button asChild size="lg" className="mt-6">
              <a href={`/${locale}/contact`}>{post.cta}</a>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
