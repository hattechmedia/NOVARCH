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
} from 'lucide-react';
import { CommunityMember, CommunityStatus } from '../types';
import { StatusBadge } from './StatusBadge';

interface CommunityTableProps {
  members: CommunityMember[];
  onUpdateStatus: (id: string, status: CommunityStatus) => void;
}

const COMMUNITY_STATUSES: CommunityStatus[] = ['New', 'Contacted', 'Resolved'];

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
  const letter = name.charAt(0).toUpperCase();
  return AVATAR_GRADIENTS[letter] || 'linear-gradient(135deg,#1E5FBF,#38B2D8)';
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

const STATUS_FILTER_STYLES: Record<string, { active: string; dot: string }> = {
  All: { active: 'bg-[#1E5FBF] text-white', dot: 'bg-[#38B2D8]' },
  New: { active: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40', dot: 'bg-emerald-400' },
  Contacted: { active: 'bg-blue-500/20 text-blue-300 border border-blue-500/40', dot: 'bg-blue-400' },
  Resolved: { active: 'bg-teal-500/20 text-teal-300 border border-teal-500/40', dot: 'bg-teal-400' },
};

export const CommunityTable: React.FC<CommunityTableProps> = React.memo(({ members, onUpdateStatus }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredMembers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return members.filter((m) => {
      const matchesStatus = selectedStatus === 'All' ? true : m.status === selectedStatus;
      if (!matchesStatus) return false;
      if (!query) return true;
      return (
        m.fullName.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        (m.organization && m.organization.toLowerCase().includes(query)) ||
        (m.role && m.role.toLowerCase().includes(query))
      );
    });
  }, [members, searchQuery, selectedStatus]);

  const newCount = useMemo(() => members.filter((m) => m.status === 'New').length, [members]);

  return (
    <div>
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-1 pb-5">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: 'rgba(30,95,191,0.15)',
              border: '1px solid rgba(56,178,216,0.25)',
              boxShadow: '0 0 16px rgba(30,95,191,0.15)',
            }}
          >
            <Users className="h-5 w-5 text-[#38B2D8]" />
          </div>
          <div>
            <p className="text-base font-bold text-white tracking-tight">Community Members</p>
            <p className="text-[11px] font-mono text-[#3A5070] mt-0.5">
              {members.length} total{newCount > 0 && (
                <span className="ml-1.5 text-emerald-400 font-semibold">· {newCount} new</span>
              )}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status pills */}
          {['All', ...COMMUNITY_STATUSES].map((s) => {
            const isActive = selectedStatus === s;
            const style = STATUS_FILTER_STYLES[s];
            return (
              <button
                key={s}
                onClick={() => setSelectedStatus(s)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-semibold transition-all cursor-pointer ${
                  isActive
                    ? style.active
                    : 'text-[#4A6080] hover:text-white'
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

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#3A5070]" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 text-sm text-white placeholder-[#3A5070] focus:outline-none transition-all"
              style={{
                background: 'rgba(14,27,44,0.7)',
                border: '1px solid rgba(23,48,78,0.6)',
                borderRadius: '10px',
                width: '200px',
              }}
              onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(56,178,216,0.4)'; }}
              onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = 'rgba(23,48,78,0.6)'; }}
            />
          </div>
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div>
        {filteredMembers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div
              className="flex h-16 w-16 items-center justify-center rounded-2xl"
              style={{ background: 'rgba(14,27,44,0.6)', border: '1px solid rgba(23,48,78,0.5)' }}
            >
              <Inbox className="h-7 w-7 text-[#1E3A5F]" />
            </div>
            <p className="text-sm font-mono text-[#2A3F58]">
              {members.length === 0 ? 'No community members yet.' : 'No members match your filters.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMembers.map((member) => {
              const gradient = getGradient(member.fullName);
              const initials = getInitials(member.fullName);
              return (
                <MemberCard
                  key={member.id}
                  member={member}
                  initials={initials}
                  gradient={gradient}
                  onNavigate={() => navigate(`/community/${member.id}`)}
                  onUpdateStatus={onUpdateStatus}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
});

CommunityTable.displayName = 'CommunityTable';

/* ── Member Square Card ── */
function MemberCard({
  member,
  initials,
  gradient,
  onNavigate,
  onUpdateStatus,
}: {
  member: CommunityMember;
  initials: string;
  gradient: string;
  onNavigate: () => void;
  onUpdateStatus: (id: string, status: CommunityStatus) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col rounded-2xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{
        background: hovered
          ? 'linear-gradient(145deg, rgba(14,27,44,0.95), rgba(10,19,33,0.98))'
          : 'linear-gradient(145deg, rgba(11,21,36,0.9), rgba(7,13,23,0.95))',
        border: hovered
          ? '1px solid rgba(56,178,216,0.25)'
          : '1px solid rgba(23,48,78,0.6)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(56,178,216,0.08)'
          : '0 2px 12px rgba(0,0,0,0.2)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        aspectRatio: '1 / 1',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top shimmer bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
        style={{ background: gradient, opacity: hovered ? 0.7 : 0 }}
      />

      {/* Card body — click to navigate */}
      <div
        className="flex flex-col items-center justify-center flex-1 p-4 gap-3"
        onClick={onNavigate}
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="flex items-center justify-center rounded-2xl text-white font-bold font-mono text-lg transition-transform duration-300"
            style={{
              background: gradient,
              width: '56px',
              height: '56px',
              boxShadow: hovered ? `0 0 20px rgba(56,178,216,0.25)` : '0 0 0px transparent',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          >
            {initials}
          </div>
          {/* Online-style status dot */}
          <span
            className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 transition-colors"
            style={{
              borderColor: '#07101E',
              backgroundColor:
                member.status === 'New'
                  ? '#34D399'
                  : member.status === 'Contacted'
                  ? '#60A5FA'
                  : '#2DD4BF',
            }}
          />
        </div>

        {/* Name */}
        <div className="text-center min-w-0 w-full">
          <p className="text-sm font-semibold text-white truncate leading-tight">{member.fullName}</p>
          {member.organization && (
            <p className="text-[10px] font-mono text-[#3A5070] truncate mt-0.5 flex items-center justify-center gap-1">
              <Building className="h-2.5 w-2.5 flex-shrink-0" />
              {member.organization}
            </p>
          )}
          {member.role && (
            <p className="text-[10px] font-mono text-[#3A5070] truncate flex items-center justify-center gap-1">
              <Briefcase className="h-2.5 w-2.5 flex-shrink-0" />
              {member.role}
            </p>
          )}
        </div>

        {/* Status Badge */}
        <div className="scale-90 origin-center">
          <StatusBadge status={member.status} />
        </div>
      </div>

      {/* Bottom bar — hover reveals controls */}
      <div
        className="flex items-center justify-between px-3 pb-3 gap-2 transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0.4 }}
      >
        {/* Joined date */}
        <span className="flex items-center gap-1 text-[9px] font-mono text-[#2A3F58] truncate">
          <Calendar className="h-2.5 w-2.5 flex-shrink-0" />
          {new Date(member.createdAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })}
        </span>

        {/* Status quick-change + open arrow */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <select
              value={member.status}
              onChange={(e) => onUpdateStatus(member.id, e.target.value as CommunityStatus)}
              className="appearance-none text-[10px] font-mono text-[#38B2D8] cursor-pointer focus:outline-none pr-3 pl-1 py-0.5 rounded"
              style={{ background: 'rgba(30,95,191,0.12)', border: '1px solid rgba(56,178,216,0.2)' }}
            >
              {COMMUNITY_STATUSES.map((s) => (
                <option key={s} value={s} className="bg-[#0D1826]">
                  {s}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-0.5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 text-[#38B2D8]" />
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(); }}
            className="flex h-5 w-5 items-center justify-center rounded-md transition-all cursor-pointer flex-shrink-0"
            style={{ background: 'rgba(30,95,191,0.15)', border: '1px solid rgba(56,178,216,0.2)' }}
          >
            <ArrowUpRight className="h-3 w-3 text-[#38B2D8]" />
          </button>
        </div>
      </div>
    </div>
  );
}
