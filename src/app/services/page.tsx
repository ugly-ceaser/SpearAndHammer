import ServicesHero from '@/components/services/hero';
import ServicesList from '@/components/services/servicesList';
import ServicesCTA from '@/components/services/cta';

export const metadata = {
  title: 'Our Services - Spear & Hammer',
  description: 'Comprehensive software engineering services including consultation, project management, development, system design, project costing, and recruitment.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </div>
  );
}