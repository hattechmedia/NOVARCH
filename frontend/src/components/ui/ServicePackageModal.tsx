'use client';

import * as React from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Sparkles,
  CreditCard,
  Building,
  User,
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';
import { Button } from './Button';
import { ServicePackage } from '@/types/service';

interface ServicePackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  pkg: ServicePackage | null;
}

const COUNTRY_CODES = [
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
  { code: '+43', country: 'Austria', flag: '🇦🇹' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
];

export function ServicePackageModal({
  isOpen,
  onClose,
  serviceName,
  pkg,
}: ServicePackageModalProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    countryCode: '+49',
    phone: '',
    company: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');

  if (!isOpen || !pkg) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and e-mail address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedPhone = formData.phone
        ? `${formData.countryCode} ${formData.phone}`
        : undefined;

      const payload = {
        submissionType: 'service_lead',
        preferredService: serviceName,
        serviceName: serviceName,
        packageName: pkg.name,
        tier: pkg.tier,
        price: pkg.price,
        estimatedValue: pkg.priceNumber,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formattedPhone,
        userCompany: formData.company || undefined,
        userNotes: formData.notes || undefined,
      };

      const isImplementationScope = pkg.tier === 'Premium' || pkg.price.toLowerCase().includes('from');

      // 1. Record lead inquiry
      const resContact = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          planName: pkg.name,
          planTier: pkg.tier,
          planPrice: pkg.price,
          estimatedValue: pkg.priceNumber,
          name: formData.name,
          email: formData.email,
          phone: formattedPhone,
          company: formData.company || undefined,
          message: formData.notes || `${isImplementationScope ? 'Scope qualification request' : 'Package booking'} for ${serviceName} - ${pkg.name} (${pkg.price})`,
        }),
      });

      if (isImplementationScope) {
        // Implementation comes after qualification & scope: do not create blind checkout product
        setIsSubmitted(true);
        setIsSubmitting(false);
        return;
      }

      // 2. Initiate Stripe Checkout Session for Basic Blueprint Plans
      const apiBase = (process.env.NEXT_PUBLIC_API_URL || 'https://novarch-backend.vercel.app').replace(/\/+$/, '');
      const res = await fetch(`${apiBase}/api/checkout/create-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to initiate Stripe Checkout');

      if (json.url) {
        // Redirect client to Stripe Hosted Checkout
        window.location.href = json.url;
      } else {
        setIsSubmitted(true);
      }
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in select-none">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0A121E] border border-[#17304E] p-6 sm:p-8 shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-lg p-2 text-[#7A8FA6] hover:bg-[#17304E] hover:text-white transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mx-auto mb-4">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Subscription Request Received!
            </h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
              You selected <span className="text-white font-semibold">{pkg.name}</span> for{' '}
              <span className="text-[#38B2D8] font-semibold">{serviceName}</span> ({pkg.price}). Our architecture team will contact you within 24 hours with project kickoff materials.
            </p>

            <Button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              variant="primary"
              size="md"
              className="w-full"
            >
              Done
            </Button>
          </div>
        ) : (
          <div>
            {/* Header / Package Badge */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1E5FBF]/20 border border-[#38B2D8]/50 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-[#38B2D8]">
                  <Sparkles className="h-3 w-3" />
                  {pkg.tier} Package
                </span>
                <span className="text-xs font-mono text-[#64748B]">{serviceName}</span>
              </div>

              <div className="flex items-baseline justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight">{pkg.name}</h2>
                <span className="text-xl font-bold font-mono text-emerald-400">{pkg.price}</span>
              </div>

              <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">{pkg.description}</p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#7A8FA6] mb-1.5">
                  Full Name <span className="text-[#38B2D8]">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080E18] border border-[#17304E] rounded-xl text-white placeholder-[#64748B] focus:border-[#38B2D8] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#7A8FA6] mb-1.5">
                  Work E-Mail <span className="text-[#38B2D8]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080E18] border border-[#17304E] rounded-xl text-white placeholder-[#64748B] focus:border-[#38B2D8] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Phone + Country */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#7A8FA6] mb-1.5">
                  Phone Number
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData((prev) => ({ ...prev, countryCode: e.target.value }))}
                    className="w-32 px-2 py-2.5 bg-[#080E18] border border-[#17304E] rounded-xl text-white focus:border-[#38B2D8] focus:outline-none text-[11px] font-mono cursor-pointer"
                  >
                    {COUNTRY_CODES.map((c) => (
                      <option key={`${c.country}-${c.code}`} value={c.code} className="bg-[#0D1826] text-white">
                        {c.flag} {c.code}
                      </option>
                    ))}
                  </select>
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="01512 3456789"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#080E18] border border-[#17304E] rounded-xl text-white placeholder-[#64748B] focus:border-[#38B2D8] focus:outline-none text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#7A8FA6] mb-1.5">
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                    placeholder="e.g. Acme Corp GmbH"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#080E18] border border-[#17304E] rounded-xl text-white placeholder-[#64748B] focus:border-[#38B2D8] focus:outline-none text-xs"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#7A8FA6] mb-1.5">
                  Project Notes / Requirements (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-3.5 w-3.5 text-[#64748B]" />
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific tools, deadlines or requirements..."
                    className="w-full pl-9 pr-3 py-2 bg-[#080E18] border border-[#17304E] rounded-xl text-white placeholder-[#64748B] focus:border-[#38B2D8] focus:outline-none text-xs resize-none"
                  />
                </div>
              </div>

              {/* Indicator Badge */}
              <div className="rounded-xl bg-[#080E18] border border-[#17304E] p-3 flex items-center justify-between text-[11px] font-mono text-[#7A8FA6]">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-[#38B2D8]" />
                  <span>{pkg.tier === 'Basic' ? 'Stripe Instant Checkout' : 'Scope Qualification Request'}</span>
                </div>
                <span className="flex items-center gap-1 text-emerald-400 text-[10px]">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {pkg.tier === 'Basic' ? '256-Bit SSL Encrypted' : 'Qualified Architecture Scope'}
                </span>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 font-bold py-3 text-xs bg-gradient-to-r from-[#1E5FBF] to-[#38B2D8] text-white shadow-lg shadow-[#1E5FBF]/25 hover:opacity-95"
                >
                  {pkg.tier === 'Basic' ? <CreditCard className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  <span>
                    {isSubmitting
                      ? (pkg.tier === 'Basic' ? 'Redirecting to Stripe...' : 'Submitting Request...')
                      : (pkg.tier === 'Basic' ? `Pay & Subscribe — ${pkg.price}` : `Request Scope Qualification — ${pkg.price}`)}
                  </span>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
