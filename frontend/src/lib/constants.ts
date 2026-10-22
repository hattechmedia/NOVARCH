export const SITE = {
  name: 'NOVARCH',
  tagline: 'AI, Software & Digital Systems',
  description:
    'NOVARCH designs and builds AI, software and digital systems that help businesses sell, operate and grow — with human control and data ownership built in.',
  url: 'https://novarch.io',
  location: 'Ilmenau, Germany',
  email: 'mesum@novarch.eu',
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
  hacktheflag: '/hacktheflag',
  services: {
    digitalLaunch: '/services/digital-launch',
    automationIntegration: '/services/automation-integration',
    aiWorkflow: '/services/ai-workflow',
    customSoftware: '/services/custom-software',
  },
  legal: {
    hub: '/legal',
    winterArc: '/legal/winter-arc-2026',
    photographyConsent: '/legal/photography-consent',
    nda: '/legal/nda',
  },
} as const;

export const HACKTHEFLAG_CHALLENGE_URL = 'https://34f9fabd0dc1.ngrok.app/' as const;


export const BRAND_PRINCIPLES = [
  'Your data is not our product.',
  'Human accountability stays visible.',
  'Access should be deliberate.',
  'Systems should support exit and continuity.',
] as const;
