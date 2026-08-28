export interface PackageCatalogItem {
  id: string;
  slug: string;
  name: string;
  tier: 'Basic' | 'Premium';
  serviceName: string;
  priceEUR: number; // Price in EUR
  amountCents: number; // Price in EUR cents
  isPurchasable: boolean; // Only Basic plans are directly checkout-purchasable
}

export const PACKAGE_CATALOG: Record<string, PackageCatalogItem> = {
  'digital-launch-basic': {
    id: 'digital-launch-basic',
    slug: 'digital-launch',
    name: 'Launch Blueprint',
    tier: 'Basic',
    serviceName: 'Digital Launch',
    priceEUR: 1,
    amountCents: 100,
    isPurchasable: true,
  },
  'automation-integration-basic': {
    id: 'automation-integration-basic',
    slug: 'automation-integration',
    name: 'Workflow Blueprint',
    tier: 'Basic',
    serviceName: 'Automation & Integration',
    priceEUR: 690,
    amountCents: 69000,
    isPurchasable: true,
  },
  'ai-workflow-basic': {
    id: 'ai-workflow-basic',
    slug: 'ai-workflow',
    name: 'AI Evidence Sprint',
    tier: 'Basic',
    serviceName: 'AI Workflow',
    priceEUR: 950,
    amountCents: 95000,
    isPurchasable: true,
  },
  'custom-software-basic': {
    id: 'custom-software-basic',
    slug: 'custom-software',
    name: 'Solution Blueprint',
    tier: 'Basic',
    serviceName: 'Custom Software',
    priceEUR: 1500,
    amountCents: 150000,
    isPurchasable: true,
  },
};

export function getPackageBySlugOrId(identifier: string): PackageCatalogItem | undefined {
  if (!identifier) return undefined;
  const key = identifier.toLowerCase().trim();
  if (PACKAGE_CATALOG[key]) return PACKAGE_CATALOG[key];

  // Try matching by slug
  return Object.values(PACKAGE_CATALOG).find(
    (item) => item.slug.toLowerCase() === key || item.name.toLowerCase() === key
  );
}
