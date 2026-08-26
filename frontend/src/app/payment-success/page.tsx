'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

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
          <ShieldCheck className="h-3.5 w-3.5" /> Payment Successful
        </span>

        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Thank You for Joining NOVARCH!
        </h1>

        <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
          Your Blueprint purchase payment has been processed successfully. Our engineering and architecture team has received your order and is initializing project onboarding.
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
