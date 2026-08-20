export interface ContactFormStep1 {
  company: string;
  website: string;
  market: string;
  industry: string;
  role: string;
}

export interface ContactFormStep2 {
  whatShouldImprove: string;
  howItWorksToday: string;
  whoIsAffected: string;
  toolsCurrentlyUsed: string;
}

export interface ContactFormStep3 {
  whatShouldBecomePossible: string;
  whatSuccessLooksLike: string;
  desiredDeadline: string;
}

export interface ContactFormStep4 {
  preferredService: string;
  budgetRange: string;
  decisionTimeline: string;
  stakeholders: string;
}

export interface ContactFormStep5 {
  name: string;
  email: string;
  phone: string;
  links: string;
  privacyAcknowledged: boolean;
}

export type ContactFormData = ContactFormStep1 &
  ContactFormStep2 &
  ContactFormStep3 &
  ContactFormStep4 &
  ContactFormStep5;
