'use client';
import React from 'react';
import Hero from '@/components/corporate/hero';
import Benefits from '@/components/corporate/benefits';
import Programs from '@/components/corporate/programs';
import Enterprise from '@/components/corporate/enterprise';

export default function CorporateTrainingPage() {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-[7vw]">
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
    </main>
  );
}