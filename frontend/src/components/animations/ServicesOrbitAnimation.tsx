'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Cpu, GitBranch, Globe, Code2 } from 'lucide-react';

interface ServicePlatform {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  gradient: string;
  borderGradient: string;
  glowColor: string;
  orbit: number;
  initialAngle: number;
  speed: number;
  href: string;
  ringColor: string;
}

const SERVICES_PLATFORMS: ServicePlatform[] = [
  {
    id: 'ai-workflow',
    name: 'AI Workflows',
    icon: Cpu,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(96, 165, 250, 0.4) 0%, rgba(30, 95, 191, 0.9) 45%, rgba(13, 27, 42, 0.95) 90%)',
    borderGradient: 'linear-gradient(135deg, #60A5FA 0%, #1E5FBF 50%, #38B2D8 100%)',
    glowColor: 'rgba(56, 178, 216, 0.75)',
    ringColor: '#38B2D8',
    orbit: 0,       // innermost ring
    initialAngle: 30,
    speed: 0.22,
    href: '/services/ai-workflow',
  },
  {
    id: 'automation-integration',
    name: 'Automation & Integration',
    icon: GitBranch,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(56, 178, 216, 0.45) 0%, rgba(14, 116, 144, 0.9) 45%, rgba(13, 27, 42, 0.95) 90%)',
    borderGradient: 'linear-gradient(135deg, #38B2D8 0%, #0284C7 50%, #10B981 100%)',
    glowColor: 'rgba(56, 178, 216, 0.75)',
    ringColor: '#06B6D4',
    orbit: 1,       // second ring — wider, slower
    initialAngle: 200,
    speed: 0.17,
    href: '/services/automation-integration',
  },
  {
    id: 'digital-launch',
    name: 'Digital Launch',
    icon: Globe,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(129, 140, 248, 0.4) 0%, rgba(37, 99, 235, 0.9) 45%, rgba(15, 23, 42, 0.95) 90%)',
    borderGradient: 'linear-gradient(135deg, #818CF8 0%, #2563EB 50%, #38B2D8 100%)',
    glowColor: 'rgba(99, 102, 241, 0.75)',
    ringColor: '#6366F1',
    orbit: 2,       // third ring — widest inner-mid
    initialAngle: 110,
    speed: 0.14,
    href: '/services/digital-launch',
  },
  {
    id: 'custom-software',
    name: 'Custom Software',
    icon: Code2,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(56, 178, 216, 0.35) 0%, rgba(26, 58, 92, 0.95) 45%, rgba(10, 17, 40, 0.98) 90%)',
    borderGradient: 'linear-gradient(135deg, #00F0FF 0%, #1E5FBF 50%, #38B2D8 100%)',
    glowColor: 'rgba(0, 240, 255, 0.7)',
    ringColor: '#00F0FF',
    orbit: 3,       // outermost ring — slowest
    initialAngle: 320,
    speed: 0.11,
    href: '/services/custom-software',
  },
];

// Visual ring ellipses — drawn inside 3D perspective container (rotateX squashes them so use larger values)
const ORBIT_RINGS = [
  { rx: 115, ry: 52  },  // ring 0 — innermost
  { rx: 182, ry: 83  },  // ring 1
  { rx: 245, ry: 112 },  // ring 2
  { rx: 305, ry: 140 },  // ring 3 — outermost
];

// Icon positioning radii — flat 2D space, calibrated to stay inside perspective-squashed rings
// Inner orbits are large enough to always clear the 225px central logo
const ORBIT_ICON_RADII = [
  { rx: 120, ry: 54 },  // orbit 0 — min radius to clear logo edge
  { rx: 158, ry: 72 },  // orbit 1
  { rx: 192, ry: 88 },  // orbit 2
  { rx: 222, ry: 101 }, // orbit 3
];

// Minimum allowed screen-space distance between any two icons (px)
const MIN_ICON_DIST = 80;

