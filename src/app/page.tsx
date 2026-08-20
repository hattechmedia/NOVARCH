import { generateMetadata } from '@/lib/metadata';
import { Hero } from '@/components/sections/Hero';
import { ServicesSection } from '@/components/sections/Services';
import { ProcessSection } from '@/components/sections/Process';
import { WhyNovarchSection } from '@/components/sections/WhyNovarch';
import { CTASection } from '@/components/sections/CTA';

export const metadata = generateMetadata({
  title: 'AI, Software & Digital Systems',
  description:
    'NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.',
});

export default function HomePage() {
  return (
    <>
      {/* Section 01: Hero */}
      <Hero />

      {/* Section 02: What We Offer */}
      <ServicesSection />

      {/* Section 03: How NOVARCH Works */}
      <ProcessSection />

      {/* Section 04: Why NOVARCH */}
      <WhyNovarchSection />

      {/* Section 05: Final CTA */}
      <CTASection />
    </>
  );
}
