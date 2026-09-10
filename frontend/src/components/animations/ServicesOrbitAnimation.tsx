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
    id: 'custom-software',
    name: 'Custom Software',
    icon: Code2,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.45) 0%, rgba(56, 189, 248, 0.8) 35%, rgba(14, 85, 180, 0.9) 70%, rgba(5, 18, 45, 0.95) 100%)',
    borderGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, #38BDF8 50%, #0284C7 100%)',
    glowColor: 'rgba(56, 189, 248, 0.55)',
    ringColor: '#38BDF8',
    orbit: 3, // top-right outer orbit
    initialAngle: 45,
    speed: 0.12,
    href: '/services/custom-software',
  },
  {
    id: 'ai-workflow',
    name: 'AI Workflows',
    icon: Cpu,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(59, 130, 246, 0.8) 35%, rgba(29, 78, 216, 0.9) 70%, rgba(8, 22, 55, 0.95) 100%)',
    borderGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, #60A5FA 50%, #2563EB 100%)',
    glowColor: 'rgba(96, 165, 250, 0.55)',
    ringColor: '#60A5FA',
    orbit: 1, // right mid orbit
    initialAngle: 10,
    speed: 0.18,
    href: '/services/ai-workflow',
  },
  {
    id: 'digital-launch',
    name: 'Digital Launch',
    icon: Globe,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(99, 102, 241, 0.8) 35%, rgba(37, 99, 235, 0.9) 70%, rgba(10, 20, 50, 0.95) 100%)',
    borderGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, #818CF8 50%, #3B82F6 100%)',
    glowColor: 'rgba(59, 130, 246, 0.55)',
    ringColor: '#3B82F6',
    orbit: 2, // bottom orbit
    initialAngle: 270,
    speed: 0.14,
    href: '/services/digital-launch',
  },
  {
    id: 'automation-integration',
    name: 'Automation & Integration',
    icon: GitBranch,
    gradient: 'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.4) 0%, rgba(34, 211, 238, 0.8) 35%, rgba(14, 116, 144, 0.9) 70%, rgba(6, 24, 48, 0.95) 100%)',
    borderGradient: 'linear-gradient(135deg, rgba(255, 255, 255, 0.65) 0%, #38BDF8 50%, #0EA5E9 100%)',
    glowColor: 'rgba(34, 211, 238, 0.55)',
    ringColor: '#22D3EE',
    orbit: 0, // left inner orbit
    initialAngle: 175,
    speed: 0.20,
    href: '/services/automation-integration',
  },
];

// Clean 3D perspective rings (subtle, non-overblown)
const ORBIT_RINGS = [
  { rx: 120, ry: 56, dashed: false, opacity: 0.45, width: '1.2px', color: 'rgba(56, 189, 248, 0.4)' },
  { rx: 185, ry: 86, dashed: false, opacity: 0.35, width: '1px', color: 'rgba(59, 130, 246, 0.35)' },
  { rx: 250, ry: 116, dashed: false, opacity: 0.25, width: '1px', color: 'rgba(37, 99, 235, 0.3)' },
  { rx: 315, ry: 146, dashed: true, opacity: 0.2, width: '1px', color: 'rgba(56, 189, 248, 0.25)' },
];

const ORBIT_ICON_RADII = [
  { rx: 128, ry: 58 },
  { rx: 168, ry: 76 },
  { rx: 206, ry: 94 },
  { rx: 242, ry: 110 },
];

