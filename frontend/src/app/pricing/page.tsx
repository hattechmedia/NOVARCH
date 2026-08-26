import * as React from 'react';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { ServicesSection } from '@/components/sections/Services';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Service Packages & Pricing | NOVARCH Architecture Engine',
  description: 'Explore clear, fixed-price Launch Blueprints and tailored implementation options.',
};

export default function PricingPage() {
  return (
    <main className="py-16 sm:py-24 bg-[#050A12] min-h-screen text-white">
      <Container className="mb-12 text-center max-w-3xl">
        <Badge variant="default" className="mb-4">
          Transparent Pricing & Architecture Scope
        </Badge>

        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
          Simple, Fixed Blueprints & <span className="text-[#38B2D8]">Scoped Implementations</span>
        </h1>

        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed mb-8">
          Start with a fixed-fee Launch Blueprint for immediate architectural clarity, or request a qualified scope evaluation for enterprise system implementation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[#CBD5E1]">
          <span className="flex items-center gap-1.5 rounded-full bg-[#0B1524] border border-[#17304E] px-3.5 py-1.5">
            <ShieldCheck className="h-4 w-4 text-[#38B2D8]" />
            Launch Blueprint: €490 – €1,500 One-time
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[#0B1524] border border-[#17304E] px-3.5 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Implementation: Scoped after qualification
          </span>
        </div>
      </Container>

      {/* Services and Pricing Cards Overview */}
      <ServicesSection />
    </main>
  );
}
