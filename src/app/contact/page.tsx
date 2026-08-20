'use client';

import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { CheckCircle2, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { ContactFormData } from '@/types/form';

const INITIAL_FORM: ContactFormData = {
  // Step 1
  company: '',
  website: '',
  market: '',
  industry: '',
  role: '',
  // Step 2
  whatShouldImprove: '',
  howItWorksToday: '',
  whoIsAffected: '',
  toolsCurrentlyUsed: '',
  // Step 3
  whatShouldBecomePossible: '',
  whatSuccessLooksLike: '',
  desiredDeadline: '',
  // Step 4
  preferredService: 'Digital Launch',
  budgetRange: '€2,500 - €5,000',
  decisionTimeline: '1-2 weeks',
  stakeholders: '',
  // Step 5
  name: '',
  email: '',
  phone: '',
  links: '',
  privacyAcknowledged: false,
};

const STEPS = [
  { id: 1, name: 'Your Business' },
  { id: 2, name: 'Current Situation' },
  { id: 3, name: 'Desired Result' },
  { id: 4, name: 'Commercial Fit' },
  { id: 5, name: 'Contact Info' },
];

export default function ContactPage() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const updateField = <K extends keyof ContactFormData>(field: K, value: ContactFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Submission failed');

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 lg:py-20 text-text">
      <Container size="md">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="default" className="mb-4">
            PROJECT INTAKE MODEL
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-text mb-4">
            Start a <span className="text-blue">Project</span>
          </h1>
          <p className="text-base sm:text-lg text-text-muted">
            Tell us what should change, build or connect.
          </p>
        </div>

        {isSubmitted ? (
          <Card className="p-8 sm:p-12 text-center bg-surface-card border-blue/30 shadow-2xl">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue/20 text-blue mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-text mb-3">
              Project Intake <span className="text-blue">Received</span>
            </h2>
            <p className="text-base text-text-muted leading-relaxed max-w-md mx-auto mb-8">
              Thank you for sharing your operational requirements. The NOVARCH technical team will review your submission and contact you within 24 hours.
            </p>
            <Button href="/" variant="primary" size="md">
              Return to Home
            </Button>
          </Card>
        ) : (
          <div className="rounded-2xl border border-border bg-surface-card p-6 sm:p-10 shadow-2xl">
            {/* Step Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-blue">
                  STEP 0{currentStep} OF 05
                </span>
                <span className="text-xs font-semibold text-text">
                  {STEPS[currentStep - 1].name}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-surface-2 overflow-hidden">
                <div
                  className="h-full bg-blue transition-all duration-300 ease-out"
                  style={{ width: `${(currentStep / 5) * 100}%` }}
                />
              </div>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-800/50 text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={currentStep === 5 ? handleSubmit : handleNext}>
              {/* STEP 1: Your Business */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-text mb-4">Step 1 — Your Business</h2>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Company Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      placeholder="e.g. Acme Industries GmbH"
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Website URL</label>
                      <input
                        type="text"
                        value={formData.website}
                        onChange={(e) => updateField('website', e.target.value)}
                        placeholder="https://example.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Your Role</label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => updateField('role', e.target.value)}
                        placeholder="e.g. Managing Director, Head of Ops"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Market / Location</label>
                      <input
                        type="text"
                        value={formData.market}
                        onChange={(e) => updateField('market', e.target.value)}
                        placeholder="e.g. Germany, EU, Global"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Industry</label>
                      <input
                        type="text"
                        value={formData.industry}
                        onChange={(e) => updateField('industry', e.target.value)}
                        placeholder="e.g. Manufacturing, Logistics, SaaS"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Current Situation */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-text mb-4">Step 2 — Current Situation</h2>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">What should improve? *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.whatShouldImprove}
                      onChange={(e) => updateField('whatShouldImprove', e.target.value)}
                      placeholder="Describe the bottleneck, manual process or missing capability..."
                      className="w-full p-3 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">How does it work today?</label>
                    <textarea
                      rows={2}
                      value={formData.howItWorksToday}
                      onChange={(e) => updateField('howItWorksToday', e.target.value)}
                      placeholder="Current workflow, step-by-step handoffs, manual copy-pasting..."
                      className="w-full p-3 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Who is affected?</label>
                      <input
                        type="text"
                        value={formData.whoIsAffected}
                        onChange={(e) => updateField('whoIsAffected', e.target.value)}
                        placeholder="e.g. Sales team, Operations, Customers"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Tools currently used</label>
                      <input
                        type="text"
                        value={formData.toolsCurrentlyUsed}
                        onChange={(e) => updateField('toolsCurrentlyUsed', e.target.value)}
                        placeholder="e.g. Hubspot, Excel, Zapier, Custom DB"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Desired Result */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-text mb-4">Step 3 — Desired Result</h2>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">What should become possible? *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.whatShouldBecomePossible}
                      onChange={(e) => updateField('whatShouldBecomePossible', e.target.value)}
                      placeholder="Describe the target state, system capabilities or new options..."
                      className="w-full p-3 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">What does success look like?</label>
                    <input
                      type="text"
                      value={formData.whatSuccessLooksLike}
                      onChange={(e) => updateField('whatSuccessLooksLike', e.target.value)}
                      placeholder="e.g. 80% time saved on lead qualification, zero data transfer errors"
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Desired Deadline / Target Go-Live</label>
                    <input
                      type="text"
                      value={formData.desiredDeadline}
                      onChange={(e) => updateField('desiredDeadline', e.target.value)}
                      placeholder="e.g. Within 4 weeks, End of Q3"
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Commercial Fit */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-text mb-4">Step 4 — Commercial Fit</h2>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Preferred Service Door *</label>
                    <select
                      value={formData.preferredService}
                      onChange={(e) => updateField('preferredService', e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 focus:outline-2 focus:outline-blue transition-colors"
                    >
                      <option value="Digital Launch" className="bg-surface-card text-text">Digital Launch (From €2,900)</option>
                      <option value="Automation & Integration" className="bg-surface-card text-text">Automation & Integration (From €3,900)</option>
                      <option value="AI Workflow" className="bg-surface-card text-text">AI Workflow (From €4,900)</option>
                      <option value="Custom Software" className="bg-surface-card text-text">Custom Software (From €7,500)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Target Budget Range</label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => updateField('budgetRange', e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 focus:outline-2 focus:outline-blue transition-colors"
                      >
                        <option value="Blueprint Only (€490-€1,500)" className="bg-surface-card text-text">Blueprint Only (€490 - €1,500)</option>
                        <option value="€2,500 - €5,000" className="bg-surface-card text-text">€2,500 - €5,000</option>
                        <option value="€5,000 - €10,000" className="bg-surface-card text-text">€5,000 - €10,000</option>
                        <option value="€10,000+" className="bg-surface-card text-text">€10,000+</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Decision Timeline</label>
                      <select
                        value={formData.decisionTimeline}
                        onChange={(e) => updateField('decisionTimeline', e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 focus:outline-2 focus:outline-blue transition-colors"
                      >
                        <option value="Immediate / This week" className="bg-surface-card text-text">Immediate / This week</option>
                        <option value="1-2 weeks" className="bg-surface-card text-text">1-2 weeks</option>
                        <option value="This month" className="bg-surface-card text-text">This month</option>
                        <option value="Planning for next quarter" className="bg-surface-card text-text">Planning for next quarter</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Contact Info */}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-bold text-text mb-4">Step 5 — Contact Info</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Your Full Name *</label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        placeholder="John Doe"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text mb-1">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="+49 123 456789"
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-text mb-1">Relevant Links / Doc URLs</label>
                    <input
                      type="text"
                      value={formData.links}
                      onChange={(e) => updateField('links', e.target.value)}
                      placeholder="e.g. Google Drive link, Figma mockup"
                      className="w-full h-11 px-3.5 rounded-xl border border-border text-sm text-text bg-surface-2 placeholder:text-text-light focus:outline-2 focus:outline-blue transition-colors"
                    />
                  </div>
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        required
                        type="checkbox"
                        checked={formData.privacyAcknowledged}
                        onChange={(e) => updateField('privacyAcknowledged', e.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-border accent-blue text-blue"
                      />
                      <span className="text-xs text-text-muted leading-relaxed">
                        I acknowledge that NOVARCH processes intake data to evaluate commercial alignment and prepare project scope. Your data is never sold or used as training data.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Buttons */}
              <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
                {currentStep > 1 ? (
                  <Button type="button" variant="ghost" size="md" onClick={handleBack}>
                    <ArrowLeft className="h-4 w-4 mr-1" /> Back
                  </Button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <Button type="submit" variant="primary" size="md">
                    Next Step <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                ) : (
                  <Button type="submit" variant="primary" size="md" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Project Intake'}
                    <Send className="h-4 w-4 ml-1.5" />
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
}
