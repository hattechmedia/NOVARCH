'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck } from 'lucide-react';

interface ProcessNodeProps {
  label: string;
  sublabel?: string;
  isHumanApproval?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function ProcessNode({
  label,
  sublabel,
  isHumanApproval = false,
  isActive = false,
  onClick,
  icon,
}: ProcessNodeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-sm border transition-all duration-300 select-none cursor-pointer',
        isHumanApproval
          ? 'bg-[#0F2540] border-[#38B2D8] text-white shadow-md shadow-[#38B2D8]/10 pulse-cyan ring-1 ring-[#38B2D8]/50'
          : isActive
          ? 'bg-[#FAFBFC] border-[#1E5FBF] shadow-md shadow-[#1E5FBF]/10'
          : 'bg-[#FAFBFC] border-[#D1DAE6] hover:border-[#1E5FBF]/40 hover:bg-[#EEF1F5]'
      )}
    >
      {isHumanApproval && (
        <span className="absolute -top-2.5 bg-[#38B2D8] text-[#0D1B2A] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" /> Control Gate
        </span>
      )}
      <div className="flex items-center gap-2 mb-1">
        {icon && (
          <span
            className={cn(
              'h-4 w-4 flex items-center justify-center',
              isHumanApproval ? 'text-[#38B2D8]' : isActive ? 'text-[#1E5FBF]' : 'text-[#7A8FA6]'
            )}
          >
            {icon}
          </span>
        )}
        <span
          className={cn(
            'text-xs sm:text-sm font-semibold tracking-tight',
            isHumanApproval ? 'text-white font-bold' : 'text-[#0D1B2A]'
          )}
        >
          {label}
        </span>
      </div>
      {sublabel && (
        <span
          className={cn(
            'text-[11px] text-center leading-tight',
            isHumanApproval ? 'text-[#A8E0F0]' : 'text-[#7A8FA6]'
          )}
        >
          {sublabel}
        </span>
      )}
    </div>
  );
}
