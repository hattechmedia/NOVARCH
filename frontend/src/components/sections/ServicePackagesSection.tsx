'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Service, ServicePackage } from '@/types/service';
import { ServicePackageModal } from '@/components/ui/ServicePackageModal';
import {
  Sparkles,
  ArrowRight,
  Clock,
  Zap,
  Check,
  Cpu,
} from 'lucide-react';

interface ServicePackagesSectionProps {
  service: Service;
}

export function ServicePackagesSection({ service }: ServicePackagesSectionProps) {
  const { basic, premium } = service.packages;
  const [selectedPackage, setSelectedPackage] = React.useState<ServicePackage | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);

  // Fallback image map
  const imageMap: Record<string, string> = {
    'digital-launch': '/images/packages/digital-launch.jpg',
    'automation-integration': '/images/packages/automation-integration.jpg',
    'ai-workflow': '/images/packages/ai-workflow.jpg',
    'custom-software': '/images/packages/custom-software.jpg',
  };
  const serviceImage = imageMap[service.slug] || '/images/packages/digital-launch.jpg';

  // Track scroll progress inside the 240vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth spring physics for 60fps responsive motion
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // Card 1 transforms: starts at 0% (in view), slides left and fades out as user scrolls
  const card1X = useTransform(smoothProgress, [0.15, 0.8], ['0%', '-120%']);
  const card1Opacity = useTransform(smoothProgress, [0.15, 0.75], [1, 0]);
  const card1Scale = useTransform(smoothProgress, [0.15, 0.75], [1, 0.94]);

  // Card 2 transforms: starts at 120% (completely off-screen right), slides in to 0% and fades in
  const card2X = useTransform(smoothProgress, [0.2, 0.85], ['120%', '0%']);
  const card2Opacity = useTransform(smoothProgress, [0.2, 0.75], [0, 1]);
  const card2Scale = useTransform(smoothProgress, [0.2, 0.85], [0.94, 1]);

  const handleOpenModal = (pkg: ServicePackage) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div
      ref={containerRef}
      id="packages"
      className="relative h-[240vh] bg-[#040811] border-y border-[#17304E]/80"
    >
      {/* ── Sticky Viewport ────────────────────────────────────────────── */}
      <div className="sticky top-20 sm:top-22 h-[calc(100vh-5rem)] sm:h-[calc(100vh-5.5rem)] w-full flex flex-col p-4 sm:p-6 overflow-hidden">
        {/* Background ambient lighting glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#1E5FBF]/12 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[350px] bg-[#38B2D8]/10 blur-[160px] pointer-events-none" />

        {/* ── Cards: Full Viewport ─────────────────────────────────────── */}
        <div className="relative z-10 w-full flex-1 min-h-0 px-0 flex items-center justify-center">
          <div className="relative w-full max-w-5xl h-full">
            
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ── CARD 1: BASIC PLAN (Initially in Center) ─────────────── */}
            {/* ═══════════════════════════════════════════════════════════ */}
            <motion.div
              style={{
                x: card1X,
                opacity: card1Opacity,
                scale: card1Scale,
              }}
              className="absolute inset-0 w-full rounded-3xl border border-[#1E3A5F] bg-gradient-to-br from-[#09121F]/98 via-[#060D17]/98 to-[#040810] shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl"
            >
              {/* Top subtle line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#1E5FBF] to-transparent opacity-80" />

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                {/* Left Side: Rich Generated Image with HUD overlay */}
                <div className="lg:col-span-5 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#17304E]/80 min-h-[180px] lg:min-h-full">
                  <Image
                    src={serviceImage}
                    alt={`${service.name} Basic Package`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Dark gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#070D18]/90 via-[#070D18]/40 to-transparent" />

                  {/* Corner Glassmorphic HUD Badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#070D18]/85 border border-[#17304E] px-2.5 py-1 text-[10px] font-mono font-bold text-white shadow-md backdrop-blur-md">
                      <Cpu className="h-3.5 w-3.5 text-[#38B2D8]" />
                      BASIC ARCHITECTURE
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="rounded-xl bg-[#070D18]/90 border border-[#17304E] px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                      <span className="text-[10px] font-mono uppercase text-[#7A8FA6] block">Fixed Scope</span>
                      <span className="text-xl font-mono font-extrabold text-white">{basic.price} <span className="text-[11px] font-normal text-[#94A3B8]">excl. VAT</span></span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Package Details, 2-Col Bullets & CTA */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Badge + Timeline */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#17304E] text-xs font-mono font-semibold text-[#CBD5E1] border border-[#17304E]">
                        Basic Plan
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-[#7A8FA6]">
                        <Clock className="h-3.5 w-3.5 text-[#38B2D8]" />
                        {basic.timeline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                      {basic.name} — <span className="text-[#38B2D8]">Foundation</span>
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                      {basic.description} Fixed scope, guaranteed milestones, and 100% intellectual property handover.
                    </p>

                    {/* 2-Column Features List */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#38B2D8] block mb-2.5">
                        Included in Basic Plan:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {basic.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-[#38B2D8] flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-[#CBD5E1] font-medium leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-[#17304E]">
                    <Button
                      onClick={() => handleOpenModal(basic)}
                      variant="secondary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 font-bold py-3 text-xs sm:text-sm group cursor-pointer"
                    >
                      <span>Book {basic.name} — {basic.price}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════════ */}
            {/* ── CARD 2: PREMIUM PLAN (Hidden off-screen until scroll) ── */}
            {/* ═══════════════════════════════════════════════════════════ */}
            {/* Most Popular Badge — outside overflow-hidden card so it's not clipped */}
            <motion.div
              style={{
                x: card2X,
                opacity: card2Opacity,
              }}
              className="absolute top-0 right-0 z-30"
            >
              <div className="rounded-bl-xl bg-gradient-to-r from-[#1E5FBF] to-[#38B2D8] px-4 py-1.5 text-[11px] font-mono font-bold text-white uppercase tracking-wider shadow-md">
                Enterprise Scope
              </div>
            </motion.div>

            <motion.div
              style={{
                x: card2X,
                opacity: card2Opacity,
                scale: card2Scale,
              }}
              className="absolute inset-0 w-full rounded-3xl border border-[#38B2D8]/60 bg-gradient-to-br from-[#0F2238]/98 via-[#0C1A2E]/98 to-[#070D17] shadow-2xl shadow-[#1E5FBF]/25 overflow-hidden backdrop-blur-xl ring-1 ring-[#38B2D8]/30"
            >
              {/* Top glowing line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#38B2D8] to-transparent opacity-100" />

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full items-stretch">
                {/* Left Side: Rich Generated Image with HUD overlay */}
                <div className="lg:col-span-5 relative overflow-hidden border-b lg:border-b-0 lg:border-r border-[#1E3A5F] min-h-[180px] lg:min-h-full">
                  <Image
                    src={serviceImage}
                    alt={`${service.name} Premium Package`}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                  {/* Dark gradient overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0C1A2E]/90 via-[#0C1A2E]/40 to-transparent" />

                  {/* Corner Glassmorphic HUD Badges */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A1626]/85 border border-[#38B2D8]/40 px-2.5 py-1 text-[10px] font-mono font-bold text-[#38B2D8] shadow-md backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                      ENTERPRISE SPEC
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="rounded-xl bg-[#0A1626]/90 border border-[#38B2D8]/40 px-3.5 py-1.5 shadow-lg backdrop-blur-md">
                      <span className="text-[10px] font-mono uppercase text-[#7A8FA6] block">Implementation</span>
                      <span className="text-xl font-mono font-extrabold text-emerald-400">{premium.price} <span className="text-[11px] font-normal text-[#94A3B8]">excl. VAT</span></span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Package Details, 2-Col Bullets & CTA */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                  <div>
                    {/* Badge + Timeline */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1E5FBF]/25 text-xs font-mono font-semibold text-[#38B2D8] border border-[#38B2D8]/50">
                        <Sparkles className="h-3.5 w-3.5" />
                        Implementation Plan
                      </span>
                      <span className="flex items-center gap-1 text-xs font-mono text-[#CBD5E1]">
                        <Clock className="h-3.5 w-3.5 text-emerald-400" />
                        {premium.timeline}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
                      {premium.name} — <span className="text-[#38B2D8]">Custom Scope</span>
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed mb-4">
                      {premium.description}
                    </p>

                    {/* 2-Column Features List */}
                    <div className="mb-4">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-2.5">
                        Includes:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                        {premium.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-white font-medium leading-tight">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 border-t border-[#17304E]">
                    <Button
                      onClick={() => handleOpenModal(premium)}
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2 font-bold py-3 text-xs sm:text-sm shadow-xl shadow-[#1E5FBF]/30 group cursor-pointer"
                    >
                      <Zap className="h-4 w-4" />
                      <span>Request Scope Qualification — {premium.price}</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Avail Now Intake Modal */}
      <ServicePackageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceName={service.name}
        pkg={selectedPackage}
      />
    </div>
  );
}
