import type { Metadata } from "next";
import Hero from '@/components/training/hero';
import Features from '@/components/training/features';
import Courses from '@/components/training/courses';
import Pricing from '@/components/training/pricing';

export const metadata: Metadata = {
  title: "Private Training Classes - Spear & Hammer",
  description: "Personalized IT training classes designed for individual learning. Master programming, web development, and software engineering with expert instructors.",
};

export default function PrivateClassesPage() {
  return (
    <div className="w-[80vw] mx-auto">
      <Hero />
      <div className="mt-16">
        <Features />
      </div>
      <div className="mt-16">
        <Courses />
      </div>
      <div className="mt-16">
        <Pricing />
      </div>
    </div>
  );
}