import React from 'react';
import { LucideIcon, TrendingUp, ArrowUpRight } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  color?: 'blue' | 'cyan' | 'emerald' | 'amber' | 'purple';
}

const colorStyles = {
  blue: {
    iconBg: 'rgba(30,95,191,0.15)',
    iconBorder: 'rgba(30,95,191,0.35)',
    iconColor: '#60A5FA',
    glow: 'rgba(30,95,191,0.12)',
    shimmer: 'linear-gradient(135deg, #1E5FBF, #38B2D8)',
    trendColor: '#93C5FD',
  },
  cyan: {
    iconBg: 'rgba(56,178,216,0.12)',
    iconBorder: 'rgba(56,178,216,0.3)',
    iconColor: '#38B2D8',
    glow: 'rgba(56,178,216,0.10)',
    shimmer: 'linear-gradient(135deg, #0E7490, #38B2D8)',
    trendColor: '#A5F3FC',
  },
  emerald: {
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.3)',
    iconColor: '#34D399',
    glow: 'rgba(16,185,129,0.10)',
    shimmer: 'linear-gradient(135deg, #059669, #34D399)',
    trendColor: '#6EE7B7',
  },
  amber: {
    iconBg: 'rgba(245,158,11,0.12)',
    iconBorder: 'rgba(245,158,11,0.3)',
    iconColor: '#FBBF24',
    glow: 'rgba(245,158,11,0.10)',
    shimmer: 'linear-gradient(135deg, #D97706, #FBBF24)',
    trendColor: '#FDE68A',
  },
  purple: {
    iconBg: 'rgba(139,92,246,0.12)',
    iconBorder: 'rgba(139,92,246,0.3)',
    iconColor: '#A78BFA',
    glow: 'rgba(139,92,246,0.10)',
    shimmer: 'linear-gradient(135deg, #7C3AED, #A78BFA)',
    trendColor: '#DDD6FE',
  },
};

export const StatsCard: React.FC<StatsCardProps> = React.memo(({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
}) => {
  const s = colorStyles[color];

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-5 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-0.5"
      style={{
        background: 'linear-gradient(145deg, rgba(11,21,36,0.95) 0%, rgba(7,13,23,0.98) 100%)',
        border: '1px solid rgba(23,48,78,0.7)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,178,216,0.2)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,178,216,0.1)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,48,78,0.7)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)';
      }}
    >
      {/* Corner glow */}
      <div
        className="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full blur-2xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: s.glow }}
      />

      {/* Top shimmer bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-50 group-hover:opacity-90 transition-opacity duration-300"
        style={{ background: s.shimmer }}
      />

      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105"
            style={{
              background: s.iconBg,
              border: `1px solid ${s.iconBorder}`,
              color: s.iconColor,
              boxShadow: `0 0 16px ${s.glow}`,
            }}
          >
            <Icon className="h-5 w-5" />
          </div>

          {trend && (
            <div
              className="flex items-center gap-1 rounded-lg px-2 py-1"
              style={{
                background: 'rgba(16,185,129,0.1)',
                border: '1px solid rgba(16,185,129,0.2)',
              }}
            >
              <ArrowUpRight className="h-3 w-3" style={{ color: s.trendColor }} />
              <span className="text-[11px] font-mono font-bold" style={{ color: s.trendColor }}>
                {trend}
              </span>
            </div>
          )}
        </div>

        <p className="text-[11px] font-mono font-semibold uppercase tracking-[0.12em] text-[#4A6080] mb-1">
          {title}
        </p>
        <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-mono leading-none">
          {value}
        </h3>
      </div>

      {/* Footer */}
      <div
        className="relative mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: '1px solid rgba(23,48,78,0.5)' }}
      >
        {subtitle && (
          <p className="text-[12px] text-[#4A6080] font-medium truncate">{subtitle}</p>
        )}
        <TrendingUp className="h-3.5 w-3.5 text-[#1E3A5F] ml-auto flex-shrink-0" />
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
