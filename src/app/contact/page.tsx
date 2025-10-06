import { NextPage } from 'next';
import Hero from '../../components/contact/hero';
import ContactForm from '@/components/contact/contactForm';


const Contact: NextPage = () => {
  return (
    <main className="bg-white min-h-screen px-2 sm:px-4 md:px-6 lg:px-[7vw]">
      <Hero />
      <div className="mt-16">
        <ContactForm/>
      </div>
    </main>
  );
};

export default Contact;