export function ServicesOrbitAnimation() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isHoveredCenter, setIsHoveredCenter] = React.useState(false);
  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);

  const anglesRef = React.useRef<number[]>(SERVICES_PLATFORMS.map((p) => p.initialAngle));
  const nodeRefs = React.useRef<(HTMLDivElement | null)[]>([]);
  const isHoveredCenterRef = React.useRef(false);
  const hoveredIconRef = React.useRef<string | null>(null);
  const isVisibleRef = React.useRef(true);

  isHoveredCenterRef.current = isHoveredCenter;
  hoveredIconRef.current = hoveredIcon;

  // Viewport intersection observer to pause 60fps animation when off-screen
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    let frameId: number;
    let last: number | null = null;

    const N = SERVICES_PLATFORMS.length;

    const animate = (ts: number) => {
      if (!isVisibleRef.current) {
        last = null;
        frameId = requestAnimationFrame(animate);
        return;
      }

      if (!last) last = ts;
      const delta = Math.min(ts - last, 32);
      last = ts;

      const isHoveredAny = !!hoveredIconRef.current;
      const mult = isHoveredCenterRef.current ? 0.15 : 1;

      // ── Pass 1: Propose new angles ────────────────────────────────
      const newAngles = [...anglesRef.current];
      if (!isHoveredAny) {
        for (let i = 0; i < N; i++) {
          newAngles[i] = (anglesRef.current[i] + SERVICES_PLATFORMS[i].speed * mult * (delta / 16)) % 360;
        }
      }

      // ── Pass 2: Compute proposed screen positions ─────────────────
      const pos: { x: number; y: number }[] = newAngles.map((angle, i) => {
        const orbit = ORBIT_ICON_RADII[SERVICES_PLATFORMS[i].orbit];
        const rad = (angle * Math.PI) / 180;
        return { x: Math.cos(rad) * orbit.rx, y: Math.sin(rad) * orbit.ry };
      });

      // ── Pass 3: Enforce pairwise minimum distance ─────────────────
      // If two icons are too close, freeze the one on the outer (slower) ring
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MIN_ICON_DIST) {
            // Freeze the outer icon (higher orbit index = slower, further out)
            const outerIdx =
              SERVICES_PLATFORMS[i].orbit >= SERVICES_PLATFORMS[j].orbit ? i : j;
            newAngles[outerIdx] = anglesRef.current[outerIdx]; // revert to old angle
            const orbit = ORBIT_ICON_RADII[SERVICES_PLATFORMS[outerIdx].orbit];
            const rad = (newAngles[outerIdx] * Math.PI) / 180;
            pos[outerIdx] = {
              x: Math.cos(rad) * orbit.rx,
              y: Math.sin(rad) * orbit.ry,
            };
          }
        }
      }

      // Commit angles
      anglesRef.current = newAngles;

      // ── Pass 4: Apply DOM transforms ─────────────────────────────
      for (let i = 0; i < N; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;

        const { x, y } = pos[i];
        const rad = (newAngles[i] * Math.PI) / 180;
        const depth = Math.sin(rad);

        const baseScale = 0.8 + (depth + 1) * 0.22;
        const isItemHovered = hoveredIconRef.current === SERVICES_PLATFORMS[i].id;
        const scale = isItemHovered ? baseScale * 1.25 : baseScale;
        const opacity = isItemHovered ? 1 : 0.55 + (depth + 1) * 0.225;
        const zIndex = isItemHovered ? 100 : Math.round((depth > 0 ? 30 : 10) + depth * 8);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.zIndex = `${zIndex}`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[400px] sm:h-[450px] lg:h-[480px] overflow-visible select-none flex items-center justify-center mt-0 sm:mt-2 lg:mt-4">
      {/* ── 3D Tilted Perspective Canvas ─────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-2 sm:-translate-y-4">
        {/* Orbit SVG Plane with dynamic lighting and dashes */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            transform: 'rotateX(58deg) rotateZ(-12deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {ORBIT_RINGS.map((orbit, i) => {
            const isOuter = i === 3;
            const isInner = i === 0;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: orbit.rx * 2,
                  height: orbit.ry * 2,
                  borderRadius: '50%',
                  border: isOuter
                    ? '1px dashed rgba(30, 95, 191, 0.20)'
                    : isInner
                    ? '1.5px solid rgba(56, 178, 216, 0.45)'
                    : '1.5px solid rgba(30, 95, 191, 0.35)',
                  boxShadow: isOuter
                    ? '0 0 10px rgba(30, 95, 191, 0.08)'
                    : '0 0 16px rgba(56, 178, 216, 0.18), inset 0 0 16px rgba(30, 95, 191, 0.08)',
                }}
              />
            );
          })}
        </div>

        {/* ── Central NOVARCH Logo ─────────────────────────────────── */}
        <div
          onMouseEnter={() => setIsHoveredCenter(true)}
          onMouseLeave={() => setIsHoveredCenter(false)}
          className="relative z-20 flex items-center justify-center cursor-pointer transition-all duration-300 group"
          style={{
            width: '225px',
            height: '225px',
            transform: isHoveredCenter ? 'scale(1.08)' : 'scale(1)',
            filter: isHoveredCenter
              ? 'drop-shadow(0 0 36px rgba(56, 178, 216, 0.95)) drop-shadow(0 0 10px rgba(255, 255, 255, 0.6))'
              : 'drop-shadow(0 0 22px rgba(30, 95, 191, 0.65))',
          }}
        >
          <Image
            src="/images/logo/logo4F.png"
            alt="NOVARCH Logo"
            width={225}
            height={225}
            priority
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* ── Orbiting 3D Holographic Glass Orbs (Direct GPU transform via nodeRefs) ── */}
        {SERVICES_PLATFORMS.map((p, i) => {
          const isHovered = hoveredIcon === p.id;
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              onMouseEnter={() => setHoveredIcon(p.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              style={{
                position: 'absolute',
                willChange: 'transform, opacity',
                transition: isHovered ? 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}
            >
              <Link href={p.href} className="relative block group outline-none" aria-label={p.name}>
                {/* Floating Service Name Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-md bg-[#0D1B2A]/95 border border-white/20 text-white text-[11px] font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none shadow-md backdrop-blur-sm">
                    {p.name}
                  </div>
                )}

                {/* Outer Glow Halo */}
                <div
                  className="absolute -inset-1 rounded-full transition-opacity duration-300 blur-sm pointer-events-none"
                  style={{
                    background: p.glowColor,
                    opacity: isHovered ? 0.95 : 0.35,
                  }}
                />

                {/* 3D Glass Orb Outer Ring */}
                <div
                  style={{
                    width: '58px',
                    height: '58px',
                    borderRadius: '50%',
                    padding: '2px',
                    background: isHovered
                      ? `linear-gradient(135deg, #FFFFFF 0%, ${p.ringColor} 50%, #38B2D8 100%)`
                      : p.borderGradient,
                    boxShadow: isHovered
                      ? `0 0 28px ${p.glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.5)`
                      : `0 8px 24px rgba(13, 27, 42, 0.8), 0 0 14px ${p.glowColor}`,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="relative flex items-center justify-center cursor-pointer overflow-hidden"
                >
                  {/* Glassmorphic Core */}
                  <div
                    style={{
                      background: p.gradient,
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden backdrop-blur-md"
                  >
                    {/* Top Specular Gloss Highlight (3D Glass Sphere Reflection) */}
                    <div
                      className="absolute top-0.5 left-1.5 right-1.5 h-4 rounded-full pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.05) 100%)',
                      }}
                    />

                    {/* Subtle bottom ambient bounce reflection */}
                    <div
                      className="absolute bottom-0 inset-x-2 h-2.5 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at bottom, ${p.ringColor} 0%, transparent 80%)`,
                        opacity: 0.6,
                      }}
                    />

                    {/* Main Tech Service Icon with Glow */}
                    <div className="relative z-10 flex items-center justify-center text-white">
                      <Icon
                        className="h-6 w-6 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                        style={{
                          filter: isHovered
                            ? 'drop-shadow(0 0 8px rgba(255,255,255,0.9))'
                            : `drop-shadow(0 0 6px ${p.ringColor})`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Micro Ripple Wave on Hover */}
                {isHovered && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping pointer-events-none opacity-30"
                    style={{
                      border: `2px solid ${p.ringColor}`,
                      animationDuration: '1.2s',
                    }}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesOrbitAnimation;
