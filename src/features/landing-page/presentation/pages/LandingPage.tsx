import { CallToActionSection } from "@/features/landing-page/presentation/components/CallToActionSection";
import { HeroSection } from "@/features/landing-page/presentation/components/HeroSection";
import { HowItWorksSection } from "@/features/landing-page/presentation/components/HowItWorksSection";
import { PublicNavbar } from "@/shared/ui";
import { useScrollToHash } from "@/shared/hooks/use-scroll-to-hash";
import { ServicesSection } from "@/features/landing-page/presentation/components/ServicesSection";
import { SyaratDonorSection } from "@/features/landing-page/presentation/components/SyaratDonorSection";
import { NearestDonorLocationSection } from "../components/NearestDonorLocationSection";
import { FAQSection } from "../components/FAQSection";

export function LandingPage() {
  // Anchor dari header (/#cara-donor, /#syarat, ...) digulir manual.
  useScrollToHash();

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
  );
}

export default LandingPage;
