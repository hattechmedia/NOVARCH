import React from 'react';
import { LeadStatus } from '../types';

interface StatusBadgeProps {
  status: LeadStatus;
}

const statusConfig: Record<
  LeadStatus,
  { label: string; bg: string; text: string; border: string; dot: string }
> = {
  New: {
    label: 'New Lead',
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  Contacted: {
    label: 'Contacted',
    bg: 'bg-blue-500/10',
    text: 'text-blue-400',
    border: 'border-blue-500/30',
    dot: 'bg-blue-400',
  },
  'Proposal Sent': {
    label: 'Proposal Sent',
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-400',
  },
  Closed: {
    label: 'Closed Deal',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    border: 'border-purple-500/30',
    dot: 'bg-purple-400',
  },
  Paid: {
    label: 'Payment Accepted',
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-300',
    border: 'border-emerald-500/40',
    dot: 'bg-emerald-400',
  },
  'Payment Declined': {
    label: 'Payment Declined',
    bg: 'bg-red-500/15',
    text: 'text-red-400',
    border: 'border-red-500/40',
    dot: 'bg-red-400',
  },
  'Payment Pending': {
    label: 'Payment Pending',
    bg: 'bg-amber-500/15',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
    dot: 'bg-amber-400',
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = React.memo(({ status }) => {
  const config = statusConfig[status] || statusConfig.New;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${config.bg} ${config.text} ${config.border}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
});

StatusBadge.displayName = 'StatusBadge';
