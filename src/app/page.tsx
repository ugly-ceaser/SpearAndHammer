// import Image from "next/image";
import { Hero, LogoBanner, About, Team, Clients, Testimonial } from '@/components/home'

export default function Home() {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6">
      <Hero /> 
       <LogoBanner />
      <About />
      <Team />
      <Clients />
      <Testimonial /> 
    </main>
  );
}
