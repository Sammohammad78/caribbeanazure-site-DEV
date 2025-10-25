'use client'

/**
 * Custom 500 Error Page
 */

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Text } from '@/components/ui/text'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { Home, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <main id="main-content">
      <Section spacing="xl">
        <Container size="narrow">
          <div className="text-center">
            <div className="text-8xl font-bold text-[color:var(--err)] mb-6">500</div>
            <Heading level="h1" className="mb-4">
              Er ging iets mis
            </Heading>
            <Text variant="subtle" size="lg" className="mb-8 max-w-lg mx-auto">
              We konden je verzoek niet verwerken. Probeer het opnieuw of neem contact met ons
              op als het probleem aanhoudt.
            </Text>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button onClick={reset} size="lg">
                <RefreshCw className="mr-2 h-5 w-5" />
                Probeer opnieuw
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/nl">
                  <Home className="mr-2 h-5 w-5" />
                  Ga naar home
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  )
}
