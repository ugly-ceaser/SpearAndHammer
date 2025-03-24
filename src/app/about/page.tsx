import { NextPage } from 'next';
import Hero from '../../components/about/hero';
import AboutPage from '../../components/about/about';

const About: NextPage = () => {
  return (
    <main className="bg-white min-h-screen  ">
      <Hero />
      <AboutPage />
    </main>
  );
};

export default About;
