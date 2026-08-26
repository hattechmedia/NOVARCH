import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#1E5FBF] text-white border border-[#1E5FBF] shadow-md shadow-[#1E5FBF]/25 hover:border-[#38B2D8]/80 hover:shadow-xl hover:shadow-[#0D1B2A]/40 active:scale-[0.98]',
  secondary:
    'bg-surface-card text-text border border-border hover:border-[#38B2D8]/80 hover:text-white hover:shadow-xl hover:shadow-[#0D1B2A]/40 active:scale-[0.98]',
  ghost:
    'bg-transparent text-text border border-transparent hover:text-white hover:border-white/10 active:scale-[0.98]',
  outline:
    'bg-transparent text-text border border-border hover:border-[#38B2D8]/80 hover:text-white active:scale-[0.98]',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-6 text-sm gap-2',
  lg: 'h-13 px-8 text-base gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'group relative inline-flex items-center justify-center font-medium rounded-sm tracking-wide overflow-hidden transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#1E5FBF] focus-visible:outline-offset-2 select-none cursor-pointer';

  const classes = cn(base, variantStyles[variant], sizeStyles[size], className);

  const fillVariantColor =
    variant === 'primary'
      ? 'bg-[#0D1B2A]'
      : variant === 'secondary'
      ? 'bg-[#0B1A2E]'
      : 'bg-[#0D1B2A]';

  const content = (
    <>
      {/* Center-emerging dark blue fill ripple on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden"
      >
        <span
          className={cn(
            'w-0 h-0 rounded-full transition-all duration-550 ease-out group-hover:w-[400px] group-hover:h-[400px] group-active:w-[450px] group-active:h-[450px]',
            fillVariantColor
          )}
        />
      </span>

      {/* Button content on top of emerging background */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2 transition-colors duration-200">
        {children}
      </span>
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }

    if (href.startsWith('#')) {
      const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const id = href.replace('#', '');
        const elem = document.getElementById(id);
        if (elem) {
          e.preventDefault();
          const yOffset = -90; // offset for sticky header height
          const y = elem.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };

      // Fallback target page if anchor not present on current route
      const fallbackHref = href === '#packages' ? '/pricing#packages' : href === '#services' ? '/#services' : href;

      return (
        <Link href={fallbackHref} onClick={handleHashClick} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
