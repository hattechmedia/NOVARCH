import { notFound } from 'next/navigation';
import { generateMetadata } from '@/lib/metadata';
import { getServiceBySlug } from '@/data/services';
import { ServicePageTemplate } from '@/components/sections/ServicePageTemplate';

const SLUG = 'ai-workflow';

export const metadata = generateMetadata({
  title: 'AI Workflow System',
  description:
    'Turn one valuable AI opportunity into a controlled working workflow with explicit human approval gates.',
  path: `/services/${SLUG}`,
});

export default function AiWorkflowPage() {
  const service = getServiceBySlug(SLUG);
  if (!service) notFound();

  return <ServicePageTemplate service={service} />;
}
