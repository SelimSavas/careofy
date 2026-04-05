import { FAQSection } from "@/components/landing/FAQSection";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { SampleReportSection } from "@/components/landing/SampleReportSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { TestPreviewSection } from "@/components/landing/TestPreviewSection";
import { UserTypeSection } from "@/components/landing/UserTypeSection";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="relative">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-gradient-to-b from-navy-900/[0.03] via-transparent to-transparent" />
        <HeroSection />
        <HowItWorksSection />
        <TestPreviewSection />
        <UserTypeSection />
        <SampleReportSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
