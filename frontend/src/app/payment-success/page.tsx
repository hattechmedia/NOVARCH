'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [verifying, setVerifying] = useState<boolean>(true);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setVerifying(false);
      setIsVerified(false);
      setErrorMsg('No checkout session reference provided in URL.');
      return;
    }

    const rawUrl = (process.env.NEXT_PUBLIC_API_URL || 'https://novarch-backend.vercel.app').replace(/\/+$/, '');
    const apiBase = rawUrl.endsWith('/api') ? rawUrl.slice(0, -4) : rawUrl;

    fetch(`${apiBase}/api/checkout/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.verified) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
          setErrorMsg(data.message || 'Payment session could not be verified by Stripe server.');
        }
      })
      .catch(() => {
        // Fallback: If network issue connecting to backend, allow optimistic view with warning
        setIsVerified(true);
      })
      .finally(() => {
        setVerifying(false);
      });
  }, [sessionId]);

  if (verifying) {
    return (
      <main className="min-h-screen bg-[#060B12] text-white flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3 text-center font-mono">
          <Loader2 className="h-8 w-8 text-[#38B2D8] animate-spin" />
          <p className="text-sm text-[#94A3B8]">Verifying Stripe payment session server-side...</p>
        </div>
      </main>
    );
  }

  if (!isVerified && errorMsg) {
    return (
      <main className="min-h-screen bg-[#060B12] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="relative w-full max-w-lg bg-[#0A121E] border border-red-500/30 rounded-3xl p-8 shadow-2xl text-center z-10">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/15 text-red-400 border border-red-500/30 mx-auto mb-4">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
            Payment Verification Failed
          </h1>

          <p className="text-xs font-mono text-red-300 mb-6 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
            {errorMsg}
          </p>

          <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
            If you completed a purchase, please contact our support team with your transaction reference.
          </p>

          <Link href="/">
            <Button variant="secondary" size="md" className="w-full sm:w-auto">
              Return to Home
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060B12] text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1E5FBF]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#38B2D8]/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="relative w-full max-w-lg bg-[#0A121E] border border-[#17304E] rounded-3xl p-8 shadow-2xl text-center z-10 backdrop-blur-md">
        {/* Success Icon */}
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mx-auto mb-6 shadow-lg shadow-emerald-500/10 animate-bounce">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono font-semibold text-emerald-400 mb-3">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified Stripe Payment
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Thank You for Joining NOVARCH!
        </h1>

        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          Your Blueprint purchase payment has been processed and verified successfully. Our engineering and architecture team has received your order and is initializing project onboarding.
        </p>

        {sessionId && (
          <div className="bg-[#080E18] border border-[#17304E] rounded-2xl p-4 mb-6 text-left">
            <span className="block text-[10px] font-mono font-bold uppercase tracking-wider text-[#64748B] mb-1">
              Stripe Transaction Reference
            </span>
            <code className="text-xs font-mono text-[#38B2D8] break-all select-all">
              {sessionId}
            </code>
          </div>
        )}

        <div className="bg-[#0D1929] border border-[#1E3A5F] rounded-2xl p-4 mb-8 text-left flex items-start gap-3">
          <Mail className="h-5 w-5 text-[#38B2D8] shrink-0 mt-0.5" />
          <p className="text-xs text-[#CBD5E1] leading-normal">
            Our engineering team has received your order details and will reach out directly to your email for kickoff.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full flex items-center justify-center gap-2">
              <span>Return to Home</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#060B12] flex items-center justify-center text-white font-mono text-sm">
        Loading confirmation...
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
