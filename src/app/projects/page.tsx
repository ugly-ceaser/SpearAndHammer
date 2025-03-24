'use client';
import React from 'react';
import Hero from '@/components/projects/hero';
import Project from '@/components/projects/projects';

export default function ProjectsPage() {
  return (
    <main className="bg-white min-h-screen px-[7vw]  ">
      <Hero/>
      <Project />
    </main>
  );
}
