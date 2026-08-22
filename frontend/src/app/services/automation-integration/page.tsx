import { notFound } from 'next/navigation';
import { generateMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/data/services';
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';

const SLUG = 'automation-integration';

export const metadata = generateMetadata({
  title: 'Automation & Integration System',
  description:
    'Connect the tools, data and handoffs that slow the team down with the NOVARCH Automation & Integration System.',
  path: `/services/${SLUG}`,
});

export default function AutomationIntegrationPage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
