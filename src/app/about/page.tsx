import { NextPage } from 'next';
import Hero from '../../components/about/hero';
import AboutPage from '../../components/about/about';

const About: NextPage = () => {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6">
      <Hero />
      <div className="mt-16">
        <AboutPage />
      </div>
    </main>
  );
};

export default About;
