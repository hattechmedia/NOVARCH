'use client';

import * as React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useFormToken } from '@/hooks/useFormToken';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Briefcase,
  Palette,
  GraduationCap,
  Cpu,
  Network,
  Lock,
  Send,
  User,
  Mail,
  Building,
  Target,
  Gift,
  Users2,
  Globe,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';

interface WinterArcFormData {
  fullName: string;
  email: string;
  city: string;
  organization: string;
  whatYouDo: string;
  whatCanYouOffer: string;
  whatAreYouLookingFor: string;
  linkedinUrl: string;
  portfolioUrl: string;
  proposedGuest: string;
  website_hp: string;
  marketingConsent: boolean;
  photoConsent: boolean;
}

const INITIAL_FORM: WinterArcFormData = {
  fullName: '',
  email: '',
  city: '',
  organization: '',
  whatYouDo: '',
  whatCanYouOffer: '',
  whatAreYouLookingFor: '',
  linkedinUrl: '',
  portfolioUrl: '',
  proposedGuest: '',
  website_hp: '',
  marketingConsent: false,
  photoConsent: false,
};

const PROFILES = [
  {
    icon: Briefcase,
    title: 'Founders & Businesses',
    color: 'from-blue-500/20 to-blue-600/10 text-blue-400 border-blue-500/30',
    iconColor: 'text-blue-400',
    description:
      'People building companies, scalable products, or operational services with a focus on long-term value.',
    highlight: 'Building & scaling ventures',
  },
  {
    icon: Palette,
    title: 'Designers & Creatives',
    color: 'from-purple-500/20 to-purple-600/10 text-purple-400 border-purple-500/30',
    iconColor: 'text-purple-400',
    description:
      'People bringing design craftsmanship, storytelling, brand clarity, creative thinking, and fresh perspectives.',
    highlight: 'Design, UX & brand narrative',
  },
  {
    icon: GraduationCap,
    title: 'Researchers & Students',
    color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30',
    iconColor: 'text-emerald-400',
    description:
      'People exploring foundational ideas, conducting scientific research, or developing cutting-edge technical skills.',
    highlight: 'Curiosity, academia & new tech',
  },
  {
    icon: Cpu,
    title: 'Technology & Systems People',
    color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-400 border-cyan-500/30',
    iconColor: 'text-cyan-400',
    description:
      'Developers, infrastructure engineers, and people passionate about software, automated workflows, and digital architectures.',
    highlight: 'Code, automation & architecture',
  },
  {
    icon: Network,
    title: 'Community Representatives',
    color: 'from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30',
    iconColor: 'text-amber-400',
    description:
      'People connecting networks, leading student or regional initiatives, and fostering collaborative ecosystems in Germany and beyond.',
    highlight: 'Networks, initiatives & ecosystem',
  },
];

const HIGHLIGHTS = [
  {
    icon: Users2,
    title: 'Curated & Intimate',
    desc: 'Around 15 selected participants rather than a noisy, impersonal conference hall.',
    iconColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
  },
  {
    icon: Target,
    title: 'Collaborative Problem-Solving',
    desc: 'Exchange practical perspectives, tackle real challenges, and explore joint initiatives.',
    iconColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  },
  {
    icon: Sparkles,
    title: 'Real Projects & Depth',
    desc: 'Substantive conversations rooted in genuine craft, systems thinking, and ambition.',
    iconColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  },
  {
    icon: Globe,
    title: 'Broad & Diverse Perspectives',
    desc: 'Open to builders across design, business, research, and engineering — not exclusively AI developers.',
    iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
  },
];

const TARGET_EVENT_TIME = new Date('2026-10-16T18:00:00+02:00').getTime();

