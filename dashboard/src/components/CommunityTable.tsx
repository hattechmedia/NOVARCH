import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Users,
  Building,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ChevronDown,
  Inbox,
  MapPin,
  Flame,
  Reply,
} from 'lucide-react';
import { CommunityMember, CommunityStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { ReplyModal } from './ReplyModal';

const COMMUNITY_STATUSES: CommunityStatus[] = [
  'New',
  'Pending',
  'Reviewing',
  'Selected',
  'Contacted',
  'Resolved',
  'Rejected',
];

// Deterministic gradient per first letter
const AVATAR_GRADIENTS: Record<string, string> = {
  A: 'linear-gradient(135deg,#1E5FBF,#38B2D8)',
  B: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
  C: 'linear-gradient(135deg,#0E7490,#38B2D8)',
  D: 'linear-gradient(135deg,#065F46,#34D399)',
  E: 'linear-gradient(135deg,#B45309,#FBBF24)',
  F: 'linear-gradient(135deg,#9D174D,#F472B6)',
  G: 'linear-gradient(135deg,#1D4ED8,#60A5FA)',
  H: 'linear-gradient(135deg,#6D28D9,#C4B5FD)',
  I: 'linear-gradient(135deg,#047857,#6EE7B7)',
  J: 'linear-gradient(135deg,#B91C1C,#FCA5A5)',
  K: 'linear-gradient(135deg,#1E5FBF,#818CF8)',
  L: 'linear-gradient(135deg,#0369A1,#38BDF8)',
  M: 'linear-gradient(135deg,#7C3AED,#38B2D8)',
  N: 'linear-gradient(135deg,#065F46,#A3E635)',
  O: 'linear-gradient(135deg,#B45309,#FB923C)',
  P: 'linear-gradient(135deg,#6D28D9,#F472B6)',
  Q: 'linear-gradient(135deg,#1E5FBF,#34D399)',
  R: 'linear-gradient(135deg,#B91C1C,#F97316)',
  S: 'linear-gradient(135deg,#0E7490,#818CF8)',
  T: 'linear-gradient(135deg,#1D4ED8,#38B2D8)',
  U: 'linear-gradient(135deg,#7C3AED,#34D399)',
  V: 'linear-gradient(135deg,#9D174D,#FB7185)',
  W: 'linear-gradient(135deg,#047857,#60A5FA)',
  X: 'linear-gradient(135deg,#B45309,#A78BFA)',
  Y: 'linear-gradient(135deg,#1E5FBF,#FBBF24)',
  Z: 'linear-gradient(135deg,#0E7490,#F472B6)',
};

function getGradient(name: string): string {
  const letter = name ? name.charAt(0).toUpperCase() : 'A';
  return AVATAR_GRADIENTS[letter] || 'linear-gradient(135deg,#1E5FBF,#38B2D8)';
}

function getInitials(name: string): string {
  if (!name) return 'WA';
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const STATUS_FILTER_STYLES: Record<string, { active: string; dot: string }> = {
  All: { active: 'bg-[#1E5FBF] text-white', dot: 'bg-[#38B2D8]' },
  New: { active: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40', dot: 'bg-emerald-400' },
  Pending: { active: 'bg-amber-500/20 text-amber-300 border border-amber-500/40', dot: 'bg-amber-400' },
  Reviewing: { active: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40', dot: 'bg-cyan-400' },
  Selected: { active: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40', dot: 'bg-indigo-400' },
  Contacted: { active: 'bg-blue-500/20 text-blue-300 border border-blue-500/40', dot: 'bg-blue-400' },
  Resolved: { active: 'bg-teal-500/20 text-teal-300 border border-teal-500/40', dot: 'bg-teal-400' },
  Rejected: { active: 'bg-rose-500/20 text-rose-300 border border-rose-500/40', dot: 'bg-rose-400' },
};

export interface CommunityTableProps {
  members: CommunityMember[];
  onUpdateStatus: (id: string, status: CommunityStatus) => void;
  isWinterArc?: boolean;
  pageTitle: string;
  icon?: React.ElementType;
}

export const CommunityTable: React.FC<CommunityTableProps> = React.memo(({
  members,
  onUpdateStatus,
  isWinterArc = false,
  pageTitle,
  icon: HeaderIcon = Users,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [replyMember, setReplyMember] = useState<CommunityMember | null>(null);

  const newCount = useMemo(() => members.filter((m) => m.status === 'New').length, [members]);

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return members.filter((m) => {
      // Status filter
      const matchesStatus = selectedStatus === 'All' ? true : m.status === selectedStatus;
      if (!matchesStatus) return false;

      // Search query
      if (!query) return true;
      return (
        m.fullName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        (m.country && m.country.toLowerCase().includes(query)) ||
        (m.city && m.city.toLowerCase().includes(query)) ||
        (m.organization && m.organization.toLowerCase().includes(query)) ||
        (m.role && m.role.toLowerCase().includes(query)) ||
        (m.whatYouDo && m.whatYouDo.toLowerCase().includes(query)) ||
        (m.whatCanYouOffer && m.whatCanYouOffer.toLowerCase().includes(query)) ||
        (m.whatAreYouLookingFor && m.whatAreYouLookingFor.toLowerCase().includes(query))
      );
    });
  }, [members, searchQuery, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: isWinterArc ? 'rgba(56,178,216,0.15)' : 'rgba(30,95,191,0.15)',
              border: isWinterArc ? '1px solid rgba(56,178,216,0.35)' : '1px solid rgba(56,178,216,0.25)',
              boxShadow: isWinterArc ? '0 0 16px rgba(56,178,216,0.2)' : '0 0 16px rgba(30,95,191,0.15)',
            }}
          >
            <HeaderIcon className={`h-5 w-5 ${isWinterArc ? 'text-cyan-300' : 'text-[#38B2D8]'}`} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight">{pageTitle}</h1>
              <span className="rounded-md bg-[#17304E]/80 border border-[#234975] px-2 py-0.5 text-xs font-mono font-semibold text-[#38B2D8]">
                {filteredMembers.length} {filteredMembers.length === 1 ? 'applicant' : 'applicants'}
              </span>
            </div>
            <p className="text-xs font-mono text-[#4A6080] mt-0.5">
              <span>{members.length} Total Submissions</span>
              {newCount > 0 && (
                <>
                  <span className="mx-1.5 text-[#1E3A5F]">·</span>
                  <span className="text-emerald-400 font-semibold">{newCount} new</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#3A5070]" />
          <input
            type="text"
            placeholder={isWinterArc ? "Search applicants by name, city, craft, offer..." : "Search members by name, city, organization..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-3 py-2 text-sm text-white placeholder-[#3A5070] focus:outline-none transition-all w-full md:w-80"
            style={{
              background: 'rgba(14,27,44,0.7)',
              border: '1px solid rgba(23,48,78,0.6)',
              borderRadius: '10px',
            }}
            onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(56,178,216,0.4)'; }}
            onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(23,48,78,0.6)'; }}
          />
        </div>
      </div>

      {/* ── Status Filter Pills ── */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#17304E]/50 pb-4">
        {['All', ...COMMUNITY_STATUSES].map((s) => {
          const isActive = selectedStatus === s;
          const style = STATUS_FILTER_STYLES[s] || STATUS_FILTER_STYLES.All;
          return (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                isActive ? style.active : 'text-[#4A6080] hover:text-white'
              }`}
              style={
                isActive
                  ? {}
                  : { background: 'rgba(14,27,44,0.5)', border: '1px solid rgba(23,48,78,0.5)' }
              }
            >
              {s !== 'All' && isActive && (
                <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${style.dot}`} />
              )}
              {s}
            </button>
          );
        })}
      </div>

      {/* ── Card Grid ── */}
      <div>
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 rounded-2xl border border-dashed border-[#17304E] bg-[#070D17]/50">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(14,27,44,0.6)', border: '1px solid rgba(23,48,78,0.5)' }}
            >
              <Inbox className="h-7 w-7 text-[#1E3A5F]" />
            </div>
            <p className="text-sm font-mono text-[#4A6080]">
              {members.length === 0 ? 'No applications received yet.' : 'No applications match your selected filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMembers.map((member) => {
              const gradient = getGradient(member.fullName);
              const initials = getInitials(member.fullName);
              return (
                <MemberCard
                  key={member.id}
                  member={member}
                  initials={initials}
                  gradient={gradient}
                  onNavigate={() => navigate(member.applicationType === 'winter-arc' ? `/winter-arc/${member.id}` : `/community/${member.id}`)}
                  onUpdateStatus={onUpdateStatus}
                  onReply={isWinterArc ? () => setReplyMember(member) : undefined}
                />
              );
            })}
          </div>
        )}
      </div>

      {replyMember && (
        <ReplyModal member={replyMember} onClose={() => setReplyMember(null)} />
      )}
    </div>
  );
});

