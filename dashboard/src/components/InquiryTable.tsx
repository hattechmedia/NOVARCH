import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ContactInquiry, LeadStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import {
  ChevronRight,
  Zap,
  MessageSquare,
  Layers,
  Search,
  Download,
  Building,
  Mail,
  Calendar,
  DollarSign,
  Filter,
} from 'lucide-react';

interface InquiryTableProps {
  inquiries: ContactInquiry[];
  allInquiriesCount: number;
  serviceLeadsCount: number;
  messagesCount: number;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSelectInquiry?: (inquiry: ContactInquiry) => void;
  onUpdateStatus?: (id: string, status: LeadStatus) => void;
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Closed'];

export const InquiryTable: React.FC<InquiryTableProps> = React.memo(({
  inquiries,
  allInquiriesCount,
  serviceLeadsCount,
  messagesCount,
  selectedStatus,
  setSelectedStatus,
  selectedCategory,
  setSelectedCategory,
  searchQuery = '',
  setSearchQuery,
  onSelectInquiry,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (inq: ContactInquiry) => {
    if (onSelectInquiry) onSelectInquiry(inq);
    navigate(`/inquiry/${inq.id}`);
  };
  // Category tabs with exact live counters
  const categoryTabs = [
    { id: 'all', label: 'All Submissions', icon: Layers, count: allInquiriesCount },
    { id: 'service_lead', label: 'Service Package Leads', icon: Zap, count: serviceLeadsCount, activeColor: 'bg-[#1E5FBF] text-white' },
    { id: 'message', label: 'Contact Messages', icon: MessageSquare, count: messagesCount, activeColor: 'bg-emerald-600 text-white' },
  ];

  // CSV Export utility
  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Type', 'Name', 'Email', 'Phone', 'Company', 'Service', 'Plan', 'Est Value', 'Status', 'Date'];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.submissionType,
      `"${inq.name.replace(/"/g, '""')}"`,
      inq.email,
      inq.phone || '',
      `"${(inq.company || '').replace(/"/g, '""')}"`,
      `"${(inq.preferredService || inq.serviceType || '').replace(/"/g, '""')}"`,
      `"${(inq.planName || '').replace(/"/g, '""')}"`,
      inq.estimatedValue,
      inq.status,
      new Date(inq.createdAt).toISOString(),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `novarch_${selectedCategory}_inquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate Avatar Initials
  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  // Color map for avatar
  const getAvatarGradient = (type: string) => {
    if (type === 'service_lead') return 'from-[#1E5FBF] to-[#38B2D8]';
    return 'from-emerald-600 to-teal-400';
  };

  return (
    <div className="rounded-2xl bg-[#0B1524]/90 border border-[#17304E] shadow-xl overflow-hidden backdrop-blur-md">
      {/* Table Toolbar Header */}
      <div className="p-5 border-b border-[#17304E]/80 space-y-4">
        {/* Top bar: Title + Search & Category Switcher */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-tight">
                {selectedCategory === 'service_lead'
                  ? 'Service Package Leads'
                  : selectedCategory === 'message'
                  ? 'Website Contact Messages'
                  : 'Inquiries & Leads Stream'}
              </h2>
              <span className="rounded-full bg-[#17304E] px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#38B2D8]">
                {inquiries.length} {inquiries.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            <p className="text-xs text-[#7A8FA6] mt-1 font-medium">
              {selectedCategory === 'service_lead'
                ? 'Direct package bookings, tier selections and scope requirements'
                : selectedCategory === 'message'
                ? 'General inquiries and custom consulting requests from the contact form'
                : 'Unified stream of all incoming package leads and contact messages'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            {setSearchQuery && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search name, company, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-[#060D17] border border-[#17304E] pl-9 pr-8 py-2 text-xs text-white placeholder-[#475569] focus:border-[#38B2D8] focus:ring-1 focus:ring-[#38B2D8]/40 focus:outline-none transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#64748B] hover:text-white"
                  >
                    &times;
                  </button>
                )}
              </div>
            )}

            {/* Category Selector Tabs */}
            <div className="flex items-center gap-1 bg-[#060D17] p-1 rounded-xl border border-[#17304E] overflow-x-auto">
              {categoryTabs.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? cat.activeColor || 'bg-[#1E5FBF] text-white font-bold shadow-md'
                        : 'text-[#94A3B8] hover:text-white hover:bg-[#0F1E33]'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{cat.label}</span>
                    <span
                      className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected
                          ? 'bg-black/25 text-white'
                          : 'bg-[#17304E] text-[#7A8FA6]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              disabled={inquiries.length === 0}
              className="flex items-center gap-1.5 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-2 text-xs font-mono text-[#94A3B8] hover:text-white hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Export filtered records to CSV"
            >
              <Download className="h-3.5 w-3.5 text-[#38B2D8]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center justify-between border-t border-[#17304E]/70 pt-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-[10px] font-mono uppercase font-bold text-[#64748B] mr-1 flex items-center gap-1">
              <Filter className="h-3 w-3 text-[#38B2D8]" />
              Status:
            </span>

            {['All', ...statusOptions].map((tab) => {
              const isSelected = selectedStatus === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#1E5FBF]/25 text-[#38B2D8] border border-[#38B2D8]/60 font-bold shadow-sm'
                      : 'bg-[#060D17] text-[#94A3B8] hover:bg-[#17304E] hover:text-white border border-[#17304E]/60'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          <span className="text-[11px] font-mono text-[#64748B]">
            Showing {inquiries.length} result{inquiries.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#060D17]/90 text-[11px] font-mono uppercase text-[#7A8FA6] border-b border-[#17304E]">
            <tr>
              <th className="px-5 py-3.5 font-semibold">Client / Company</th>
              <th className="px-5 py-3.5 font-semibold">Category & Scope</th>
              <th className="px-5 py-3.5 font-semibold">Service Line</th>
              <th className="px-5 py-3.5 font-semibold">Est. Pipeline</th>
              <th className="px-5 py-3.5 font-semibold">Status</th>
              <th className="px-5 py-3.5 font-semibold">Submitted</th>
              <th className="px-5 py-3.5 text-right font-semibold">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#17304E]/60 text-white/90">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-xs font-mono text-[#64748B]">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Layers className="h-8 w-8 text-[#17304E]" />
                    <p className="font-semibold text-[#94A3B8]">No submissions found</p>
                    <p className="text-[11px] text-[#64748B]">
                      {searchQuery
                        ? `No results matching "${searchQuery}" in ${selectedCategory} category.`
                        : 'New website leads will populate here in real-time.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => {
                const isServiceLead = inq.submissionType === 'service_lead';

                return (
                  <tr
                    key={inq.id}
                    onClick={() => handleRowClick(inq)}
                    className="hover:bg-[#122238]/70 transition-colors cursor-pointer group"
                  >
                    {/* 1. Client / Company */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${getAvatarGradient(
                            inq.submissionType
                          )} text-white font-mono font-bold text-xs shadow-sm flex-shrink-0`}
                        >
                          {getInitials(inq.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-bold text-white group-hover:text-[#38B2D8] transition-colors truncate">
                            {inq.name}
                          </div>
                          <div className="text-[11px] text-[#7A8FA6] font-mono mt-0.5 flex items-center gap-1 truncate">
                            {inq.company ? (
                              <>
                                <Building className="h-3 w-3 text-[#64748B] flex-shrink-0" />
                                <span className="truncate">{inq.company}</span>
                              </>
                            ) : (
                              <>
                                <Mail className="h-3 w-3 text-[#64748B] flex-shrink-0" />
                                <span className="truncate">{inq.email}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* 2. Category & Scope */}
                    <td className="px-5 py-4">
                      {isServiceLead ? (
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1 w-fit rounded-full bg-[#1E5FBF]/25 border border-[#38B2D8]/50 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#38B2D8]">
                            <Zap className="h-3 w-3" />
                            SERVICE LEAD
                          </span>
                          <span className="text-xs font-semibold text-white">
                            {inq.planName || 'Package Lead'} {inq.planPrice ? `(${inq.planPrice})` : ''}
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1 w-fit rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2.5 py-0.5 text-[10px] font-mono font-bold text-emerald-400">
                            <MessageSquare className="h-3 w-3" />
                            CONTACT MESSAGE
                          </span>
                          <span className="text-[11px] text-[#94A3B8] line-clamp-1 max-w-[220px]">
                            {inq.news || inq.message || 'Direct Website Inquiry'}
                          </span>
                        </div>
                      )}
                    </td>

                    {/* 3. Service Line */}
                    <td className="px-5 py-4">
                      <span className="inline-block rounded-lg bg-[#0E1B2C] border border-[#17304E] px-2.5 py-1 text-[11px] font-mono text-[#CBD5E1]">
                        {inq.preferredService || inq.serviceType || 'General Inquiry'}
                      </span>
                    </td>

                    {/* 4. Est. Pipeline */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 font-mono font-bold text-emerald-400 text-sm">
                        <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                        <span>{(inq.estimatedValue || 0).toLocaleString()}</span>
                      </div>
                    </td>

                    {/* 5. Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={inq.status} />
                    </td>

                    {/* 6. Date */}
                    <td className="px-5 py-4 text-[11px] font-mono text-[#7A8FA6]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3 text-[#64748B]" />
                        <span>
                          {new Date(inq.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </td>

                    {/* 7. Action */}
                    <td className="px-5 py-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(inq);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-[#0E1B2C] border border-[#17304E] px-2.5 py-1 text-[11px] font-mono text-[#38B2D8] hover:bg-[#1E5FBF]/25 hover:border-[#38B2D8]/50 transition-all cursor-pointer"
                      >
                        <span>Inspect</span>
                        <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

InquiryTable.displayName = 'InquiryTable';
