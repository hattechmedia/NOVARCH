import { notFound } from 'next/navigation';
import { generateMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/data/services';
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';

const SLUG = 'digital-launch';

export const metadata = generateMetadata({
  title: 'Digital Launch System',
  description:
    'Turn the business into a clear, credible and conversion-ready digital presence with the NOVARCH Digital Launch System.',
  path: `/services/${SLUG}`,
});

export default function DigitalLaunchPage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