CommunityTable.displayName = 'CommunityTable';

/* ── Enriched Member / Applicant Card ── */
function MemberCard({
  member,
  initials,
  gradient,
  onNavigate,
  onUpdateStatus,
  onReply,
}: {
  member: CommunityMember;
  initials: string;
  gradient: string;
  onNavigate: () => void;
  onUpdateStatus: (id: string, status: CommunityStatus) => void;
  onReply?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isWinterArc = member.applicationType === 'winter-arc';

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: hovered
          ? 'linear-gradient(145deg, rgba(14,27,44,0.95), rgba(10,19,33,0.98))'
          : 'linear-gradient(145deg, rgba(11,21,36,0.9), rgba(7,13,23,0.95))',
        border: hovered
          ? isWinterArc
            ? '1px solid rgba(56,178,216,0.5)'
            : '1px solid rgba(56,178,216,0.3)'
          : isWinterArc
          ? '1px solid rgba(30,95,191,0.6)'
          : '1px solid rgba(23,48,78,0.6)',
        boxShadow: hovered
          ? isWinterArc
            ? '0 12px 32px rgba(30,95,191,0.25), 0 0 0 1px rgba(56,178,216,0.2)'
            : '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,178,216,0.08)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top Banner Accent */}
      <div
        className="h-1 w-full transition-opacity duration-300"
        style={{
          background: isWinterArc
            ? 'linear-gradient(90deg, #1E5FBF 0%, #38B2D8 50%, #F59E0B 100%)'
            : gradient,
          opacity: hovered ? 1 : 0.6,
        }}
      />

      {/* Card Header Tag: Winter Arc vs Community */}
      <div className="flex items-center justify-between px-4 pt-3 pb-1">
        {isWinterArc ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-300">
            <Flame className="h-3 w-3 text-amber-400" />
            Winter Arc · Treffen 01
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-500/10 border border-blue-500/25 px-2 py-0.5 text-[10px] font-mono font-semibold text-blue-300">
            <Users className="h-3 w-3" />
            Community Member
          </span>
        )}
        <StatusBadge status={member.status} />
      </div>

      {/* Card body — click to navigate */}
      <div className="flex flex-col flex-1 p-4 gap-3" onClick={onNavigate}>
        {/* Avatar + Main Identity */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div
              className="flex items-center justify-center rounded-xl text-white font-bold font-mono text-base transition-transform duration-300"
              style={{
                background: gradient,
                width: '46px',
                height: '46px',
                boxShadow: hovered ? `0 0 16px rgba(56,178,216,0.3)` : 'none',
              }}
            >
              {initials}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate leading-snug group-hover:text-cyan-300 transition-colors">
              {member.fullName}
            </p>
            <p className="text-xs font-mono text-[#64748B] truncate">{member.email}</p>
          </div>
        </div>

        {/* Details snippet */}
        <div className="space-y-1 text-xs font-mono text-[#7A8FA6] bg-[#070E1A]/60 rounded-xl p-3 border border-[#17304E]/40">
          {(member.city || member.country) && (
            <p className="flex items-center gap-1.5 truncate text-white/90">
              <MapPin className="h-3 w-3 text-cyan-400 flex-shrink-0" />
              <span>
                {member.city && member.country
                  ? `${member.city}, ${member.country}`
                  : member.city || member.country}
              </span>
            </p>
          )}

          {member.organization && (
            <p className="flex items-center gap-1.5 truncate">
              <Building className="h-3 w-3 text-blue-400 flex-shrink-0" />
              <span>{member.organization}</span>
            </p>
          )}

          {(member.whatYouDo || member.role) && (
            <p className="flex items-center gap-1.5 truncate">
              <Briefcase className="h-3 w-3 text-amber-400 flex-shrink-0" />
              <span>{member.whatYouDo || member.role}</span>
            </p>
          )}

          {member.referral && (
            <p className="text-[10px] text-[#475569] truncate pt-0.5">
              Source:{' '}
              <span className="text-[#38B2D8]">
                {typeof member.referral === 'string'
                  ? member.referral
                  : (typeof member.referral === 'object' && member.referral !== null
                      ? member.referral.utmSource || member.referral.referrer || 'Campaign'
                      : 'Campaign')}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Bottom bar — controls */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t border-[#17304E]/40 gap-2 transition-all bg-[#050B14]/70"
      >
        {/* Submission Date */}
        <span className="flex items-center gap-1 text-[10px] font-mono text-[#475569] truncate">
          <Calendar className="h-3 w-3 flex-shrink-0" />
          {new Date(member.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>

        {/* Status quick-change + open arrow */}
        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
          {onReply && (
            <button
              onClick={(e) => { e.stopPropagation(); onReply(); }}
              className="flex h-6 items-center gap-1 rounded-md px-2 text-[11px] font-mono text-[#38B2D8] transition-all cursor-pointer hover:bg-[#1E5FBF]/30"
              style={{ background: 'rgba(30,95,191,0.15)', border: '1px solid rgba(56,178,216,0.25)' }}
              title="Reply via email"
            >
              <Reply className="h-3 w-3" />
              Reply
            </button>
          )}
          <div className="relative">
            <select
              value={member.status}
              onChange={(e) => onUpdateStatus(member.id, e.target.value as CommunityStatus)}
              className="appearance-none text-[11px] font-mono text-[#38B2D8] cursor-pointer focus:outline-none pr-4 pl-2 py-1 rounded-md"
              style={{ background: 'rgba(30,95,191,0.15)', border: '1px solid rgba(56,178,216,0.25)' }}
            >
              {COMMUNITY_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#0D1826] text-white">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 h-3 w-3 text-[#38B2D8]" />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(); }}
            className="flex h-6 w-6 items-center justify-center rounded-md transition-all cursor-pointer flex-shrink-0 hover:bg-[#1E5FBF]/30"
            style={{ background: 'rgba(30,95,191,0.15)', border: '1px solid rgba(56,178,216,0.25)' }}
            title="View full application details"
          >
            <ArrowUpRight className="h-3.5 w-3.5 text-[#38B2D8]" />
          </button>
        </div>
      </div>
    </div>
  );
}