function HeroStarParticles() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', handleResize);

    const stars: {
      x: number;
      y: number;
      size: number;
      color: string;
      baseAlpha: number;
      phase: number;
    }[] = [];

    const starCount = 75;
    const starColors = ['#38B2D8', '#60A5FA', '#38BDF8', '#818CF8', '#E2E8F0', '#38B2D8'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.7,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        baseAlpha: Math.random() * 0.6 + 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let t = 0;
    const render = () => {
      t += 0.025;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const flicker = Math.sin(t + s.phase) * 0.28;
        const alpha = Math.max(0.15, Math.min(1, s.baseAlpha + flicker));

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = s.size * 3.5;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function CountdownCard({
  value,
  label,
  mounted,
}: {
  value: number;
  label: string;
  mounted: boolean;
}) {
  const displayVal = mounted ? value : 0;

  return (
    <div
      className="flex flex-col items-center justify-center w-[72px] h-[86px] sm:w-24 sm:h-28 rounded-2xl border transition-all duration-300 backdrop-blur-md relative overflow-hidden group hover:border-[#38B2D8]/50 hover:shadow-[0_0_24px_rgba(56,178,216,0.2)]"
      style={{
        background: 'rgba(10, 22, 40, 0.75)',
        borderColor: 'rgba(30, 58, 95, 0.7)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
        perspective: 600,
      }}
    >
      {/* Subtle top edge sheen */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none" />

      {/* 3D Card-Fold Animated Number */}
      <div className="relative h-9 sm:h-11 w-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={displayVal}
            initial={{ rotateX: 70, opacity: 0, scale: 0.92, y: 8 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1, y: 0 }}
            exit={{ rotateX: -70, opacity: 0, scale: 0.92, y: -8 }}
            transition={{
              duration: 0.35,
              ease: [0.23, 1, 0.32, 1],
            }}
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: '50% 50%',
              backfaceVisibility: 'hidden',
            }}
            className="flex items-center justify-center w-full"
          >
            <span className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight tabular-nums select-none">
              {displayVal}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Metric Label (DAYS, HOURS, MIN, SEC) */}
      <span className="text-[10px] sm:text-xs font-mono font-bold text-[#64748B] tracking-widest uppercase mt-1 z-10 select-none">
        {label}
      </span>
    </div>
  );
}

