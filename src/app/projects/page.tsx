'use client';
import React from 'react';
import Hero from '@/components/projects/hero';
import Project from '@/components/projects/projects';

export default function ProjectsPage() {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-[7vw]">
      <Hero/>
      <div className="mt-16">
        <Project />
      </div>
    </main>
  );
}
