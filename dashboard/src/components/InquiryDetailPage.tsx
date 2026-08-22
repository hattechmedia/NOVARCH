import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ContactInquiry, LeadStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import {
  ArrowLeft,
  Mail,
  Phone,
  Building,
  Calendar,
  DollarSign,
  Zap,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
  Trash2,
  ExternalLink,
  ShieldCheck,
  FileText,
  CreditCard,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface InquiryDetailPageProps {
  inquiries: ContactInquiry[];
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  onDelete: (id: string) => void;
}

const statusSteps: LeadStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Closed'];

export const InquiryDetailPage: React.FC<InquiryDetailPageProps> = ({
  inquiries,
  onUpdateStatus,
  onDelete,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [inquiry, setInquiry] = useState<ContactInquiry | null>(() => {
    return inquiries.find((i) => i.id === id) || null;
  });
  const [loading, setLoading] = useState(!inquiry);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (id) {
      const found = inquiries.find((i) => i.id === id);
      if (found) {
        setInquiry(found);
        setLoading(false);
      } else {
        // Fetch from API
        api
          .getContacts()
          .then((list) => {
            const match = list.find((i) => i.id === id);
            if (match) {
              setInquiry(match);
            }
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }
    }
  }, [id, inquiries]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050A12] text-white flex items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-full border-2 border-[#1E5FBF] border-t-[#38B2D8] animate-spin" />
          <p className="text-xs font-mono text-[#7A8FA6]">Loading lead record details...</p>
        </div>
      </div>
    );
  }

  if (!inquiry) {
    return (
      <div className="min-h-screen bg-[#050A12] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl bg-[#0B1524] border border-[#17304E] p-8 text-center space-y-4 shadow-2xl">
          <div className="h-12 w-12 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
            <FileText className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-bold text-white">Lead Record Not Found</h2>
          <p className="text-xs text-[#7A8FA6]">
            The inquiry with ID <span className="font-mono text-[#38B2D8]">{id}</span> does not exist or was deleted.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1E5FBF] px-4 py-2 text-xs font-mono font-bold text-white hover:bg-[#2563EB] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isServiceLead = inquiry.submissionType === 'service_lead';

  const handleCopyDetails = () => {
    const text = `NOVARCH Lead Record:
ID: ${inquiry.id}
Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Company: ${inquiry.company || 'N/A'}
Category: ${isServiceLead ? 'Service Package Lead' : 'Contact Message'}
Service Line: ${inquiry.preferredService || inquiry.serviceType}
Package / Plan: ${inquiry.planName || 'N/A'} (${inquiry.planPrice || '$' + inquiry.estimatedValue})
Estimated Pipeline Value: $${(inquiry.estimatedValue || 0).toLocaleString()}
Status: ${inquiry.status}
Created At: ${new Date(inquiry.createdAt).toLocaleString()}
Client Notes: ${inquiry.news || inquiry.message || 'N/A'}
`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (newStatus: LeadStatus) => {
    onUpdateStatus(inquiry.id, newStatus);
    setInquiry((prev) => (prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null));
  };

  const handleDeleteRecord = () => {
    if (confirm(`Permanently delete lead record for ${inquiry.name}?`)) {
      onDelete(inquiry.id);
      navigate('/');
    }
  };

  // Generate Avatar Initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#050A12] text-white flex flex-col selection:bg-[#1E5FBF] select-none">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#17304E]/80 bg-[#070D17]/95 px-4 sm:px-8 py-3.5 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-1.5 text-xs font-mono text-[#CBD5E1] hover:text-white hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all cursor-pointer group"
          >
            <ArrowLeft className="h-4 w-4 text-[#7A8FA6] group-hover:text-[#38B2D8] transition-colors" />
            <span>Back</span>
          </button>

          <span className="h-4 w-[1px] bg-[#17304E]" />

          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#7A8FA6]">
            <Link to="/" className="hover:text-[#38B2D8] transition-colors">
              Command Center
            </Link>
            <span>/</span>
            <span className="text-[#94A3B8]">
              {isServiceLead ? 'Service Leads' : 'Contact Messages'}
            </span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-[150px] sm:max-w-xs">
              {inquiry.name}
            </span>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyDetails}
            className="flex items-center gap-1.5 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-1.5 text-xs font-mono text-[#CBD5E1] hover:text-[#38B2D8] hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[#38B2D8]" />
                <span className="hidden sm:inline">Copy Record</span>
              </>
            )}
          </button>

          <button
            onClick={handleDeleteRecord}
            className="flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/30 px-3 py-1.5 text-xs font-mono text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-all cursor-pointer"
            title="Delete this lead record"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </header>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Hero Header Card */}
        <div className="relative overflow-hidden rounded-2xl bg-[#0B1524]/90 border border-[#17304E] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          {/* Ambient Top Glow */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-48 w-48 rounded-full bg-[#1E5FBF]/20 blur-3xl pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#1E5FBF] via-[#38B2D8] to-transparent pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Lead Info */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div
                className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${
                  isServiceLead ? 'from-[#1E5FBF] to-[#38B2D8]' : 'from-emerald-600 to-teal-400'
                } text-white font-mono font-bold text-xl sm:text-2xl shadow-lg flex-shrink-0`}
              >
                {getInitials(inquiry.name)}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {inquiry.name}
                  </h1>

                  {isServiceLead ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#1E5FBF]/25 border border-[#38B2D8]/50 px-3 py-1 text-[11px] font-mono font-bold text-[#38B2D8]">
                      <Zap className="h-3.5 w-3.5" />
                      SERVICE PACKAGE LEAD
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 px-3 py-1 text-[11px] font-mono font-bold text-emerald-400">
                      <MessageSquare className="h-3.5 w-3.5" />
                      CONTACT MESSAGE
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#7A8FA6]">
                  {inquiry.company && (
                    <div className="flex items-center gap-1.5 text-[#38B2D8] font-semibold">
                      <Building className="h-3.5 w-3.5" />
                      <span>{inquiry.company}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    <span>{inquiry.email}</span>
                  </div>

                  {inquiry.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{inquiry.phone}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(inquiry.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pipeline Value & Status Overview */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              <div className="rounded-2xl bg-[#060D17] border border-[#17304E] p-4 text-right">
                <span className="text-[10px] font-mono uppercase text-[#7A8FA6] font-bold block mb-1">
                  Est. Pipeline Value
                </span>
                <div className="flex items-center justify-end gap-1 text-2xl sm:text-3xl font-mono font-bold text-emerald-400">
                  <DollarSign className="h-6 w-6 text-emerald-500" />
                  <span>{(inquiry.estimatedValue || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-[#060D17] border border-[#17304E] p-4 flex flex-col justify-between">
                <span className="text-[10px] font-mono uppercase text-[#7A8FA6] font-bold block mb-1">
                  Current Status
                </span>
                <StatusBadge status={inquiry.status} />
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left / Main Section (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* SPECIFIC VIEW: Service Package Lead vs Contact Message */}
            {isServiceLead ? (
              <>
                {/* Package Booking Details Box */}
                <div className="rounded-2xl bg-gradient-to-br from-[#0F2540] via-[#0B1A2E] to-[#0D1826] border border-[#38B2D8]/40 p-6 sm:p-7 shadow-xl relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#38B2D8] uppercase tracking-wider">
                      <Sparkles className="h-4 w-4" />
                      {inquiry.planTier || 'Package'} Tier Booking
                    </span>
                    <span className="text-xl font-bold font-mono text-emerald-400">
                      {inquiry.planPrice || `$${(inquiry.estimatedValue || 0).toLocaleString()}`}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-1.5">
                    {inquiry.planName || `${inquiry.preferredService} Package`}
                  </h2>

                  <p className="text-xs text-[#94A3B8] mb-4">
                    Service Line:{' '}
                    <span className="text-white font-semibold">
                      {inquiry.preferredService || inquiry.serviceType}
                    </span>
                  </p>

                  {/* Payment & Provisioning Status */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="rounded-xl bg-[#060D17]/80 border border-[#17304E] p-3 flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#38B2D8]">
                        <CreditCard className="h-4 w-4" />
                        Stripe Integration
                      </span>
                      <span className="text-emerald-400 font-semibold">Ready for Invoice</span>
                    </div>

                    <div className="rounded-xl bg-[#060D17]/80 border border-[#17304E] p-3 flex items-center justify-between text-xs font-mono">
                      <span className="flex items-center gap-1.5 text-[#38B2D8]">
                        <ShieldCheck className="h-4 w-4" />
                        Architecture Scope
                      </span>
                      <span className="text-[#94A3B8] font-semibold">Triage Pending</span>
                    </div>
                  </div>

                  {/* Selected Performance Requirements */}
                  {inquiry.performances && inquiry.performances.length > 0 && (
                    <div className="pt-4 border-t border-[#17304E]/80">
                      <span className="text-[11px] font-mono uppercase text-[#7A8FA6] font-bold block mb-2.5">
                        Selected Deliverables & Modules:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {inquiry.performances.map((perf) => (
                          <span
                            key={perf}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#060D17] border border-[#38B2D8]/40 px-3 py-1.5 text-xs font-mono text-[#D0E4FF] shadow-sm"
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 text-[#38B2D8]" />
                            {perf}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Client Notes & Project Requirements */}
                <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-6 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#7A8FA6] flex items-center gap-2">
                      <FileText className="h-4 w-4 text-[#38B2D8]" />
                      Client Project Requirements & Notes
                    </h3>
                    <span className="text-[10px] font-mono text-[#64748B]">Submitted in form</span>
                  </div>

                  <div className="rounded-xl bg-[#060D17] border border-[#17304E] p-5 text-xs text-[#E2E8F0] leading-relaxed whitespace-pre-wrap font-sans">
                    {inquiry.news || inquiry.message || 'No additional project specifications provided in submission.'}
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Contact Message Details */}
                <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-6 sm:p-7 shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#17304E]/80 pb-3">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-emerald-400" />
                      Website Contact Message Body
                    </h2>
                    <span className="text-[11px] font-mono text-[#64748B]">Direct Intake</span>
                  </div>

                  <div className="rounded-2xl bg-[#060D17] border border-[#17304E] p-6 text-sm text-[#E2E8F0] leading-relaxed whitespace-pre-wrap font-sans">
                    {inquiry.news || inquiry.message || 'No message content provided.'}
                  </div>

                  {inquiry.performances && inquiry.performances.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[11px] font-mono uppercase text-[#7A8FA6] font-bold block mb-2">
                        Target Categories Checked:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {inquiry.performances.map((perf) => (
                          <span
                            key={perf}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#1E5FBF]/20 border border-[#38B2D8]/40 px-3 py-1.5 text-xs font-mono text-white shadow-sm"
                          >
                            <Sparkles className="h-3 w-3 text-[#38B2D8]" />
                            {perf}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Suggested Architecture Next Steps */}
            <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#7A8FA6] flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#38B2D8]" />
                Recommended Next Steps
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`mailto:${inquiry.email}?subject=NOVARCH Architecture Discovery Call for ${inquiry.name}`}
                  className="rounded-xl bg-[#060D17] border border-[#17304E] p-4 text-left hover:border-[#38B2D8]/50 hover:bg-[#0E1B2C] transition-all group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white group-hover:text-[#38B2D8] transition-colors">
                      1. Discovery Call
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#38B2D8]" />
                  </div>
                  <p className="text-[11px] text-[#7A8FA6] leading-relaxed">
                    Schedule initial 30-min architecture consultation with client.
                  </p>
                </a>

                <div className="rounded-xl bg-[#060D17] border border-[#17304E] p-4 text-left">
                  <span className="text-xs font-bold text-white block mb-1.5">
                    2. Proposal & SOW
                  </span>
                  <p className="text-[11px] text-[#7A8FA6] leading-relaxed">
                    Draft technical statement of work for {inquiry.preferredService || 'Service'}.
                  </p>
                </div>

                <div className="rounded-xl bg-[#060D17] border border-[#17304E] p-4 text-left">
                  <span className="text-xs font-bold text-white block mb-1.5">
                    3. Contract Closure
                  </span>
                  <p className="text-[11px] text-[#7A8FA6] leading-relaxed">
                    Finalize payment milestone & begin architecture sprint.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column / Sidebar Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Contact Box */}
            <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-5 shadow-xl space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A8FA6]">
                Client Communication
              </h3>

              <div className="space-y-2.5">
                <a
                  href={`mailto:${inquiry.email}?subject=NOVARCH follow-up`}
                  className="flex items-center justify-between rounded-xl bg-[#060D17] border border-[#17304E] p-3 text-xs font-mono text-[#CBD5E1] hover:text-white hover:border-[#38B2D8]/60 hover:bg-[#0E1B2C] transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="h-7 w-7 rounded-lg bg-[#1E5FBF]/20 text-[#38B2D8] flex items-center justify-center flex-shrink-0">
                      <Mail className="h-3.5 w-3.5" />
                    </div>
                    <span className="truncate">{inquiry.email}</span>
                  </div>
                  <ExternalLink className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#38B2D8] flex-shrink-0" />
                </a>

                {inquiry.phone ? (
                  <a
                    href={`tel:${inquiry.phone}`}
                    className="flex items-center justify-between rounded-xl bg-[#060D17] border border-[#17304E] p-3 text-xs font-mono text-[#CBD5E1] hover:text-white hover:border-emerald-500/60 hover:bg-[#0E1B2C] transition-all group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="h-7 w-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-3.5 w-3.5" />
                      </div>
                      <span className="truncate">{inquiry.phone}</span>
                    </div>
                    <ExternalLink className="h-3.5 w-3.5 text-[#64748B] group-hover:text-emerald-400 flex-shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-2.5 rounded-xl bg-[#060D17]/50 border border-[#17304E]/50 p-3 text-xs font-mono text-[#64748B]">
                    <Phone className="h-3.5 w-3.5" />
                    <span>No phone number provided</span>
                  </div>
                )}
              </div>
            </div>

            {/* Pipeline Status Controller */}
            <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-5 shadow-xl space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A8FA6]">
                Pipeline Lifecycle Stage
              </h3>

              <div className="space-y-2">
                {statusSteps.map((st) => {
                  const isCurrent = inquiry.status === st;
                  return (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(st)}
                      className={`flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-mono transition-all cursor-pointer border ${
                        isCurrent
                          ? 'bg-[#1E5FBF] text-white border-[#38B2D8] font-bold shadow-md shadow-[#1E5FBF]/30'
                          : 'bg-[#060D17] text-[#94A3B8] border-[#17304E] hover:bg-[#0E1B2C] hover:text-white'
                      }`}
                    >
                      <span>{st}</span>
                      {isCurrent && <Check className="h-4 w-4" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Record Metadata Box */}
            <div className="rounded-2xl bg-[#0B1524] border border-[#17304E] p-5 shadow-xl space-y-3 text-xs font-mono">
              <h3 className="text-[10px] uppercase font-bold text-[#7A8FA6] tracking-wider">
                System Record Audit
              </h3>

              <div className="space-y-2 text-[#94A3B8]">
                <div className="flex justify-between py-1 border-b border-[#17304E]/50">
                  <span className="text-[#64748B]">Record ID:</span>
                  <span className="text-white">{inquiry.id}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#17304E]/50">
                  <span className="text-[#64748B]">Source:</span>
                  <span className="text-white">{inquiry.source || 'Website Form'}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#17304E]/50">
                  <span className="text-[#64748B]">Created:</span>
                  <span className="text-white">{new Date(inquiry.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#64748B]">Last Updated:</span>
                  <span className="text-white">{new Date(inquiry.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
