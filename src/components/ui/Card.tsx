import * as React from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  variant?: 'default' | 'dark' | 'bordered';
}

export function Card({ hover = true, variant = 'default', className, children, ...props }: CardProps) {
  const variants = {
    default: 'bg-[#FAFBFC] border border-[#D1DAE6]',
    dark: 'bg-[#0F2540] border border-[#152E4D]',
    bordered: 'bg-transparent border border-[#D1DAE6]',
  };

  return (
    <div
      className={cn(
        'rounded-sm p-6 transition-all duration-300',
        variants[variant],
        hover && 'hover:shadow-lg hover:shadow-[#1E5FBF]/8 hover:-translate-y-0.5 hover:border-[#1E5FBF]/30',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