const MIN_ICON_DIST = 85;

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

      // Increment angles
      const newAngles = [...anglesRef.current];
      if (!isHoveredAny) {
        for (let i = 0; i < N; i++) {
          newAngles[i] = (anglesRef.current[i] + SERVICES_PLATFORMS[i].speed * mult * (delta / 16)) % 360;
        }
      }

      // Calculate screen positions
      const pos: { x: number; y: number }[] = newAngles.map((angle, i) => {
        const orbit = ORBIT_ICON_RADII[SERVICES_PLATFORMS[i].orbit];
        const rad = (angle * Math.PI) / 180;
        return { x: Math.cos(rad) * orbit.rx, y: Math.sin(rad) * orbit.ry };
      });

      // Avoid icon overlaps
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pos[i].x - pos[j].x;
          const dy = pos[i].y - pos[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MIN_ICON_DIST) {
            const outerIdx = SERVICES_PLATFORMS[i].orbit >= SERVICES_PLATFORMS[j].orbit ? i : j;
            newAngles[outerIdx] = anglesRef.current[outerIdx];
            const orbit = ORBIT_ICON_RADII[SERVICES_PLATFORMS[outerIdx].orbit];
            const rad = (newAngles[outerIdx] * Math.PI) / 180;
            pos[outerIdx] = {
              x: Math.cos(rad) * orbit.rx,
              y: Math.sin(rad) * orbit.ry,
            };
          }
        }
      }

      anglesRef.current = newAngles;

      // Apply transformations
      for (let i = 0; i < N; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;

        const { x, y } = pos[i];
        const rad = (newAngles[i] * Math.PI) / 180;
        const depth = Math.sin(rad);

        const baseScale = 0.88 + (depth + 1) * 0.18;
        const isItemHovered = hoveredIconRef.current === SERVICES_PLATFORMS[i].id;
        const scale = isItemHovered ? baseScale * 1.25 : baseScale;
        const opacity = isItemHovered ? 1 : 0.7 + (depth + 1) * 0.15;
        const zIndex = isItemHovered ? 100 : Math.round((depth > 0 ? 35 : 10) + depth * 10);

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
    <div
      ref={containerRef}
      className="relative w-full max-w-[620px] h-[380px] sm:h-[460px] lg:h-[500px] overflow-visible select-none flex items-center justify-center scale-95 sm:scale-100 lg:scale-105 origin-center"
    >
      {/* ── 3D Tilted Perspective Canvas ── */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-2 sm:-translate-y-4">
        
        {/* Subtle, clean floor platform glow (clean & balanced) */}
        <div
          className="absolute w-[240px] h-[120px] rounded-full pointer-events-none opacity-40 blur-lg"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.15) 50%, transparent 75%)',
            transform: 'rotateX(62deg) rotateZ(-10deg)',
          }}
        />

        {/* 3D Perspective Orbit Tracks */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            transform: 'rotateX(62deg) rotateZ(-10deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {ORBIT_RINGS.map((orbit, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: orbit.rx * 2,
                height: orbit.ry * 2,
                borderRadius: '50%',
                border: orbit.dashed
                  ? `${orbit.width} dashed ${orbit.color}`
                  : `${orbit.width} solid ${orbit.color}`,
                boxShadow: `0 0 10px ${orbit.color}`,
                opacity: orbit.opacity,
              }}
            >
              {/* Subtle accent photon dot */}
              <div
                className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/80 shadow-[0_0_6px_#38bdf8]"
                style={{
                  top: '15%',
                  left: i % 2 === 0 ? '80%' : '20%',
                }}
              />
            </div>
          ))}
        </div>

        {/* ── Subtle Horizon Light Line under Logo (Clean, crisp line) ── */}
        <div className="absolute z-10 w-[200px] h-[1px] bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_8px_#38bdf8] pointer-events-none translate-y-12" />

        {/* ── Central 3D NOVARCH Metallic Arch Logo (Crisp metallic styling) ── */}
        <div
          onMouseEnter={() => setIsHoveredCenter(true)}
          onMouseLeave={() => setIsHoveredCenter(false)}
          className="relative z-20 flex items-center justify-center cursor-pointer transition-all duration-300 group"
          style={{
            width: '230px',
            height: '230px',
            transform: isHoveredCenter ? 'scale(1.06)' : 'scale(1)',
            filter: isHoveredCenter
              ? 'drop-shadow(0 0 24px rgba(56, 189, 248, 0.7)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))'
              : 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 14px rgba(37, 99, 235, 0.45))',
          }}
        >
          <Image
            src="/images/logo/newLogo2.png"
            alt="NOVARCH Logo"
            width={230}
            height={230}
            priority
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* ── Orbiting 3D Holographic Glass Sphere Orbs ── */}
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
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[#07101E]/95 border border-cyan-400/40 text-cyan-300 text-xs font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none shadow-md backdrop-blur-md">
                    {p.name}
                  </div>
                )}

                {/* Subtle, crisp halo on hover */}
                {isHovered && (
                  <div
                    className="absolute -inset-1.5 rounded-full transition-all duration-300 blur-sm pointer-events-none"
                    style={{
                      background: p.glowColor,
                      opacity: 0.7,
                    }}
                  />
                )}

                {/* 3D Glass Sphere Shell */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    padding: '1.5px',
                    background: isHovered
                      ? `linear-gradient(135deg, #FFFFFF 0%, ${p.ringColor} 50%, #38BDF8 100%)`
                      : p.borderGradient,
                    boxShadow: isHovered
                      ? `0 0 24px ${p.glowColor}, inset 0 0 12px rgba(255, 255, 255, 0.6)`
                      : `0 8px 22px rgba(0, 0, 0, 0.7), 0 0 12px ${p.glowColor}, inset 0 0 8px rgba(255, 255, 255, 0.2)`,
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="relative flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-md"
                >
                  {/* Glass Core */}
                  <div
                    style={{
                      background: p.gradient,
                    }}
                    className="w-full h-full rounded-full flex items-center justify-center relative overflow-hidden"
                  >
                    {/* Top Specular Reflection Highlight */}
                    <div
                      className="absolute top-1 left-2 right-2 h-3.5 rounded-full pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.15) 60%, transparent 100%)',
                      }}
                    />

                    {/* Bottom subtle bounce glow */}
                    <div
                      className="absolute bottom-0.5 inset-x-2.5 h-2.5 rounded-full pointer-events-none"
                      style={{
                        background: `radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0.6) 0%, ${p.ringColor} 50%, transparent 80%)`,
                        opacity: 0.6,
                      }}
                    />

                    {/* Icon */}
                    <div className="relative z-10 flex items-center justify-center text-white">
                      <Icon
                        className="h-5.5 w-5.5 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ServicesOrbitAnimation;
