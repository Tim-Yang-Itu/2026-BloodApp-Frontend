import { useScrollToHash } from '@/shared/hooks/use-scroll-to-hash'
import { PublicNavbar } from '@/shared/ui'

import { CallToActionSection } from '../components/CallToActionSection'
import { FAQSection } from '../components/FAQSection'
import { HeroSection } from '../components/HeroSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { NearestDonorLocationSection } from '../components/NearestDonorLocationSection'
import { ServicesSection } from '../components/ServicesSection'
import { SyaratDonorSection } from '../components/SyaratDonorSection'

/** PDN-01: halaman beranda publik. */
export function LandingPage() {
  // Anchor dari header (/#cara-donor, /#syarat, ...) digulir manual.
  useScrollToHash()

  return (
    <>
      <PublicNavbar />
      <main className="overflow-hidden bg-background text-foreground">
        <HeroSection />
        <NearestDonorLocationSection />
        <ServicesSection />
        <HowItWorksSection />
        <SyaratDonorSection />
        <FAQSection />
        <CallToActionSection />
      </main>
    </>
  )
}

export default LandingPage
