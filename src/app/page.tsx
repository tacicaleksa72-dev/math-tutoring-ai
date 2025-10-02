import Hero from '@/components/Hero';
import WhyUs from '@/components/WhyUs';
import About from '@/components/About';
import { BRAND } from '@/lib/site';

export const metadata = {
  title: `${BRAND} | Privatni časovi matematike`,
  description:
    'Privatni časovi matematike za osnovce i srednjoškolce. Fleksibilni termini, stručni nastavnici i prilagođeni programi za brži napredak i bolje rezultate.',
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <About />
    </main>
  );
}
