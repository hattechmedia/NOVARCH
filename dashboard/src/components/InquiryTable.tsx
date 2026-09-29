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
  hideCategorySwitcher?: boolean;
}

const statusOptions: LeadStatus[] = ['New', 'Contacted', 'Proposal Sent', 'Closed', 'Paid', 'Payment Declined', 'Payment Pending'];

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
  hideCategorySwitcher = false,
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

  // Name-based unique gradient — lively but theme-matched
  const getAvatarGradient = (name: string): string => {
    const palettes = [
      'linear-gradient(135deg,#6D28D9,#A78BFA)',  // violet
      'linear-gradient(135deg,#B45309,#FCD34D)',  // amber
      'linear-gradient(135deg,#9D174D,#FB7185)',  // rose
      'linear-gradient(135deg,#0E7490,#67E8F9)',  // cyan
      'linear-gradient(135deg,#3730A3,#818CF8)',  // indigo
      'linear-gradient(135deg,#C2410C,#FB923C)',  // orange
      'linear-gradient(135deg,#0F766E,#5EEAD4)',  // teal
      'linear-gradient(135deg,#86198F,#E879F9)',  // fuchsia
      'linear-gradient(135deg,#0369A1,#38BDF8)',  // sky
      'linear-gradient(135deg,#92400E,#FDE68A)',  // gold
    ];
    const code = name.charCodeAt(0) + (name.charCodeAt(1) || 0);
    return palettes[code % palettes.length];
  };

  return (
    <div className="rounded-2xl bg-[#0B1524]/90 border border-[#17304E] shadow-xl overflow-hidden backdrop-blur-md">
      {/* Table Toolbar Header */}
      <div className="p-5 border-b border-[#17304E]/80 space-y-4">
        {/* Top bar: Title + Search & Category Switcher */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {selectedCategory === 'service_lead'
                  ? 'Service Package Leads'
                  : selectedCategory === 'message'
                  ? 'Website Contact Messages'
                  : 'Inquiries & Leads Stream'}
              </h2>
              <span className="rounded-full bg-[#17304E] px-2.5 py-0.5 text-xs font-mono font-bold text-[#38B2D8]">
                {inquiries.length} {inquiries.length === 1 ? 'Record' : 'Records'}
              </span>
            </div>
            <p className="text-sm text-[#7A8FA6] mt-1 font-medium">
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
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search name, company, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl bg-[#060D17] border border-[#17304E] pl-9 pr-8 py-2 text-sm text-white placeholder-[#475569] focus:border-[#38B2D8] focus:ring-1 focus:ring-[#38B2D8]/40 focus:outline-none transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-[#64748B] hover:text-white"
                  >
                    &times;
                  </button>
                )}
              </div>
            )}

            {/* Category Selector Tabs */}
            {!hideCategorySwitcher && (
              <div className="flex items-center gap-1 bg-[#060D17] p-1 rounded-xl border border-[#17304E] overflow-x-auto">
                {categoryTabs.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-mono transition-all cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? cat.activeColor || 'bg-[#1E5FBF] text-white font-bold shadow-md'
                          : 'text-[#94A3B8] hover:text-white hover:bg-[#0F1E33]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{cat.label}</span>
                      <span
                        className={`ml-1 rounded-full px-2 py-0.5 text-xs font-bold ${
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
            )}

            {/* CSV Export Button */}
            <button
              onClick={handleExportCSV}
              disabled={inquiries.length === 0}
              className="flex items-center gap-1.5 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-2 text-sm font-mono text-[#94A3B8] hover:text-white hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title="Export filtered records to CSV"
            >
              <Download className="h-4 w-4 text-[#38B2D8]" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center justify-between border-t border-[#17304E]/70 pt-3 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-mono uppercase font-bold text-[#64748B] mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5 text-[#38B2D8]" />
              Status:
            </span>

            {['All', ...statusOptions].map((tab) => {
              const isSelected = selectedStatus === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setSelectedStatus(tab)}
                  className={`rounded-lg px-2.5 py-1 text-xs sm:text-sm font-mono transition-all cursor-pointer whitespace-nowrap ${
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

          <span className="text-xs font-mono text-[#64748B]">
            Showing {inquiries.length} result{inquiries.length === 1 ? '' : 's'}
          </span>
        </div>
      </div>

      {/* Card Grid */}
      <div className="p-5">
        {inquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Layers className="h-10 w-10 text-[#17304E]" />
            <p className="text-sm font-semibold text-[#4A6080]">No submissions found</p>
            <p className="text-xs font-mono text-[#2A3F58]">
              {searchQuery
                ? `No results matching "${searchQuery}"`
                : 'New website leads will appear here in real-time.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {inquiries.map((inq) => {
              const isServiceLead = inq.submissionType === 'service_lead';
              const gradient = getAvatarGradient(inq.name);
              const initials = getInitials(inq.name);

              return (
                <InquiryCard
                  key={inq.id}
                  inq={inq}
                  isServiceLead={isServiceLead}
                  gradient={gradient}
                  initials={initials}
                  onClick={() => handleRowClick(inq)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

InquiryTable.displayName = 'InquiryTable';

/* ── Inquiry Square Card ── */
function InquiryCard({
  inq,
  isServiceLead,
  gradient,
  initials,
  onClick,
}: {
  inq: ContactInquiry;
  isServiceLead: boolean;
  gradient: string;
  initials: string;
  onClick: () => void;
}) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
      style={{
        aspectRatio: '1 / 1',
        background: hovered
          ? 'linear-gradient(145deg,rgba(14,27,44,0.98),rgba(10,19,33,1))'
          : 'linear-gradient(145deg,rgba(11,21,36,0.92),rgba(7,13,23,0.97))',
        border: hovered
          ? '1px solid rgba(56,178,216,0.28)'
          : '1px solid rgba(23,48,78,0.6)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.45), 0 0 0 1px rgba(56,178,216,0.07)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Top shimmer bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{ background: gradient, opacity: hovered ? 0.75 : 0 }}
      />

      {/* Body */}
      <div className="flex flex-col items-center justify-center flex-1 px-3 pt-4 pb-2 gap-2 text-center">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="flex items-center justify-center rounded-2xl text-white font-bold font-mono text-base transition-transform duration-300"
            style={{
              background: gradient,
              width: '52px',
              height: '52px',
              boxShadow: hovered ? '0 0 18px rgba(56,178,216,0.25)' : 'none',
              transform: hovered ? 'scale(1.07)' : 'scale(1)',
            }}
          >
            {initials}
          </div>
          {/* Type dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2"
            style={{
              borderColor: '#07101E',
              backgroundColor: isServiceLead ? '#38B2D8' : '#34D399',
            }}
          />
        </div>

        {/* Name */}
        <p className="text-sm font-semibold text-white leading-tight truncate w-full px-1">
          {inq.name}
        </p>

        {/* Company / Email */}
        <p className="text-[10px] font-mono text-[#3A5070] truncate w-full flex items-center justify-center gap-1">
          {inq.company ? (
            <><Building className="h-2.5 w-2.5 flex-shrink-0" />{inq.company}</>
          ) : (
            <><Mail className="h-2.5 w-2.5 flex-shrink-0" />{inq.email}</>
          )}
        </p>

        {/* Type badge */}
        {isServiceLead ? (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-[#38B2D8]"
            style={{ background: 'rgba(30,95,191,0.2)', border: '1px solid rgba(56,178,216,0.3)' }}
          >
            <Zap className="h-2.5 w-2.5" />SERVICE
          </span>
        ) : (
          <span
            className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold text-emerald-400"
            style={{ background: 'rgba(5,150,105,0.15)', border: '1px solid rgba(52,211,153,0.3)' }}
          >
            <MessageSquare className="h-2.5 w-2.5" />MESSAGE
          </span>
        )}

        {/* Status badge */}
        <div className="scale-75 origin-center -my-1">
          <StatusBadge status={inq.status} />
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between px-3 pb-3 gap-1 transition-opacity duration-300"
        style={{ opacity: hovered ? 1 : 0.4 }}
      >
        {/* Pipeline value / date */}
        <span className="flex items-center gap-0.5 text-[9px] font-mono text-[#2A3F58] truncate">
          {isServiceLead && (inq.estimatedValue || 0) > 0 ? (
            <><DollarSign className="h-2.5 w-2.5 text-emerald-500 flex-shrink-0" />
            <span className="text-emerald-400 font-bold">{(inq.estimatedValue || 0).toLocaleString()}</span></>
          ) : (
            <><Calendar className="h-2.5 w-2.5 flex-shrink-0" />
            {new Date(inq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</>
          )}
        </span>

        {/* Inspect button */}
        <button
          onClick={(e) => { e.stopPropagation(); onClick(); }}
          className="flex items-center gap-0.5 rounded-lg px-2 py-1 text-[9px] font-mono font-bold text-[#38B2D8] cursor-pointer flex-shrink-0"
          style={{ background: 'rgba(30,95,191,0.15)', border: '1px solid rgba(56,178,216,0.2)' }}
        >
          Inspect <ChevronRight className="h-2.5 w-2.5" />
        </button>
      </div>
    </div>
  );
}
