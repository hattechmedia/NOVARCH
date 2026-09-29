'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  CheckCircle2,
  Send,
  Building,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Globe,
  GitBranch,
  Cpu,
  Code2,
  ShieldCheck,
} from 'lucide-react';
import { ContactFormData, PerformanceOption } from '@/types/form';
import { PERFORMANCE_OPTIONS, COUNTRY_CODES } from '@/data/contact';

const CONTACT_ICON_MAP = {
  Globe,
  GitBranch,
  Cpu,
  Code2,
  ShieldCheck,
};

const INITIAL_FORM: ContactFormData & { website_hp?: string } = {
  name: '',
  email: '',
  countryCode: '+49',
  phone: '',
  company: '',
  performances: [],
  news: '',
  website_hp: '',
};

function ContactFormContent() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = React.useState<ContactFormData & { website_hp?: string }>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  // Handle URL query param preselection (?service=digital-launch, ?service=ai-workflow, etc.)
  React.useEffect(() => {
    const serviceParam = searchParams.get('service') || searchParams.get('category') || '';
    if (!serviceParam) return;

    const normalized = serviceParam.toLowerCase().trim();
    let matchedOption: PerformanceOption | null = null;

    if (normalized.includes('digital') || normalized.includes('launch')) {
      matchedOption = 'Digital Launch';
    } else if (normalized.includes('auto') || normalized.includes('integrat')) {
      matchedOption = 'Automation & Integration';
    } else if (normalized.includes('ai') || normalized.includes('workflow')) {
      matchedOption = 'AI Workflow';
    } else if (normalized.includes('custom') || normalized.includes('software')) {
      matchedOption = 'Custom Software';
    } else if (normalized.includes('advisory') || normalized.includes('consult')) {
      matchedOption = 'Systems Advisory & Architecture Review';
    }

    if (matchedOption) {
      setFormData((prev) => {
        if (!prev.performances.includes(matchedOption!)) {
          return { ...prev, performances: [...prev.performances, matchedOption!] };
        }
        return prev;
      });
    }
  }, [searchParams]);

  const togglePerformance = (option: PerformanceOption) => {
    setFormData((prev) => {
      const exists = prev.performances.includes(option);
      return {
        ...prev,
        performances: exists
          ? prev.performances.filter((item) => item !== option)
          : [...prev.performances, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid e-mail address (e.g. name@company.com).');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submissionType: 'message',
          name: trimmedName,
          email: trimmedEmail,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || json.message || 'Submission failed');

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="py-20 lg:py-32 text-text">
        <Container size="sm">
          <Card className="p-8 sm:p-12 text-center border-border/80 bg-surface-card/90 shadow-2xl backdrop-blur-xl max-w-xl mx-auto">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mx-auto mb-6 animate-in zoom-in-50 duration-300">
              <CheckCircle2 className="h-8 w-8" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Inquiry Received Successfully!
            </h1>

            <p className="text-base text-text-muted leading-relaxed max-w-md mx-auto mb-6">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>. We have logged your request. Our engineering team will review your requirements and respond to <span className="text-[#38B2D8] font-medium">{formData.email}</span> within 24 hours.
            </p>

            {formData.performances.length > 0 && (
              <div className="mb-8 p-4 rounded-xl bg-surface border border-border text-left">
                <p className="text-xs font-mono text-[#7A8FA6] uppercase tracking-wider mb-2 font-semibold">
                  Selected Services & Topics:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.performances.map((item) => (
                    <span key={item} className="inline-flex items-center gap-1 rounded-md bg-[#1E5FBF]/15 border border-[#38B2D8]/40 px-2.5 py-1 text-xs text-[#38B2D8] font-medium">
                      <Sparkles className="h-3 w-3" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              onClick={() => {
                setFormData(INITIAL_FORM);
                setIsSubmitted(false);
              }}
              variant="primary"
              size="md"
              className="w-full sm:w-auto"
            >
              Submit Another Inquiry
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-12 lg:py-20 text-text">
      <Container size="md">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <Badge variant="default" className="mb-4 gap-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            GET IN TOUCH
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Let&apos;s build your system.
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            Tell us about your project or operational requirements. One of our team members will analyze your needs and respond with clear architectural feedback within 24 hours.
          </p>
        </div>

        {/* Form Container */}
        <Card className="p-6 sm:p-10 border-border/80 bg-surface-card/90 shadow-2xl backdrop-blur-xl max-w-2xl mx-auto">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Anti-Spam Honeypot Trap (Hidden from human users) */}
            <div className="hidden" aria-hidden="true">
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website_hp || ''}
                onChange={(e) => setFormData((prev) => ({ ...prev, website_hp: e.target.value }))}
              />
            </div>

            {/* 1. Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Full Name <span className="text-[#1E5FBF]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="text"
                  id="name"
                  required
                  disabled={isSubmitting}
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* 2. E-Mail */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Work E-mail <span className="text-[#1E5FBF]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="email"
                  id="email"
                  required
                  disabled={isSubmitting}
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* 3. Phone (Country Selector + Phone Input) */}
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Phone Number
              </label>
              <div className="flex gap-2">
                {/* Country Code Select */}
                <div className="relative w-28 sm:w-36 flex-shrink-0">
                  <select
                    value={formData.countryCode}
                    disabled={isSubmitting}
                    onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                    aria-label="Country Dial Code"
                    className="w-full px-3 py-3 bg-surface border border-border rounded-xl text-white focus:border-[#1E5FBF] focus:outline-none transition-colors text-xs font-mono appearance-none cursor-pointer disabled:opacity-50"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.country}-${c.code}`} value={c.code} className="bg-[#0D1826] text-white">
                        {c.flag} {c.country} ({c.code})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 text-xs">
                    ▼
                  </div>
                </div>

                {/* Phone Number Input */}
                <div className="relative flex-1">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                  <input
                    type="tel"
                    id="phone"
                    disabled={isSubmitting}
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="01512 3456789"
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm font-mono disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* 4. Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Company Name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="text"
                  id="company"
                  disabled={isSubmitting}
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g. Acme Corp GmbH"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                />
              </div>
            </div>

            {/* 5. Services & Systems of Interest (Categories Selection) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                  Services &amp; Systems of Interest:
                </label>
                <span className="text-[11px] font-mono text-text-light">Select all that apply</span>
              </div>
              <div className="space-y-2.5">
                {PERFORMANCE_OPTIONS.map((opt) => {
                  const isSelected = formData.performances.includes(opt.id);
                  const Icon = CONTACT_ICON_MAP[opt.iconName] || Globe;

                  return (
                    <label
                      key={opt.id}
                      onClick={() => !isSubmitting && togglePerformance(opt.id)}
                      className={`flex items-start gap-3.5 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E5FBF]/15 border-[#38B2D8] text-white shadow-sm'
                          : 'bg-surface border-border text-text-muted hover:border-border/80 hover:text-white'
                      } ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`}
                    >
                      <div
                        className={`flex h-5 w-5 mt-0.5 items-center justify-center rounded-md border transition-colors flex-shrink-0 ${
                          isSelected
                            ? 'bg-[#1E5FBF] border-[#38B2D8] text-white'
                            : 'border-border bg-[#0D1826]'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </div>

                      <Icon className={`h-4 w-4 mt-1 flex-shrink-0 ${isSelected ? 'text-[#38B2D8]' : 'text-text-muted/60'}`} />

                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">{opt.label}</span>
                        <span className="text-xs text-text-muted leading-tight block mt-0.5">{opt.description}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 6. Message / Project Overview */}
            <div>
              <label htmlFor="news" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Project Overview &amp; Requirements:
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted/60" />
                <textarea
                  id="news"
                  rows={4}
                  disabled={isSubmitting}
                  value={formData.news}
                  onChange={(e) => setFormData((prev) => ({ ...prev, news: e.target.value }))}
                  placeholder="Tell us about your systems, current operational friction, or desired deliverables..."
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm resize-none disabled:opacity-50"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 font-bold py-3.5 disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </Container>
    </div>
  );
}

export default function ContactPage() {
  return (
    <React.Suspense
      fallback={
        <div className="py-20 text-center text-text-muted font-mono text-sm">
          Loading contact form...
        </div>
      }
    >
      <ContactFormContent />
    </React.Suspense>
  );
}
