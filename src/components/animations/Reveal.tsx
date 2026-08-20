'use client';

import * as React from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in ms
  as?: React.ElementType;
}

/** Wraps children in a scroll-triggered fade+slide reveal animation */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Component = 'div',
}: RevealProps) {
  const [ref, inView] = useInView<HTMLDivElement>();

  return (
    <Component
      ref={ref}
      className={cn(
        inView ? 'reveal-visible' : 'reveal-hidden',
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
