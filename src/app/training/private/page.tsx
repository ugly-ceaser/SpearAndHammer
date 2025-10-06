'use client';
import React from 'react';
import Hero from '@/components/training/hero';
import Features from '@/components/training/features';
import Courses from '@/components/training/courses';
import Pricing from '@/components/training/pricing';

export default function PrivateClassesPage() {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-[7vw]">
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
    </main>
  );
}