export function WinterArcContent() {
  const formRef = React.useRef<HTMLDivElement>(null);
  const formToken = useFormToken();
  const [formData, setFormData] = React.useState<WinterArcFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const [referralParams, setReferralParams] = React.useState<{
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    referrer?: string;
  }>({});

  // Countdown timer state
  const [mounted, setMounted] = React.useState(false);
  const [countdown, setCountdown] = React.useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  React.useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = Math.max(0, now - TARGET_EVENT_TIME);

      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Capture campaign & attribution parameters on mount
  React.useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const params = {
        utmSource: urlParams.get('utm_source') || undefined,
        utmMedium: urlParams.get('utm_medium') || undefined,
        utmCampaign: urlParams.get('utm_campaign') || undefined,
        utmContent: urlParams.get('utm_content') || undefined,
        referrer: document.referrer || undefined,
      };
      setReferralParams(params);
    } catch (e) {
      console.warn('Could not read campaign params:', e);
    }
  }, []);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const input = document.getElementById('fullName');
        input?.focus();
      }, 500);
    }
  };

  const scrollToAbout = () => {
    const el = document.getElementById('what-is-winter-arc');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMsg('');

    const trimmedName = formData.fullName.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedCity = formData.city.trim();
    const trimmedOrg = formData.organization.trim();
    const trimmedWhatYouDo = formData.whatYouDo.trim();
    const trimmedOffer = formData.whatCanYouOffer.trim();
    const trimmedLookingFor = formData.whatAreYouLookingFor.trim();
    const trimmedLinkedin = formData.linkedinUrl.trim();
    const trimmedPortfolio = formData.portfolioUrl.trim();
    const trimmedGuest = formData.proposedGuest.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setErrorMsg('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMsg('Please enter a valid email address (e.g. name@domain.com).');
      return;
    }

    if (!trimmedCity) {
      setErrorMsg('Please enter your city.');
      return;
    }

    if (!trimmedOrg) {
      setErrorMsg('Please enter the business, project, or community you represent.');
      return;
    }

    if (!trimmedWhatYouDo || trimmedWhatYouDo.length < 2) {
      setErrorMsg('Please tell us a little about what you do.');
      return;
    }

    if (!trimmedOffer || trimmedOffer.length < 2) {
      setErrorMsg('Please let us know what you can offer the group.');
      return;
    }

    if (!trimmedLookingFor || trimmedLookingFor.length < 2) {
      setErrorMsg('Please tell us what you are looking for.');
      return;
    }

    const urlRegex = /^https?:\/\/.+/i;
    if (trimmedLinkedin && !urlRegex.test(trimmedLinkedin)) {
      setErrorMsg('LinkedIn URL must start with http:// or https://');
      return;
    }

    if (trimmedPortfolio && !urlRegex.test(trimmedPortfolio)) {
      setErrorMsg('Portfolio / Website URL must start with http:// or https://');
      return;
    }

    if (!formToken) {
      setErrorMsg('This form is still loading. Please wait a moment and try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        applicationType: 'winter-arc',
        fullName: trimmedName,
        email: trimmedEmail,
        city: trimmedCity,
        organization: trimmedOrg,
        whatYouDo: trimmedWhatYouDo,
        whatCanYouOffer: trimmedOffer,
        whatAreYouLookingFor: trimmedLookingFor,
        linkedinUrl: trimmedLinkedin || undefined,
        portfolioUrl: trimmedPortfolio || undefined,
        proposedGuest: trimmedGuest || undefined,
        website_hp: formData.website_hp || undefined,
        form_token: formToken,
        referral: referralParams,
        source: referralParams.utmSource ? `Campaign: ${referralParams.utmSource}` : 'Website Form',
        marketingConsent: formData.marketingConsent,
        photoConsent: formData.photoConsent,
      };

      const res = await fetch('/api/community', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || json.message || 'Submission failed. Please verify your details.');
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative text-text overflow-hidden bg-[#030712]">
      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO (Matching exact provided screenshots)
          ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-center pt-8 pb-8 sm:pt-12 sm:pb-12 lg:pt-14 lg:pb-14 border-b border-border/40 overflow-hidden bg-[#030712]">
        {/* Background Hero Image - Full Clarity & Vibrancy with Smooth Left Reading Vignette */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <Image
            src="/images/winterArch/winterArchHero.png"
            alt="Winter Arc gathering in Ilmenau"
            fill
            priority
            sizes="100vw"
            className="object-cover object-right md:object-center select-none"
          />
          {/* Subtle dark gradient overlay on the left to guarantee sharp text readability while keeping the right side bright and clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712]/95 via-[#030712]/80 to-transparent w-full md:w-[72%] lg:w-[60%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]/40" />
        </div>

        {/* Ambient Dark Atmospheric Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-0 h-[450px] w-[600px] rounded-full opacity-20 blur-[100px] z-[1]"
          style={{
            background: 'radial-gradient(ellipse, #1E5FBF 0%, #38B2D8 30%, transparent 70%)',
          }}
        />

        <Container size="xl" className="relative z-10 my-auto py-6 sm:py-10">
          <div className="max-w-2xl lg:max-w-3xl text-left">
            {/* 1. Top Badge / Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 bg-[#081224]/90 border border-[#38B2D8]/30 text-cyan-300 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(56,178,216,0.18)] backdrop-blur-md">
              <span className="text-cyan-400 text-xs">❄</span>
              <span>WINTER ARC · TREFFEN 01</span>
            </div>

            {/* 2. Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4 leading-[1.12]">
              A gathering for people building <br className="hidden sm:inline" />
              <span className="text-[#258CF4] font-extrabold">
                what comes next.
              </span>
            </h1>

            {/* 3. Subtitle / Supporting Paragraph */}
            <p className="text-xs sm:text-sm lg:text-base text-slate-300/95 leading-relaxed max-w-xl mb-6 font-normal">
              A curated evening of founders, creatives, researchers and engineers in Ilmenau, Germany —
              real conversation, shared perspectives, collaborative problem-solving.
            </p>

            {/* Elapsed time since the event: total hours, minutes and seconds. */}
            <div className="flex items-center justify-start gap-2.5 sm:gap-3.5 mb-6">
              <CountdownCard value={countdown.hours} label="HOURS" mounted={mounted} />
              <CountdownCard value={countdown.minutes} label="MIN" mounted={mounted} />
              <CountdownCard value={countdown.seconds} label="SEC" mounted={mounted} />
            </div>

            {/* 5. Action Buttons (Apply for Winter Arc -> | Learn more) */}
            <div className="flex flex-col sm:flex-row items-start justify-start gap-3 mb-8">
              <button
                onClick={scrollToForm}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-white transition-all duration-200 cursor-pointer shadow-[0_0_24px_rgba(59,130,246,0.5)] hover:shadow-[0_0_36px_rgba(56,189,248,0.7)] hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: 'linear-gradient(90deg, #5063F0 0%, #3B82F6 50%, #38BDF8 100%)',
                }}
              >
                <span>Apply for Winter Arc</span>
                <span>→</span>
              </button>

              <button
                onClick={scrollToAbout}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl px-6 py-2.5 sm:px-7 sm:py-3 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all duration-200 cursor-pointer backdrop-blur-md"
                style={{
                  background: 'rgba(7, 17, 32, 0.85)',
                  border: '1px solid rgba(30, 58, 95, 0.8)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(14, 28, 50, 0.9)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56, 178, 216, 0.5)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(7, 17, 32, 0.85)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(30, 58, 95, 0.8)';
                }}
              >
                Learn more
              </button>
            </div>

            {/* 6. Logistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 max-w-2xl">
              {/* DATE */}
              <div
                className="p-3 sm:p-3.5 rounded-xl border text-left backdrop-blur-md transition-all duration-200"
                style={{
                  background: 'rgba(6, 16, 30, 0.85)',
                  borderColor: 'rgba(23, 48, 78, 0.8)',
                }}
              >
                <p className="text-[10px] font-mono text-[#38B2D8] font-bold uppercase tracking-wider mb-0.5">
                  DATE
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Fri, 16 Oct 2026
                </p>
              </div>

              {/* TIME */}
              <div
                className="p-3 sm:p-3.5 rounded-xl border text-left backdrop-blur-md transition-all duration-200"
                style={{
                  background: 'rgba(6, 16, 30, 0.85)',
                  borderColor: 'rgba(23, 48, 78, 0.8)',
                }}
              >
                <p className="text-[10px] font-mono text-[#38B2D8] font-bold uppercase tracking-wider mb-0.5">
                  TIME
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  18:00 CEST
                </p>
              </div>

              {/* LOCATION */}
              <div
                className="p-3 sm:p-3.5 rounded-xl border text-left backdrop-blur-md transition-all duration-200"
                style={{
                  background: 'rgba(6, 16, 30, 0.85)',
                  borderColor: 'rgba(23, 48, 78, 0.8)',
                }}
              >
                <p className="text-[10px] font-mono text-[#38B2D8] font-bold uppercase tracking-wider mb-0.5">
                  LOCATION
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  Ilmenau, Germany
                </p>
              </div>

              {/* SEATS */}
              <div
                className="p-3 sm:p-3.5 rounded-xl border text-left backdrop-blur-md transition-all duration-200"
                style={{
                  background: 'rgba(6, 16, 30, 0.85)',
                  borderColor: 'rgba(23, 48, 78, 0.8)',
                }}
              >
                <p className="text-[10px] font-mono text-[#38B2D8] font-bold uppercase tracking-wider mb-0.5">
                  SEATS
                </p>
                <p className="text-xs sm:text-sm font-bold text-white tracking-tight">
                  ~15 participants
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: WHAT IS WINTER ARC?
          ───────────────────────────────────────────────────────────── */}
      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: WHAT IS WINTER ARC?
          ───────────────────────────────────────────────────────────── */}
      <section id="what-is-winter-arc" className="py-14 lg:py-20 border-b border-border/40 bg-surface/30">
        <Container size="xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#38B2D8]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>The Gathering</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Meaningful exchange over conference noise.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Winter Arc is a curated gathering for people with different backgrounds, ideas,
                skills, and projects. The purpose is to bring together people who can learn from
                each other, exchange perspectives, identify shared challenges, and explore meaningful
                collaborations.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Instead of listening to one-way presentations or trading business cards in crowded
                exhibition rooms, Treffen 01 is structured around genuine dialogue, problem-solving,
                and mutual curiosity across disciplines.
              </p>

              <div className="pt-1">
                <div className="rounded-xl border border-[#38B2D8]/20 bg-[#1E5FBF]/10 p-3.5 flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-cyan-400 flex-shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-300">
                    <strong className="text-white">Strictly high-signal:</strong> No sales pitches,
                    no artificial networking rituals, and no sponsor agendas.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Highlights - Clean Unboxed Bullets with Themed Icons */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {HIGHLIGHTS.map((h) => {
                const IconComponent = h.icon;
                return (
                  <div
                    key={h.title}
                    className="flex items-start gap-4"
                  >
                    {/* Icon Bullet Badge */}
                    <div
                      className={`flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border flex-shrink-0 ${h.iconColor}`}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mb-0.5">
                        {h.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300/80 leading-relaxed">
                        {h.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: WHO SHOULD APPLY?
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-b border-border/40">
        <Container size="xl">
          <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#38B2D8] mb-3">
              <Users2 className="h-3.5 w-3.5" />
              <span>Participant Profiles</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-3">
              Who should apply for Treffen 01?
            </h2>

            <p className="text-sm sm:text-base text-text-muted leading-relaxed">
              We look for diverse disciplines and practical energy. You don&apos;t need to be an AI
              developer or a VC-backed founder — what matters is what you bring to the table and what
              you hope to explore.
            </p>
          </div>

          {/* 5 Profiles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {PROFILES.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="flex flex-col justify-between p-6 rounded-2xl border border-border/70 bg-surface-card/70 hover:border-[#38B2D8]/40 hover:bg-surface-card transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${p.color} border`}>
                        <Icon className={`h-5 w-5 ${p.iconColor}`} />
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300/80 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                        {p.highlight}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                      {p.title}
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Callout Card */}
            <div className="flex flex-col justify-center p-6 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-[#1E5FBF]/20 via-[#07101E] to-[#38B2D8]/10 text-center sm:text-left">
              <h3 className="text-lg font-bold text-white mb-2">Have a question or custom angle?</h3>
              <p className="text-xs sm:text-sm text-text-muted mb-4 leading-relaxed">
                If your project doesn&apos;t fit a standard label but you believe you can contribute meaningful value, apply and share your story.
              </p>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyan-300 hover:text-white transition-colors cursor-pointer"
              >
                <span>Jump to application form</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: THE GATHERING DETAILS
          ───────────────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-b border-border/40 bg-surface/30">
        <Container size="xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-[#38B2D8] mb-2.5">
                <Calendar className="h-3.5 w-3.5" />
                <span>Event Logistics</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white mb-2.5">
                Winter Arc · Treffen 01 Details
              </h2>
              <p className="text-sm sm:text-base text-text-muted max-w-xl mx-auto">
                Transparent information regarding format, venue handling, and timeline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              <DetailRow
                icon={Calendar}
                label="Target Date"
                value="Friday, 16 October 2026"
                note="Target date pending final confirmation. Selected applicants will receive direct calendar confirmation."
              />
              <DetailRow
                icon={Clock}
                label="Starting Time"
                value="18:00 CEST"
                note="Evening gathering with informal welcome followed by structured problem exchange."
              />
              <DetailRow
                icon={MapPin}
                label="Location & Venue"
                value="Ilmenau, Germany"
                note="To preserve an intimate and private environment, the exact venue address is shared with confirmed participants upon selection."
              />
              <DetailRow
                icon={Users}
                label="Capacity & Selection"
                value="Approximately 15 participants"
                note="Reviewed on a rolling basis. Quality of participation is prioritized over volume."
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: APPLICATION FORM
          ───────────────────────────────────────────────────────────── */}
      <section ref={formRef} id="apply" className="py-14 lg:py-20">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            {isSubmitted ? (
              <Card className="p-8 sm:p-12 text-center border-border/80 bg-surface-card/90 shadow-2xl backdrop-blur-xl animate-in zoom-in-95 duration-300">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8" />
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Thank you for applying to Winter Arc.
                </h2>

                <p className="text-base text-text-muted leading-relaxed max-w-lg mx-auto mb-6">
                  Your application has been received. We&apos;ll review it and contact you if you&apos;re
                  selected. Thanks for your interest in Treffen 01.
                </p>

                <div className="p-4 rounded-xl bg-surface border border-border/60 text-left max-w-md mx-auto mb-8 text-xs font-mono text-text-muted space-y-1">
                  <p>
                    <span className="text-white font-semibold">Applicant:</span> {formData.fullName}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Email:</span> {formData.email}
                  </p>
                  <p>
                    <span className="text-white font-semibold">Location:</span> {formData.city}
                  </p>
                </div>

                <Button
                  onClick={() => {
                    setFormData(INITIAL_FORM);
                    setIsSubmitted(false);
                  }}
                  variant="outline"
                  size="md"
                >
                  Submit Another Application
                </Button>
              </Card>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-border/70 bg-[#06101E]/90 shadow-2xl backdrop-blur-xl p-5 sm:p-8">
                {/* Form Header */}
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-xs font-mono font-bold mb-2.5">
                    <span className="text-cyan-400">❄</span>
                    <span>Treffen 01 Application</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                    Apply for Winter Arc
                  </h2>

                  <p className="text-xs sm:text-sm text-text-muted leading-relaxed max-w-lg mx-auto">
                    Tell us a little about yourself, what you&apos;re working on, and what you would like to
                    bring to or gain from the gathering. Selected participants will receive a direct calendar invite.
                  </p>
                </div>

                {errorMsg && (
                  <div className="mb-4 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">{errorMsg}</div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Anti-Spam Honeypot */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_hp"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website_hp}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, website_hp: e.target.value }))
                      }
                    />
                  </div>

                  {/* ── Required: Name and Email ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                        <input
                          type="text"
                          id="fullName"
                          required
                          disabled={isSubmitting}
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, fullName: e.target.value }))
                          }
                          placeholder="Jane Doe"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Email Address <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                        <input
                          type="email"
                          id="email"
                          required
                          disabled={isSubmitting}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="jane@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Required: City and Organization ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        City / Location <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                        <input
                          type="text"
                          id="city"
                          required
                          disabled={isSubmitting}
                          value={formData.city}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, city: e.target.value }))
                          }
                          placeholder="e.g. Ilmenau, Erfurt, Berlin, Munich"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="organization"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Business, Project, or Community <span className="text-cyan-400">*</span>
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted/60" />
                        <input
                          type="text"
                          id="organization"
                          required
                          disabled={isSubmitting}
                          value={formData.organization}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, organization: e.target.value }))
                          }
                          placeholder="Company, startup, university, lab, or initiative"
                          className="w-full pl-9 pr-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Required: What do you do? ── */}
                  <div>
                    <label
                      htmlFor="whatYouDo"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      What do you do? <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="whatYouDo"
                      rows={2}
                      required
                      disabled={isSubmitting}
                      value={formData.whatYouDo}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatYouDo: e.target.value }))
                      }
                      placeholder="Your current focus, craft, role, or what you are building"
                      className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50 resize-y min-h-[60px]"
                    />
                  </div>

                  {/* ── Required: What can you offer the group? ── */}
                  <div>
                    <label
                      htmlFor="whatCanYouOffer"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      What can you offer the group? <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="whatCanYouOffer"
                      rows={2}
                      required
                      disabled={isSubmitting}
                      value={formData.whatCanYouOffer}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatCanYouOffer: e.target.value }))
                      }
                      placeholder="Skills, specific experience, lessons learned, or domain insights"
                      className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50 resize-y min-h-[60px]"
                    />
                  </div>

                  {/* ── Required: What are you looking for? ── */}
                  <div>
                    <label
                      htmlFor="whatAreYouLookingFor"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      What are you looking for? <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="whatAreYouLookingFor"
                      rows={2}
                      required
                      disabled={isSubmitting}
                      value={formData.whatAreYouLookingFor}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, whatAreYouLookingFor: e.target.value }))
                      }
                      placeholder="Feedback, co-builders, systems advice, collaboration, or new ideas"
                      className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50 resize-y min-h-[60px]"
                    />
                  </div>

                  {/* ── Optional: LinkedIn & Portfolio URLs ── */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 border-t border-border/40">
                    <div>
                      <label
                        htmlFor="linkedinUrl"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        LinkedIn Profile <span className="text-text-muted/60 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        id="linkedinUrl"
                        disabled={isSubmitting}
                        value={formData.linkedinUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, linkedinUrl: e.target.value }))
                        }
                        placeholder="https://linkedin.com/in/username"
                        className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm font-mono disabled:opacity-50"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="portfolioUrl"
                        className="block text-xs font-medium text-slate-300 mb-1.5"
                      >
                        Portfolio / GitHub / Website <span className="text-text-muted/60 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        type="url"
                        id="portfolioUrl"
                        disabled={isSubmitting}
                        value={formData.portfolioUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({ ...prev, portfolioUrl: e.target.value }))
                        }
                        placeholder="https://github.com/username or site"
                        className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm font-mono disabled:opacity-50"
                      />
                    </div>
                  </div>

                  {/* ── Optional: Proposed Guest or Partner ── */}
                  <div>
                    <label
                      htmlFor="proposedGuest"
                      className="block text-xs font-medium text-slate-300 mb-1.5"
                    >
                      Proposed Guest / Partner <span className="text-text-muted/60 text-[10px]">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="proposedGuest"
                      disabled={isSubmitting}
                      value={formData.proposedGuest}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, proposedGuest: e.target.value }))
                      }
                      placeholder="Name, organization, or profile link if bringing someone"
                      className="w-full px-3.5 py-2.5 bg-surface/80 border border-border/80 rounded-xl text-white placeholder-text-muted/40 focus:border-cyan-400 focus:outline-none transition-colors text-sm disabled:opacity-50"
                    />
                  </div>

                  {/* ── Optional Consents (GDPR & Media) ── */}
                  <div className="pt-3 border-t border-border/40 space-y-3.5">
                    {/* Photography & Video Consent */}
                    <div className="rounded-xl border border-border/70 bg-surface/50 p-3 sm:p-3.5 transition-colors hover:border-cyan-400/40">
                      <label htmlFor="photoConsent" className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          id="photoConsent"
                          disabled={isSubmitting}
                          checked={formData.photoConsent}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, photoConsent: e.target.checked }))
                          }
                          className="mt-0.5 h-4 w-4 rounded border-border/80 bg-surface/90 accent-cyan-400 cursor-pointer flex-shrink-0"
                        />
                        <div className="text-xs text-slate-300 leading-relaxed">
                          <p className="font-semibold text-white mb-0.5">
                            Photography &amp; Video Consent / Foto- &amp; Videoeinwilligung{' '}
                            <span className="text-[11px] font-mono text-cyan-400 font-normal">(Optional / Freiwillig)</span>
                          </p>
                          <p className="text-slate-300 mb-1">
                            I consent to photographs and videos being taken at this event and used by NOVARCH for its website and social-media channels. I understand that this consent is optional, I may withdraw it at any time, and declining will not affect my application or participation.{' '}
                            <a
                              href="/legal/photography-consent"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                            >
                              Learn more / Details
                            </a>
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            Ich stimme zu, dass Fotos und Videos bei dieser Veranstaltung aufgenommen und von NOVARCH für die Website und soziale Medien genutzt werden dürfen. Diese Einwilligung ist freiwillig und kann jederzeit widerrufen werden.
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Marketing / Promotional Email Consent */}
                    <div className="rounded-xl border border-border/70 bg-surface/50 p-3 sm:p-3.5 transition-colors hover:border-cyan-400/40">
                      <label htmlFor="marketingConsent" className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          id="marketingConsent"
                          disabled={isSubmitting}
                          checked={formData.marketingConsent}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, marketingConsent: e.target.checked }))
                          }
                          className="mt-0.5 h-4 w-4 rounded border-border/80 bg-surface/90 accent-cyan-400 cursor-pointer flex-shrink-0"
                        />
                        <div className="text-xs text-slate-300 leading-relaxed">
                          <p className="font-semibold text-white mb-0.5">
                            Future Event Updates / Zukünftige Veranstaltungs-Updates{' '}
                            <span className="text-[11px] font-mono text-cyan-400 font-normal">(Optional / Freiwillig)</span>
                          </p>
                          <p className="text-slate-300 mb-1">
                            &ldquo;Yes, I would like to receive occasional email updates about future NOVARCH hackathons, events, and activities. I understand that I can withdraw my consent at any time.&rdquo;
                          </p>
                          <p className="text-slate-400 text-[11px]">
                            &bdquo;Ja, ich möchte gelegentlich E-Mail-Updates zu zukünftigen Hackathons, Veranstaltungen und Aktivitäten von NOVARCH erhalten. Ich kann meine Einwilligung jederzeit widerrufen.&ldquo;
                          </p>
                        </div>
                      </label>
                    </div>

                    <p className="text-[11px] text-text-muted/80 leading-relaxed px-1">
                      Both checkboxes are unchecked by default and optional. Declining does not condition participation or selection. See our{' '}
                      <a
                        href="/legal/winter-arc-2026"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 underline underline-offset-2 hover:text-cyan-300"
                      >
                        Participant Privacy Notice (Datenschutzhinweis)
                      </a>{' '}
                      for full details on data handling, retention, and how to exercise your rights.
                    </p>
                  </div>

                  {/* Submit Button & Privacy Note */}
                  <div className="pt-2 space-y-3">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="primary"
                      size="lg"
                      className="w-full py-3.5 text-sm font-semibold shadow-[0_0_20px_rgba(30,95,191,0.4)] disabled:opacity-50 group"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                          Submitting Application...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span>Submit Application for Winter Arc</span>
                          <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      )}
                    </Button>

                    <div className="flex items-start gap-2 text-xs text-text-muted/80 leading-relaxed px-1">
                      <Lock className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>
                        We collect only necessary information to curate Treffen 01 participants.
                        Applicant details are never shared publicly.
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Container>
      </section>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon?: React.ElementType;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="relative group flex flex-col p-5 sm:p-6 rounded-2xl border border-border/70 bg-gradient-to-b from-surface-card/90 via-surface-card/60 to-surface/80 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(56,178,216,0.12)] transition-all duration-300 text-left h-full">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[11px] font-mono text-[#38B2D8] uppercase tracking-wider font-semibold">
          {label}
        </p>
        {Icon && (
          <div className="h-8 w-8 rounded-lg bg-[#38B2D8]/10 border border-[#38B2D8]/20 flex items-center justify-center text-[#38B2D8] group-hover:scale-110 group-hover:bg-[#38B2D8]/20 transition-all flex-shrink-0">
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="text-base sm:text-lg font-bold text-white mb-2 leading-snug tracking-tight">
        {value}
      </p>
      <p className="text-xs text-text-muted leading-relaxed">
        {note}
      </p>
    </div>
  );
}
