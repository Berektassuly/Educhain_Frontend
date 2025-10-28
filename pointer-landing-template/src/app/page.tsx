import { HeroSection } from "@/features/landing/ui/sections/hero-section"
import TrustEcosystemSection from "@/features/landing/ui/sections/trust-ecosystem-section";
import { LargeTestimonial } from "@/features/landing/ui/sections/large-testimonial"
import { PricingSection } from "@/features/landing/ui/sections/pricing-section"
import { TestimonialGridSection } from "@/features/landing/ui/sections/testimonial-grid-section"
import { FAQSection } from "@/features/landing/ui/sections/faq-section"
import { CTASection } from "@/features/landing/ui/sections/cta-section"
import { FooterSection } from "@/features/landing/ui/sections/footer-section"
import { AnimatedSection } from "@/features/landing/ui/sections/animated-section"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          <HeroSection />
        </main>
        <AnimatedSection id="features-section" className="relative z-10 max-w-[1320px] mx-auto mt-16" delay={0.2}>
          <TrustEcosystemSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <LargeTestimonial />
        </AnimatedSection>
        <AnimatedSection
          id="pricing-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <PricingSection />
        </AnimatedSection>
        <AnimatedSection
          id="testimonials-section"
          className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16"
          delay={0.2}
        >
          <TestimonialGridSection />
        </AnimatedSection>
        <AnimatedSection id="faq-section" className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FAQSection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <CTASection />
        </AnimatedSection>
        <AnimatedSection className="relative z-10 max-w-[1320px] mx-auto mt-8 md:mt-16" delay={0.2}>
          <FooterSection />
        </AnimatedSection>
      </div>
    </div>
  )
}
