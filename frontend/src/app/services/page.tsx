import { generateMetadata } from '@/lib/metadata';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ServicesSection } from '@/components/sections/Services';
import { CTASection } from '@/components/sections/CTA';

export const metadata = generateMetadata({
  title: 'Services Overview',
  description:
    'Explore the 4 NOVARCH service doors: Digital Launch, Automation & Integration, AI Workflow, and Custom Software.',
  path: '/services',
});

export default function ServicesOverviewPage() {
  return (
    <div className="py-12 lg:py-20">
      <Container className="mb-12">
        <div className="max-w-3xl">
          <Badge variant="default" className="mb-4">
            COMMERCIAL PRODUCT DOORS
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text mb-4">
            System delivery doors.
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            NOVARCH delivers technology through four distinct service models. Each model begins with a fixed-price Blueprint to ensure commercial fit and technical feasibility before implementation.
          </p>
        </div>
      </Container>

      <ServicesSection />
      <CTASection />
    </div>
  );
}
