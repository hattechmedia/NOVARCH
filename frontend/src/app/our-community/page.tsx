'use client';

import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  CheckCircle2,
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Building,
  Briefcase,
  Users,
  Zap,
  Globe,
  Code2,
  Shield,
  ArrowRight,
} from 'lucide-react';
import { COUNTRY_CODES } from '@/data/contact';

const INTEREST_OPTIONS = [
  { id: 'AI & Automation', label: 'AI & Automation', description: 'Applied AI, automated workflows, intelligent pipelines' },
  { id: 'Web & Digital Presence', label: 'Web & Digital Presence', description: 'Digital launch, websites, conversion-ready presence' },
  { id: 'Custom Software', label: 'Custom Software', description: 'Bespoke applications, APIs, multi-tier platforms' },
  { id: 'Systems Architecture', label: 'Systems Architecture', description: 'Strategic tech review, infrastructure & advisory' },
  { id: 'Integrations', label: 'Integrations', description: 'Connecting tools, data pipelines, business handoffs' },
  { id: 'Open Source & Research', label: 'Open Source & Research', description: 'Contributing to open-source projects and research' },
];

const BENEFITS = [
  {
    icon: Zap,
    title: 'Early Access',
    desc: 'Get first access to NOVARCH tools, frameworks, and internal builds before public release.',
  },
  {
    icon: Globe,
    title: 'Global Network',
    desc: 'Connect with engineers, founders, and operators building systems that actually scale.',
  },
  {
    icon: Code2,
    title: 'Collaborate & Build',
    desc: 'Contribute to real projects, co-author research, or co-build with the core team.',
  },
  {
    icon: Shield,
    title: 'Trusted Circle',
    desc: 'Be part of a deliberate, high-signal community — no noise, no spam, no fluff.',
  },
];

interface CommunityFormData {
  fullName: string;
  email: string;
  countryCode: string;
  contactNumber: string;
  organization: string;
  role: string;
  interests: string[];
  message: string;
  website_hp: string;
}

const INITIAL_FORM: CommunityFormData = {
  fullName: '',
  email: '',
  countryCode: '+49',
  contactNumber: '',
  organization: '',
  role: '',
  interests: [],
  message: '',
  website_hp: '',
};

