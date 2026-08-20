import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'light' | 'outline';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default:
      'text-[#1E5FBF] bg-[#D0E4FF] border border-[#1E5FBF]/20',
    light:
      'text-[#4A5B6F] bg-[#EAEEF4] border border-[#D1DAE6]',
    outline:
      'text-[#38B2D8] bg-transparent border border-[#38B2D8]/40',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-sm px-3 py-1 text-xs font-semibold uppercase tracking-widest',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
