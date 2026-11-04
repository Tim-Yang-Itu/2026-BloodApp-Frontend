import { CallToActionSection } from "@/features/landing-page/presentation/components/CallToActionSection";
import { HeroSection } from "@/features/landing-page/presentation/components/HeroSection";
import { HowItWorksSection } from "@/features/landing-page/presentation/components/HowItWorksSection";
import { Navbar } from "@/features/landing-page/presentation/components/Navbar";
import { ServicesSection } from "@/features/landing-page/presentation/components/ServicesSection";
import { SyaratDonorSection } from "@/features/landing-page/presentation/components/SyaratDonorSection";
import { NearestDonorLocationSection } from "../components/NearestDonorLocationSection";
import { FAQSection } from "../components/FAQSection";

export function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden bg-background text-foreground">
        <HeroSection />
        <ServicesSection />
        <HowItWorksSection />
        <SyaratDonorSection />
        <NearestDonorLocationSection />
        <FAQSection />
        <CallToActionSection />
      </main>
    </>
  );
}

export default LandingPage;
