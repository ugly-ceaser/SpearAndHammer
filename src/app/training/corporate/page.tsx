import type { Metadata } from "next";
import Hero from '@/components/corporate/hero';
import Benefits from '@/components/corporate/benefits';
import Programs from '@/components/corporate/programs';
import Enterprise from '@/components/corporate/enterprise';

export const metadata: Metadata = {
  title: "Corporate Training Services - Spear & Hammer",
  description: "Comprehensive corporate IT training programs for teams and organizations. Boost your workforce skills with customized technology training solutions.",
};

export default function CorporateTrainingPage() {
  return (
    <div className="w-[80vw] mx-auto">
      <Hero />
      <div className="mt-16">
        <Benefits />
      </div>
      <div className="mt-16">
        <Programs />
      </div>
      <div className="mt-16">
        <Enterprise />
      </div>
    </div>
  );
}