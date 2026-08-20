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
    orbit: 0,
    initialAngle: 0,
    speed: 0.32,
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
    orbit: 0,
    initialAngle: 180,
    speed: 0.32,
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
    orbit: 1,
    initialAngle: 90,
    speed: 0.2,
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
    orbit: 1,
    initialAngle: 270,
    speed: 0.2,
    href: '/services/custom-software',
  },
];

const ORBITS = [
  { rx: 130, ry: 60 },
  { rx: 215, ry: 98 },
  { rx: 285, ry: 130 },
];

export function ServicesOrbitAnimation() {
  const [isHoveredCenter, setIsHoveredCenter] = React.useState(false);
  const [hoveredIcon, setHoveredIcon] = React.useState<string | null>(null);
  const [angles, setAngles] = React.useState(
    SERVICES_PLATFORMS.map((p) => p.initialAngle)
  );

  React.useEffect(() => {
    let frameId: number;
    let last: number | null = null;

    const animate = (ts: number) => {
      if (!last) last = ts;
      const delta = ts - last;
      last = ts;

      if (!hoveredIcon) {
        setAngles((prev) =>
          prev.map((angle, i) => {
            const mult = isHoveredCenter ? 0.15 : 1;
            return (
              (angle + SERVICES_PLATFORMS[i].speed * mult * (delta / 16)) % 360
            );
          })
        );
      }
      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isHoveredCenter, hoveredIcon]);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] overflow-hidden select-none flex items-center justify-center">
      {/* ── 3D Tilted Perspective Canvas ─────────────────────────── */}
      <div className="absolute inset-0 flex items-center justify-center">
        
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
          {ORBITS.map((orbit, i) => {
            const isOuter = i === 2;
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
                    ? '1px dashed rgba(30, 95, 191, 0.25)'
                    : isInner
                    ? '1.5px solid rgba(56, 178, 216, 0.45)'
                    : '1.5px solid rgba(30, 95, 191, 0.4)',
                  boxShadow: isOuter
                    ? '0 0 10px rgba(30, 95, 191, 0.1)'
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
            width: '140px',
            height: '140px',
            transform: isHoveredCenter ? 'scale(1.12)' : 'scale(1)',
            filter: isHoveredCenter
              ? 'drop-shadow(0 0 28px rgba(56, 178, 216, 0.95)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
              : 'drop-shadow(0 0 16px rgba(30, 95, 191, 0.6))',
          }}
        >
          <Image
            src="/images/logo/logo2-removebg-preview.png"
            alt="NOVARCH Logo"
            width={135}
            height={135}
            priority
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* ── Orbiting 3D Holographic Glass Orbs ────────────────────── */}
        {SERVICES_PLATFORMS.map((p, i) => {
          const orbit = ORBITS[p.orbit];
          const rad = (angles[i] * Math.PI) / 180;
          const x = Math.cos(rad) * orbit.rx;
          const y = Math.sin(rad) * orbit.ry;
          const depth = Math.sin(rad); // -1 (back) to +1 (front)
          
          // Enhanced 3D perspective realism
          const scale = 0.8 + (depth + 1) * 0.22;
          const opacity = 0.55 + (depth + 1) * 0.225;
          const zIndex = depth > 0 ? 30 : 10;
          const isHovered = hoveredIcon === p.id;
          const isFront = depth > 0.1;
          const Icon = p.icon;

          return (
            <div
              key={p.id}
              onMouseEnter={() => setHoveredIcon(p.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              style={{
                position: 'absolute',
                transform: `translate(${x}px, ${y}px) scale(${
                  isHovered ? scale * 1.25 : scale
                })`,
                zIndex: isHovered ? 100 : Math.round(zIndex + depth * 8),
                opacity: isHovered ? 1 : opacity,
                transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease',
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
                    opacity: isHovered ? 0.95 : isFront ? 0.45 : 0.15,
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
                      : isFront
                      ? `0 8px 24px rgba(13, 27, 42, 0.8), 0 0 14px ${p.glowColor}`
                      : '0 4px 14px rgba(13, 27, 42, 0.6)',
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
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.05) 100%)',
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
                            : isFront
                            ? `drop-shadow(0 0 6px ${p.ringColor})`
                            : 'none',
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
