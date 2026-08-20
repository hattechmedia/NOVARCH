import type { Metadata } from 'next';
import { SITE } from './constants';

interface PageMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
}

export function generateMetadata({
  title,
  description,
  path = '/',
}: PageMetadataOptions = {}): Metadata {
  const fullTitle = title ? `${title} — ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
  const desc = description ?? SITE.description;
  const url = `${SITE.url}${path}`;

  return {
    title: fullTitle,
    description: desc,
    metadataBase: new URL(SITE.url),
    openGraph: {
      title: fullTitle,
      description: desc,
      url,
      siteName: SITE.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
