import * as React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'light' | 'outline';
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  const variants = {
    default:
      'text-[#38B2D8] bg-transparent border border-[#38B2D8]/40',
    light:
      'text-[#7A8FA6] bg-transparent border border-[#7A8FA6]/35',
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
