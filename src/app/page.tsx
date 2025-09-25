import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero";
import FeaturesSection from "@/components/landing/features";
import SystemRequirementsSection from "@/components/landing/system-requirements";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background relative">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <SystemRequirementsSection />
      </main>
      <Footer />
    </div>
  );
}
