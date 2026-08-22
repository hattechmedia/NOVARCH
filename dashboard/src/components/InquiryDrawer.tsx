import React, { useState } from 'react';
import {
  X,
  Mail,
  Building,
  Calendar,
  Check,
  Trash2,
  Phone,
  Layers,
  MessageSquare,
  Sparkles,
  Zap,
  Copy,
  ExternalLink,
} from 'lucide-react';
import { ContactInquiry, LeadStatus } from '../types';
import { StatusBadge } from './StatusBadge';

interface InquiryDrawerProps {
  inquiry: ContactInquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Closed'];

export const InquiryDrawer: React.FC<InquiryDrawerProps> = ({
  inquiry,
  onClose,
  onUpdateStatus,
  onDelete,
}) => {
  const [copied, setCopied] = useState(false);

  if (!inquiry) return null;

  const isServiceLead = inquiry.submissionType === 'service_lead';

  const handleCopyDetails = () => {
    const text = `NOVARCH Lead Record:
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Company: ${inquiry.company || 'N/A'}
Type: ${inquiry.submissionType}
Service: ${inquiry.preferredService || inquiry.serviceType}
Plan: ${inquiry.planName || 'N/A'} (${inquiry.planPrice || '$' + inquiry.estimatedValue})
Status: ${inquiry.status}
Notes/Message: ${inquiry.news || inquiry.message || 'N/A'}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in select-none">
      <div className="w-full max-w-xl bg-[#080E18] border-l border-[#17304E] p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-y-auto relative">
        {/* Subtle top edge glow */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#1E5FBF] via-[#38B2D8] to-transparent" />

        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#17304E]/80 pb-4">
            <div className="flex items-center gap-2.5">
              <StatusBadge status={inquiry.status} />
              <span className="text-[11px] font-mono text-[#64748B]">ID: {inquiry.id.slice(0, 12)}</span>
            </div>

            {/* Type Indicator Pill */}
            {isServiceLead ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#1E5FBF]/25 border border-[#38B2D8]/50 px-3 py-0.5 text-[10px] font-mono font-bold text-[#38B2D8]">
                <Zap className="h-3 w-3" />
                SERVICE PACKAGE LEAD
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                <MessageSquare className="h-3 w-3" />
                CONTACT MESSAGE
              </span>
            )}

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-[#7A8FA6] hover:bg-[#17304E] hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Submitter Title & Value Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">{inquiry.name}</h2>
              {inquiry.company ? (
                <div className="flex items-center gap-1.5 mt-1 text-sm text-[#38B2D8] font-medium">
                  <Building className="h-4 w-4 text-[#38B2D8]" />
                  <span>{inquiry.company}</span>
                </div>
              ) : (
                <p className="text-xs text-[#7A8FA6] mt-1 font-mono">Direct Website Submitter</p>
              )}
            </div>

            <div className="rounded-xl bg-[#0D1826] border border-[#17304E] px-4 py-2.5 text-right flex-shrink-0">
              <span className="text-[10px] font-mono uppercase text-[#7A8FA6] font-bold block">
                Est. Pipeline Value
              </span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                ${(inquiry.estimatedValue || 0).toLocaleString()}
              </span>
            </div>
          </div>

          {/* Contact Actions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
            <a
              href={`mailto:${inquiry.email}?subject=NOVARCH — Follow-up regarding your inquiry`}
              className="flex items-center justify-between rounded-xl bg-[#0D1826] border border-[#17304E] p-3 text-[#CBD5E1] hover:text-white hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <Mail className="h-4 w-4 text-[#38B2D8] flex-shrink-0" />
                <span className="truncate">{inquiry.email}</span>
              </div>
              <ExternalLink className="h-3 w-3 text-[#64748B] group-hover:text-[#38B2D8] flex-shrink-0 ml-1" />
            </a>

            {inquiry.phone ? (
              <a
                href={`tel:${inquiry.phone}`}
                className="flex items-center justify-between rounded-xl bg-[#0D1826] border border-[#17304E] p-3 text-[#CBD5E1] hover:text-white hover:border-emerald-500/50 hover:bg-[#122238] transition-all group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{inquiry.phone}</span>
                </div>
                <ExternalLink className="h-3 w-3 text-[#64748B] group-hover:text-emerald-400 flex-shrink-0 ml-1" />
              </a>
            ) : (
              <div className="flex items-center gap-2 rounded-xl bg-[#0D1826]/40 border border-[#17304E]/40 p-3 text-[#64748B]">
                <Phone className="h-4 w-4 text-[#64748B] flex-shrink-0" />
                <span>No phone provided</span>
              </div>
            )}
          </div>

          {/* SPECIFIC VIEW: Service Package Lead vs Contact Message */}
          {isServiceLead ? (
            <div className="space-y-4">
              {/* Package Details Box */}
              <div className="rounded-2xl bg-gradient-to-br from-[#0F2540] via-[#0B1A2E] to-[#0D1826] border border-[#38B2D8]/40 p-5 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#38B2D8] uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    {inquiry.planTier || 'Package'} Tier Booking
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-400">
                    {inquiry.planPrice || `$${(inquiry.estimatedValue || 0).toLocaleString()}`}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">
                  {inquiry.planName || `${inquiry.preferredService} Package`}
                </h3>

                <p className="text-xs text-[#94A3B8] mb-3">
                  Service Category:{' '}
                  <span className="text-white font-semibold">
                    {inquiry.preferredService || inquiry.serviceType}
                  </span>
                </p>

                {inquiry.performances && inquiry.performances.length > 0 && (
                  <div className="pt-3 border-t border-[#17304E]/80">
                    <span className="text-[10px] font-mono uppercase text-[#7A8FA6] font-bold block mb-2">
                      Selected Performance Requirements:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {inquiry.performances.map((perf) => (
                        <span
                          key={perf}
                          className="rounded-lg bg-[#080E18] border border-[#38B2D8]/30 px-2.5 py-1 text-[11px] font-mono text-[#D0E4FF]"
                        >
                          {perf}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Requirements / Client Notes */}
              <div className="rounded-xl bg-[#0B1524] border border-[#17304E] p-4">
                <span className="text-[10px] font-mono uppercase text-[#7A8FA6] font-bold block mb-1.5">
                  Client Project Requirements & Notes
                </span>
                <p className="text-xs text-white leading-relaxed whitespace-pre-wrap">
                  {inquiry.news || inquiry.message || 'No additional notes specified.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Selected Categories */}
              {inquiry.performances && inquiry.performances.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#7A8FA6] mb-2.5">
                    <Layers className="h-4 w-4 text-[#38B2D8]" />
                    <span>Inquiry Focus Areas</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {inquiry.performances.map((perf) => (
                      <span
                        key={perf}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#1E5FBF]/20 border border-[#38B2D8]/40 px-3 py-1.5 text-xs font-medium text-white shadow-sm"
                      >
                        <Sparkles className="h-3 w-3 text-[#38B2D8]" />
                        {perf}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Content */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-[#7A8FA6] mb-2">
                  <MessageSquare className="h-4 w-4 text-emerald-400" />
                  <span>Full Message Content</span>
                </div>
                <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-5 text-xs text-[#E2E8F0] leading-relaxed whitespace-pre-wrap font-sans">
                  {inquiry.news || inquiry.message || 'No message body provided.'}
                </div>
              </div>
            </div>
          )}

          {/* Metadata & Copy Action */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#64748B] border-t border-[#17304E]/80 pt-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(inquiry.createdAt).toLocaleString()}
            </span>

            <button
              onClick={handleCopyDetails}
              className="flex items-center gap-1 text-[#38B2D8] hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Record Details</span>
                </>
              )}
            </button>
          </div>

          {/* Lead Status Pipeline Updater */}
          <div className="pt-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A8FA6] block mb-2">
              Update Pipeline Status
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusOptions.map((st) => {
                const isCurrent = inquiry.status === st;
                return (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus(inquiry.id, st)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-mono transition-all cursor-pointer border ${
                      isCurrent
                        ? 'bg-[#1E5FBF] text-white border-[#38B2D8] font-bold shadow-md shadow-[#1E5FBF]/30'
                        : 'bg-[#0D1826] text-[#94A3B8] border-[#17304E] hover:bg-[#122238] hover:text-white'
                    }`}
                  >
                    <span>{st}</span>
                    {isCurrent && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="mt-8 pt-4 border-t border-[#17304E]/80 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm(`Are you sure you want to permanently delete the inquiry from ${inquiry.name}?`)) {
                onDelete(inquiry.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Lead Record</span>
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-[#17304E] hover:bg-[#1E5FBF] px-5 py-2 text-xs font-bold text-white transition-all cursor-pointer shadow-md"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
