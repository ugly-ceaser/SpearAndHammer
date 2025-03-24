// import Image from "next/image";
import { Hero, LogoBanner, About, Team, Clients, Testimonial } from '@/components/home'

export default function Home() {
  return (
    <main className="bg-white min-h-screen mt-[15vh]">
      <Hero /> 
       <LogoBanner />
      <About />
      <Team />
      <Clients />
      <Testimonial /> 
    </main>
  );
}
