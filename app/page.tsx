import { LandingHeader } from '@/components/landing/header'
import { HeroSection } from '@/components/landing/hero'
import { FeaturesSection } from '@/components/landing/features'
import { TestimonialsSection } from '@/components/landing/testimonials'
import { PricingSection } from '@/components/landing/pricing'
import { FAQSection } from '@/components/landing/faq'
import { CTASection, Footer } from '@/components/landing/cta-footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
