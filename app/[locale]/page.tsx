import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { HeroEnhanced } from '@/components/sections/hero-enhanced'
import { TrustStrip } from '@/components/sections/trust-strip'
import { ROICalculator } from '@/components/sections/roi-calculator'
import { OutcomesStrip } from '@/components/sections/outcomes-strip'
import { ServicesGrid } from '@/components/sections/services-grid'
import { ProcessSection } from '@/components/sections/process-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { FAQSection } from '@/components/sections/faq-section'
import { CTASection } from '@/components/sections/cta-section'
import {
  OrganizationSchema,
  ServiceSchema,
  LocalBusinessSchema,
  WebsiteSchema,
} from '@/components/seo/structured-data'
import { BackgroundEngine } from '@/components/backgrounds/BackgroundEngine'
import { backgroundThemes } from '@/lib/backgroundThemes'

export default function HomePage() {
  return (
    <>
      {/* Schema.org structured data for SEO */}
      <OrganizationSchema />
      <ServiceSchema />
      <LocalBusinessSchema />
      <WebsiteSchema />

      <div className="relative">
        {/* 3D Background */}
        <div className="fixed inset-0 -z-10">
          <BackgroundEngine theme={backgroundThemes.home} />
        </div>

        <Header />
        <main id="main-content">
          <HeroEnhanced />
          <TrustStrip variant="default" className="py-12" />
          <ROICalculator />
          <OutcomesStrip />
          <ProcessSection />
          <UseCasesSection />
          <ServicesGrid />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  )
}