function CommunityFormContent() {
  const [formData, setFormData] = React.useState<CommunityFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  const toggleInterest = (option: string) => {
    setFormData((prev) => {
      const exists = prev.interests.includes(option);
      return {
        ...prev,
        interests: exists
          ? prev.interests.filter((item) => item !== option)
          : [...prev.interests, option],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');

    const trimmedName = formData.fullName.trim();
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
      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fullName: trimmedName,
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
              Welcome to NOVARCH Community!
            </h1>

            <p className="text-base text-text-muted leading-relaxed max-w-md mx-auto mb-6">
              Thank you, <span className="text-white font-semibold">{formData.fullName}</span>. Your application has been received. We will review your profile and reach out to{' '}
              <span className="text-[#38B2D8] font-medium">{formData.email}</span> soon.
            </p>

            {formData.interests.length > 0 && (
              <div className="mb-8 p-4 rounded-xl bg-surface border border-border text-left">
                <p className="text-xs font-mono text-[#7A8FA6] uppercase tracking-wider mb-2 font-semibold">
                  Your Areas of Interest:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {formData.interests.map((item) => (
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
              Submit Another Application
            </Button>
          </Card>
        </Container>
      </div>
    );
  }

  return (
    <div className="relative py-12 lg:py-20 text-text overflow-hidden">
      {/* Full-section background image — community network / global tech theme */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/community-form-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.12,
        }}
      />
      {/* Subtle radial glow overlay to keep the dark NOVARCH feel */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(30,95,191,0.18) 0%, rgba(7,13,23,0.0) 70%), linear-gradient(180deg, rgba(7,13,23,0.55) 0%, rgba(7,13,23,0.0) 40%, rgba(7,13,23,0.55) 100%)',
        }}
      />

      <Container size="lg">

        {/* Page Badge + Headline — centered above both columns */}
        <div className="relative z-10 text-center mb-12">
          {/* <Badge variant="default" className="mb-4 gap-1.5">
            <Users className="h-3.5 w-3.5" />
            OUR COMMUNITY
          </Badge> */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Join the NOVARCH community.
          </h1>
          {/* <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
            Connect with builders, innovators, and operators shaping the future of digital infrastructure.
          </p> */}
        </div>

        {/* Two-column layout */}
        <div
          className="relative z-10 items-start"
          style={{ display: 'grid', gridTemplateColumns: '420px 1fr', gap: '3rem' }}
        >

          {/* ── LEFT: Why join copy ── */}
          <div className="space-y-8" style={{ paddingLeft: '1rem' }}>
            {/* Intro text */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                Why become part of<br />
                <span className="text-[#38B2D8]">NOVARCH?</span>
              </h2>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base">
                NOVARCH is more than a services company — it&apos;s a growing network of people who believe that software, AI, and systems architecture should be deliberate, controlled, and built to last.
              </p>
              <p className="text-text-muted leading-relaxed text-sm sm:text-base mt-3">
                When you join our community, you&apos;re not signing up for a newsletter. You&apos;re stepping into a curated circle of builders who move fast, think carefully, and build things that matter.
              </p>
            </div>

            {/* Benefit cards */}
            <div className="space-y-3">
              {BENEFITS.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.title}
                    className="flex items-start gap-4 p-4 rounded-xl border border-border/60 bg-surface-card/50 hover:border-[#38B2D8]/30 hover:bg-surface-card/80 transition-all duration-200"
                  >
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-[#1E5FBF]/15 border border-[#38B2D8]/20">
                      <Icon className="h-4 w-4 text-[#38B2D8]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white mb-0.5">{b.title}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social proof strip */}
            <div className="rounded-xl border border-[#38B2D8]/20 bg-[#1E5FBF]/08 p-4 flex items-center gap-3">
              <div className="flex -space-x-2 flex-shrink-0">
                {['N', 'A', 'V'].map((l) => (
                  <div
                    key={l}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#1E5FBF] to-[#38B2D8] border-2 border-[#070D17] text-white font-bold text-xs"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted leading-relaxed">
                <span className="text-white font-semibold">Engineers, founders & operators</span> from across Europe and beyond are already part of NOVARCH.
              </p>
            </div>

            {/* CTA note */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#64748B]">
              <ArrowRight className="h-3.5 w-3.5 text-[#38B2D8]" />
              <span>Fill out the form — our team reviews every application personally.</span>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div style={{ paddingLeft: '3rem' }}>
            <div className="relative rounded-2xl overflow-hidden">
              {/* Background image — Earth city lights (global community network) */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  backgroundImage: "url('/images/community-form-bg.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  opacity: 0.35,
                }}
              />
              {/* Dark overlay so form inputs stay readable */}
              <div
                className="absolute inset-0 z-0"
                style={{ background: 'linear-gradient(135deg, rgba(5,10,18,0.75) 0%, rgba(7,16,30,0.65) 100%)' }}
              />
              <div className="relative z-10">
            <Card className="p-6 sm:p-8 border-border/80 bg-surface-card/80 shadow-2xl backdrop-blur-xl">
              {errorMsg && (
                <div className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Anti-Spam Honeypot */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website_hp}
                    onChange={(e) => setFormData((prev) => ({ ...prev, website_hp: e.target.value }))}
                  />
                </div>

                {/* Row 1: Full Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                      Full Name <span className="text-[#1E5FBF]">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                      <input
                        type="text"
                        id="fullName"
                        required
                        disabled={isSubmitting}
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        placeholder="Your full name"
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                      Email <span className="text-[#1E5FBF]">*</span>
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
                </div>

                {/* Row 2: Phone */}
                <div>
                  <label htmlFor="contactNumber" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
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
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted/60 text-xs">▼</div>
                    </div>
                    <div className="relative flex-1">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                      <input
                        type="tel"
                        id="contactNumber"
                        disabled={isSubmitting}
                        value={formData.contactNumber}
                        onChange={(e) => setFormData((prev) => ({ ...prev, contactNumber: e.target.value }))}
                        placeholder="01512 3456789"
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm font-mono disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 3: Organization + Role */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="organization" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                      Organization
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                      <input
                        type="text"
                        id="organization"
                        disabled={isSubmitting}
                        value={formData.organization}
                        onChange={(e) => setFormData((prev) => ({ ...prev, organization: e.target.value }))}
                        placeholder="e.g. Acme Corp GmbH"
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                      Your Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                      <input
                        type="text"
                        id="role"
                        disabled={isSubmitting}
                        value={formData.role}
                        onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                        placeholder="Founder, Engineer, Designer"
                        className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Areas of Interest */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted">
                      Areas of Interest
                    </label>
                    <span className="text-[11px] font-mono text-text-light">Select all that apply</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {INTEREST_OPTIONS.map((opt) => {
                      const isSelected = formData.interests.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          onClick={() => !isSubmitting && toggleInterest(opt.id)}
                          className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-[#1E5FBF]/15 border-[#38B2D8] text-white shadow-sm'
                              : 'bg-surface border-border text-text-muted hover:border-border/80 hover:text-white'
                          } ${isSubmitting ? 'pointer-events-none opacity-60' : ''}`}
                        >
                          <div
                            className={`flex h-4 w-4 mt-0.5 items-center justify-center rounded border transition-colors flex-shrink-0 ${
                              isSelected
                                ? 'bg-[#1E5FBF] border-[#38B2D8] text-white'
                                : 'border-border bg-[#0D1826]'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-semibold text-white block leading-tight">{opt.label}</span>
                            <span className="text-[11px] text-text-muted leading-tight block mt-0.5 truncate">{opt.description}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-text-muted mb-2">
                    Message / Introduction
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-text-muted/60" />
                    <textarea
                      id="message"
                      rows={3}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us about yourself, your background, or what you'd like to build with NOVARCH..."
                      className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-xl text-white placeholder-text-muted/40 focus:border-[#1E5FBF] focus:outline-none transition-colors text-sm resize-none disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-1">
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
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Join the Community</span>
                      </>
                    )}
                  </Button>
                  <p className="text-center text-xs text-text-muted mt-3 font-mono">
                    We review every application personally. No spam, ever.
  				        </p>
                </div>
              </form>
              </Card>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function OurCommunityPage() {
  return <CommunityFormContent />;
}
