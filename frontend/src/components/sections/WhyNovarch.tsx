'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/animations/Reveal';
import {
  Briefcase,
  Wrench,
  ShieldCheck,
  KeyRound,
  UserCheck,
  Globe2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';

const DIFFERENTIATORS = [
  {
    num: '01',
    title: 'Business context before complexity',
    description:
      'Connect the system to a customer, workflow and economic reason before writing any code.',
    icon: Briefcase,
    image: '/images/why-novarch/01-business-context.jpg',
    tag: 'Strategic Alignment',
    badgeText: '01 / BUSINESS CONTEXT',
  },
  {
    num: '02',
    title: 'Build, not only advise',
    description:
      'Strategy, interface, automation, integration and software can remain in one unified path.',
    icon: Wrench,
    image: '/images/why-novarch/02-build-not-advise.jpg',
    tag: 'Unified Engineering',
    badgeText: '02 / UNIFIED PATH',
  },
  {
    num: '03',
    title: 'Human control',
    description:
      'Sensitive decisions retain visible responsibility. AI operates with clear human gates.',
    icon: ShieldCheck,
    image: '/images/why-novarch/03-human-control.jpg',
    tag: 'Governance & Safety',
    badgeText: '03 / HUMAN GATES',
  },
  {
    num: '04',
    title: 'Ownership over dependency',
    description:
      'Design for understandable operations, access controls and deliberate offboarding.',
    icon: KeyRound,
    image: '/images/why-novarch/04-ownership.jpg',
    tag: 'Data Sovereignty',
    badgeText: '04 / FULL CONTROL',
  },
  {
    num: '05',
    title: 'Founder-led attention',
    description:
      'Commercial context and technical direction stay close throughout your engagement.',
    icon: UserCheck,
    image: '/images/why-novarch/05-founder-attention.jpg',
    tag: 'Dedicated Leadership',
    badgeText: '05 / FOUNDER LED',
  },
  {
    num: '06',
    title: 'Local + international',
    description:
      'Based in Ilmenau, Germany and engineered to serve local and global enterprises.',
    icon: Globe2,
    image: '/images/why-novarch/06-local-international.jpg',
    tag: 'Global Standards',
    badgeText: '06 / GERMAN QUALITY',
  },
];

export function WhyNovarchSection() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-49% 0px -49% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute('data-index'));
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    }, observerOptions);

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
    itemRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const activeItem = DIFFERENTIATORS[activeIndex];

  return (
    <section className="py-20 lg:py-28 bg-background border-b border-border">
      <Container>
        {/* Header */}
        <div className="flex flex-col items-start max-w-3xl mb-16">
          <Reveal delay={100}>
            <Badge variant="light" className="mb-4">
              WHY NOVARCH
            </Badge>
          </Reveal>

          <Reveal delay={200}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text leading-tight mb-4">
              Business understanding and technical execution — <span className="text-[#1E5FBF]">inside one company.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Sticky Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Sticky Image Showcase */}
          <div className="lg:col-span-5 lg:sticky lg:top-[calc(50vh-195px)] transition-all duration-300 z-10 space-y-3">
            {/* Image Frame */}
            <div className="relative h-[280px] sm:h-[340px] lg:h-[390px] w-full overflow-hidden rounded-2xl bg-navy shadow-md shadow-navy/30 border border-[#D1DAE6]/70">
              <AnimatePresence mode="sync">
                <motion.div
                  key={activeItem.num}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={activeItem.image}
                    alt={activeItem.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B2A]/80 via-[#0D1B2A]/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Tag */}
              <div className="absolute top-4 left-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-[#0D1B2A] shadow-sm border border-white/60">
                  <Sparkles className="w-3.5 h-3.5 text-[#1E5FBF]" />
                  {activeItem.tag}
                </span>
              </div>

              {/* Bottom Overlay Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.num}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="inline-block font-mono text-xs font-bold text-[#D0E4FF] tracking-wider uppercase mb-1">
                      {activeItem.badgeText}
                    </span>
                    <h3 className="text-xl font-bold text-white leading-snug drop-shadow-sm">
                      {activeItem.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Progress Dots / Step Bar */}
            <div className="flex items-center justify-between pt-1 px-1">
              <div className="flex items-center space-x-1.5">
                {DIFFERENTIATORS.map((item, idx) => (
                  <button
                    key={item.num}
                    onClick={() => handleCardClick(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-7 bg-[#1E5FBF]'
                        : 'w-2 bg-[#D1DAE6] hover:bg-[#7A8FA6]'
                    }`}
                    aria-label={`Go to step ${item.num}`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-medium text-[#7A8FA6]">
                0{activeIndex + 1} / 0{DIFFERENTIATORS.length}
              </span>
            </div>
          </div>

          {/* Right Column: Scrollable Content List */}
          <div className="lg:col-span-7 space-y-6 lg:space-y-8 lg:pt-[100px] lg:pb-[180px]">
            {DIFFERENTIATORS.map((item, index) => {
              const Icon = item.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={item.num}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  data-index={index}
                  onClick={() => handleCardClick(index)}
                  className={`group relative flex flex-col justify-between p-6 sm:p-8 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-surface-card border-blue shadow-lg shadow-blue/10 scale-[1.01]'
                      : 'bg-surface/80 border-border hover:border-blue/50 hover:bg-surface-card hover:shadow-md'
                  }`}
                >
                  {/* Left Active Edge Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-3 bottom-3 w-1.5 bg-blue rounded-r-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span
                          className={`text-xs font-mono font-bold px-3 py-1 rounded-md transition-colors ${
                            isActive
                              ? 'bg-blue text-white'
                              : 'bg-blue-light text-blue group-hover:bg-blue group-hover:text-white'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-text-light">
                          {item.tag}
                        </span>
                      </div>

                      <div
                        className={`p-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-blue-light text-blue'
                            : 'bg-surface-card text-text-light group-hover:text-blue group-hover:bg-blue-light'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-3 leading-snug transition-colors ${
                        isActive ? 'text-text' : 'text-text-muted group-hover:text-text'
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="text-base text-white leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-border flex items-center text-xs font-semibold text-blue">
                      <CheckCircle2 className="w-4 h-4 mr-1.5 text-blue" />
                      Currently Viewing Context
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
