'use client'

/**
 * Cookie Consent Banner
 * GDPR-compliant with category selection
 */

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { X } from 'lucide-react'

const COOKIE_CONSENT_KEY = 'caribbean-azure-cookie-consent'

export interface CookieConsent {
  functional: boolean // Always true (required)
  analytics: boolean
  marketing: boolean
  timestamp: number
}

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    functional: true,
    analytics: false,
    marketing: false,
    timestamp: 0,
  })

  useEffect(() => {
    // Check if consent already given
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!stored) {
      setIsVisible(true)
    }
  }, [])

  const handleAcceptAll = () => {
    const newConsent: CookieConsent = {
      functional: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const handleAcceptSelected = () => {
    const newConsent: CookieConsent = {
      ...consent,
      functional: true, // Always required
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const handleRejectAll = () => {
    const newConsent: CookieConsent = {
      functional: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }
    saveConsent(newConsent)
  }

  const saveConsent = (newConsent: CookieConsent) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(newConsent))
    setIsVisible(false)

    // TODO: Initialize analytics based on consent
    if (newConsent.analytics && typeof window !== 'undefined') {
      // Initialize Plausible or other analytics
      console.log('Analytics enabled')
    }
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6">
      <Card className="max-w-4xl mx-auto p-6 sm:p-8 shadow-2xl">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Deze website gebruikt cookies</h3>
            <p className="text-sm text-[color:var(--fg-subtle)] mb-4">
              We gebruiken cookies om je ervaring te verbeteren en om websiteverkeer te
              analyseren. Je kunt je voorkeuren aanpassen of alles accepteren.
            </p>
          </div>
          <button
            onClick={handleRejectAll}
            className="text-[color:var(--fg-muted)] hover:text-[color:var(--fg)] transition-colors flex-shrink-0"
            aria-label="Sluiten"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {showDetails && (
          <div className="space-y-3 mb-6 text-sm">
            <label className="flex items-center gap-3">
              <input type="checkbox" checked disabled className="h-4 w-4" />
              <div>
                <div className="font-medium">Functioneel (verplicht)</div>
                <div className="text-[color:var(--fg-muted)] text-xs">
                  Nodig voor basisfunctionaliteit
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.analytics}
                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                className="h-4 w-4"
              />
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-[color:var(--fg-muted)] text-xs">
                  Helpt ons de site te verbeteren (Plausible, privacy-vriendelijk)
                </div>
              </div>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent.marketing}
                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                className="h-4 w-4"
              />
              <div>
                <div className="font-medium">Marketing</div>
                <div className="text-[color:var(--fg-muted)] text-xs">
                  Voor gerichte advertenties
                </div>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button onClick={handleAcceptAll} size="lg">
            Accepteer alles
          </Button>
          {showDetails ? (
            <Button onClick={handleAcceptSelected} size="lg" variant="outline">
              Selectie opslaan
            </Button>
          ) : (
            <Button onClick={() => setShowDetails(true)} size="lg" variant="outline">
              Voorkeuren aanpassen
            </Button>
          )}
          <Button onClick={handleRejectAll} size="lg" variant="ghost">
            Alleen noodzakelijk
          </Button>
        </div>
      </Card>
    </div>
  )
}
