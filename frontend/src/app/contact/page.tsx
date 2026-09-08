'use client';

import * as React from 'react';
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
  Layers,
  Shield,
  FileCheck,
  Server,
  GraduationCap,
} from 'lucide-react';
import { ContactFormData, PerformanceOption } from '@/types/form';

const PERFORMANCE_OPTIONS: { id: PerformanceOption; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'Technical Editorial Department', label: 'Technical Editorial Department', icon: FileCheck },
  { id: 'CE conformity', label: 'CE conformity', icon: Shield },
  { id: 'IT systems house', label: 'IT systems house', icon: Server },
  { id: 'Information security', label: 'Information security', icon: Shield },
  { id: 'Continuing education', label: 'Continuing education', icon: GraduationCap },
];

const COUNTRY_CODES = [
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+39', country: 'Italy', flag: '🇮🇹' },
  { code: '+34', country: 'Spain', flag: '🇪🇸' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
];

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

export default function ContactPage() {
  const [formData, setFormData] = React.useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

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
          name: trimmedName,
          email: trimmedEmail,
        }),
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
            Contact form
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Contact form
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed">
            If you are interested in our services, please use our contact form to submit your inquiry. One of our team members will get in touch with you as soon as possible.
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
            <div className="hidden aria-hidden=true">
              <input
                type="text"
                name="website_hp"
                tabIndex={-1}
                autoComplete="off"
                value={(formData as any).website_hp || ''}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, website_hp: e.target.value }))}
              />
            </div>

            {/* 1. Name */}
            <div>
              <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Name <span className="text-[#1E5FBF]">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* 2. E-Mail */}
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                E-mail <span className="text-[#1E5FBF]">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* 3. Phone (Country Selector + Phone Input) */}
            <div>
              <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Phone
              </label>
              <div className="flex gap-2">
                {/* Country Code Select */}
                <div className="relative w-28 sm:w-36 flex-shrink-0">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                    aria-label="Country Dial Code"
                    className="w-full px-3 py-3 bg-surface border border-border rounded-xl text-white focus:border-[#1E5FBF] focus:outline-none transition-colors text-xs font-mono appearance-none cursor-pointer"
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
                    value={formData.phone}
                    onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="01512 3456789"
                    className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm font-mono"
                  />
                </div>
              </div>
            </div>

            {/* 4. Company Name */}
            <div>
              <label htmlFor="company" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                Company name
              </label>
              <div className="relative">
                <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                  placeholder="e.g. Acme Corp GmbH"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* 5. Performance (Categories Selection) */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-3">
                Performance:
              </label>
              <div className="space-y-2.5">
                {PERFORMANCE_OPTIONS.map((opt) => {
                  const isSelected = formData.performances.includes(opt.id);
                  const Icon = opt.icon;

                  return (
                    <label
                      key={opt.id}
                      onClick={() => togglePerformance(opt.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#1E5FBF]/15 border-[#38B2D8] text-white shadow-sm'
                          : 'bg-surface border-border text-text-muted hover:border-border/80 hover:text-white'
                      }`}
                    >
                      <div
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                          isSelected
                            ? 'bg-[#1E5FBF] border-[#38B2D8] text-white'
                            : 'border-border bg-[#0D1826]'
                        }`}
                      >
                        {isSelected && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                      </div>

                      <Icon className={`h-4 w-4 ${isSelected ? 'text-[#38B2D8]' : 'text-text-muted/60'}`} />

                      <span className="text-sm font-medium">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 6. News (Optional Message) */}
            <div>
              <label htmlFor="news" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                News:
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted/60" />
                <textarea
                  id="news"
                  rows={4}
                  value={formData.news}
                  onChange={(e) => setFormData((prev) => ({ ...prev, news: e.target.value }))}
                  placeholder="Optional"
                  className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm resize-none"
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
                className="w-full flex items-center justify-center gap-2 font-bold py-3.5"
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
