import { notFound } from 'next/navigation';
import { generateMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/data/services';
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';

const SLUG = 'custom-software';

export const metadata = generateMetadata({
  title: 'Custom Software System',
  description:
    'Build the software the operation actually needs — custom web applications, APIs, databases and permission logic.',
  path: `/services/${SLUG}`,
});

export default function CustomSoftwarePage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
