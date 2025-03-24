import { NextPage } from 'next';
import Hero from '../../components/contact/hero';
import ContactForm from '@/components/contact/contactForm';


const Contact: NextPage = () => {
  return (
    <main className="bg-white min-h-screen px-[7vw]">
      <Hero />
      <ContactForm/>
    </main>
  );
};

export default Contact;
