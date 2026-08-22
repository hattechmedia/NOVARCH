import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

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
    bg: 'bg-[#1E5FBF]/10',
    text: 'text-[#60A5FA]',
    border: 'border-[#1E5FBF]/30',
    glow: 'group-hover:bg-[#1E5FBF]/15',
    pill: 'bg-[#1E5FBF]/20 text-[#93C5FD] border-[#1E5FBF]/40',
  },
  cyan: {
    bg: 'bg-[#00F0FF]/10',
    text: 'text-[#38B2D8]',
    border: 'border-[#38B2D8]/30',
    glow: 'group-hover:bg-[#38B2D8]/15',
    pill: 'bg-[#38B2D8]/20 text-[#A5F3FC] border-[#38B2D8]/40',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    glow: 'group-hover:bg-emerald-500/15',
    pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    glow: 'group-hover:bg-amber-500/15',
    pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
  purple: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-400',
    border: 'border-purple-500/30',
    glow: 'group-hover:bg-purple-500/15',
    pill: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
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
  const styles = colorStyles[color];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0B1524]/90 border border-[#17304E] p-5 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-[#1E5FBF]/50 group flex flex-col justify-between">
      {/* Glow highlight */}
      <div
        className={`absolute top-0 right-0 -mt-6 -mr-6 h-28 w-28 rounded-full ${styles.glow} blur-2xl pointer-events-none transition-all duration-300`}
      />

      <div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A8FA6]">
            {title}
          </p>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles.bg} ${styles.text} ${styles.border} transition-transform duration-200 group-hover:scale-110 shadow-sm`}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <h3 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-white font-mono">
          {value}
        </h3>
      </div>

      <div className="mt-4 pt-3 border-t border-[#17304E]/70 flex items-center justify-between text-xs">
        {subtitle && (
          <p className="text-[#94A3B8] font-medium text-[11px] truncate">{subtitle}</p>
        )}

        {trend && (
          <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-400 font-bold ml-auto flex-shrink-0">
            <TrendingUp className="h-3 w-3" />
            <span>{trend}</span>
          </div>
        )}
      </div>
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
