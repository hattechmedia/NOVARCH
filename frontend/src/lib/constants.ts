export const SITE = {
  name: 'NOVARCH',
  tagline: 'AI, Software & Digital Systems',
  description:
    'NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.',
  url: 'https://novarch.io',
  location: 'Ilmenau, Germany',
  email: 'hello@novarch.io',
} as const;

export const VAT_CONFIG = {
  currency: 'EUR',
  symbol: '€',
  wording: 'excl. VAT', // Configurable: 'excl. VAT', '+ VAT', 'incl. VAT', etc.
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  contact: '/contact',
  services: {
    digitalLaunch: '/services/digital-launch',
    automationIntegration: '/services/automation-integration',
    aiWorkflow: '/services/ai-workflow',
    customSoftware: '/services/custom-software',
  },
} as const;

export const BRAND_PRINCIPLES = [
  'Your data is not our product.',
  'Human accountability stays visible.',
  'Access should be deliberate.',
  'Systems should support exit and continuity.',
] as const;
