import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Building,
  Briefcase,
  MessageSquare,
  Calendar,
  Sparkles,
  Trash2,
  Globe,
  ChevronDown,
  MapPin,
  Flame,
  Link as LinkIcon,
  ExternalLink,
  Target,
  Gift,
  Users2,
  Share2,
  Phone,
  Reply,
} from 'lucide-react';
import { CommunityMember, CommunityStatus } from '../types';
import { StatusBadge } from './StatusBadge';
import { ReplyModal } from './ReplyModal';

interface CommunityDetailPageProps {
  members: CommunityMember[];
  onUpdateStatus: (id: string, status: CommunityStatus) => void;
  onDelete: (id: string) => void;
}

const COMMUNITY_STATUSES: CommunityStatus[] = [
  'New',
  'Pending',
  'Reviewing',
  'Selected',
  'Contacted',
  'Resolved',
  'Rejected',
];

export const CommunityDetailPage: React.FC<CommunityDetailPageProps> = ({
  members,
  onUpdateStatus,
  onDelete,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showReply, setShowReply] = React.useState(false);

  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#050A12] text-white">
        <div className="text-center p-8 rounded-2xl bg-[#081224] border border-[#17304E]">
          <p className="text-[#94A3B8] font-mono text-sm mb-4">
            Application or member record not found in loaded memory.
          </p>
          <button
            onClick={() => navigate('/winter-arc')}
            className="rounded-xl bg-[#1E5FBF] px-4 py-2 text-white text-sm font-mono hover:bg-[#1E5FBF]/80 transition-colors cursor-pointer"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isWinterArc = member.applicationType === 'winter-arc';
  const backRoute = isWinterArc ? '/winter-arc' : '/community';

  const handleDelete = () => {
    const promptText = isWinterArc
      ? `Remove Winter Arc application for ${member.fullName}? This cannot be undone.`
      : `Remove ${member.fullName} from the community? This cannot be undone.`;

    if (window.confirm(promptText)) {
      onDelete(member.id);
      navigate(backRoute);
    }
  };

  const initials = member.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'WA';

  const joinedDate = new Date(member.createdAt).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const utmReferral =
    typeof member.referral === 'object' && member.referral !== null
      ? member.referral
      : null;

  return (
    <div className="min-h-screen bg-[#050A12] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#17304E]/60 bg-[#070D17]/90 px-6 py-3.5 backdrop-blur-xl">
        <button
          onClick={() => navigate(backRoute)}
          className="flex items-center gap-2 text-sm font-mono text-[#94A3B8] hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          {isWinterArc ? 'Winter Arc' : 'Community'}
        </button>

        <div className="flex items-center gap-2 text-sm font-mono text-[#7A8FA6]">
          <span className="text-[#38B2D8] font-bold tracking-wide">NOVARCH</span>
          <span className="text-[#17304E]">/</span>
          <span className="text-white font-semibold">
            {isWinterArc ? 'Winter Arc Treffen 01 Application' : 'Community Member'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isWinterArc && (
            <button
              onClick={() => setShowReply(true)}
              className="flex items-center gap-1.5 rounded-xl bg-[#1E5FBF]/20 border border-[#38B2D8]/30 px-3 py-1.5 text-xs font-mono text-[#38B2D8] hover:bg-[#1E5FBF]/30 hover:text-white transition-all cursor-pointer"
            >
              <Reply className="h-3.5 w-3.5" />
              Reply
            </button>
          )}
          <button
            onClick={handleDelete}
            className="flex items-center gap-1.5 rounded-xl bg-red-500/10 border border-red-500/25 px-3 py-1.5 text-xs font-mono text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-300 transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative overflow-hidden border-b border-[#17304E]/40 bg-[#070D17]">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-[#1E5FBF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 h-40 w-96 rounded-full bg-[#38B2D8]/10 blur-2xl" />

        <div className="relative max-w-5xl mx-auto px-6 sm:px-10 py-10 flex flex-col sm:flex-row items-center sm:items-end gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className={`h-24 w-24 rounded-3xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl ring-2 ${
                isWinterArc
                  ? 'bg-gradient-to-br from-[#1E5FBF] via-[#2A7DD4] to-[#F59E0B] shadow-cyan-500/30 ring-cyan-400/40'
                  : 'bg-gradient-to-br from-[#1E5FBF] via-[#2A7DD4] to-[#38B2D8] shadow-[#1E5FBF]/40 ring-[#38B2D8]/30'
              }`}
            >
              {initials}
            </div>
            <span className="absolute -inset-1 rounded-3xl ring-1 ring-[#38B2D8]/20 animate-pulse" />
          </div>

          {/* Identity */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {member.fullName}
              </h1>
              {isWinterArc && (
                <span className="inline-flex items-center gap-1 rounded-md bg-cyan-500/15 border border-cyan-500/40 px-2.5 py-1 text-xs font-mono font-bold text-cyan-300">
                  <Flame className="h-3.5 w-3.5 text-amber-400" />
                  Winter Arc · Treffen 01
                </span>
              )}
              <StatusBadge status={member.status} />
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1 text-sm font-mono text-[#64748B]">
              {member.city && (
                <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                  <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                  {member.city}
                </span>
              )}
              {member.organization && (
                <span className="flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-[#38B2D8]" />
                  {member.organization}
                </span>
              )}
              {(member.whatYouDo || member.role) && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="h-3.5 w-3.5 text-amber-400" />
                  {member.whatYouDo || member.role}
                </span>
              )}
              {(member.country || member.city) && (
                <span className="flex items-center gap-1.5">
                  <Globe className="h-3.5 w-3.5 text-[#38B2D8]" />
                  {member.city && member.country
                    ? `${member.city}, ${member.country}`
                    : member.city || member.country}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#38B2D8]" />
                {joinedDate}
              </span>
            </div>
          </div>

          {/* Status Selector */}
          <div className="flex flex-col gap-1.5 flex-shrink-0">
            <span className="text-[10px] font-mono text-[#64748B] uppercase tracking-widest">
              Update Status
            </span>
            <div className="relative">
              <select
                value={member.status}
                onChange={(e) => onUpdateStatus(member.id, e.target.value as CommunityStatus)}
                className="appearance-none rounded-xl bg-[#0B1524]/80 border border-[#17304E] hover:border-[#38B2D8]/40 focus:border-[#38B2D8]/60 px-4 py-2 pr-9 text-sm font-mono text-white cursor-pointer focus:outline-none transition-all"
              >
                {COMMUNITY_STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-[#0D1826]">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#64748B]" />
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#38B2D8]/40 to-transparent" />
      </div>

      {/* Body */}
      <main className="max-w-5xl mx-auto px-6 sm:px-10 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Contact Information */}
          <section>
            <SectionHeader icon={User} label="Contact & Profile" />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoTile icon={User} label="Full Name" value={member.fullName} />
              <InfoTile icon={Mail} label="Email Address" value={member.email} isEmail />
              {(member.country || member.city) && (
                <InfoTile
                  icon={MapPin}
                  label="Country / City"
                  value={
                    member.city && member.country
                      ? `${member.city}, ${member.country}`
                      : member.city || member.country || ''
                  }
                />
              )}
              {member.contactNumber && (
                <InfoTile icon={Phone} label="Phone" value={member.contactNumber} />
              )}
              {member.organization && (
                <InfoTile
                  icon={Building}
                  label="Business / Project / Company"
                  value={member.organization}
                />
              )}
              {(member.whatYouDo || member.role) && (
                <InfoTile
                  icon={Briefcase}
                  label="What they do / Role"
                  value={member.whatYouDo || member.role || ''}
                />
              )}
              <InfoTile icon={Calendar} label="Joined" value={joinedDate} />
              {member.referral && (
                <InfoTile
                  icon={Globe}
                  label="Source / Referral"
                  value={
                    typeof member.referral === 'string'
                      ? member.referral
                      : utmReferral?.utmSource || utmReferral?.referrer || 'Campaign / Referral'
                  }
                />
              )}
            </div>
          </section>

          {/* Winter Arc Specific Answers */}
          {isWinterArc && (
            <>
              {member.whatCanYouOffer && (
                <section>
                  <SectionHeader icon={Gift} label="What they can offer the group" />
                  <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-5 relative overflow-hidden">
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-cyan-400" />
                    <p className="pl-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {member.whatCanYouOffer}
                    </p>
                  </div>
                </section>
              )}

              {member.whatAreYouLookingFor && (
                <section>
                  <SectionHeader icon={Target} label="What they are looking for" />
                  <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-5 relative overflow-hidden">
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-amber-400" />
                    <p className="pl-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {member.whatAreYouLookingFor}
                    </p>
                  </div>
                </section>
              )}

              {member.proposedGuest && (
                <section>
                  <SectionHeader icon={Users2} label="Proposed Guest or Partner" />
                  <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-5 relative overflow-hidden">
                    <div className="absolute left-0 top-4 bottom-4 w-1 rounded-full bg-blue-400" />
                    <p className="pl-4 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                      {member.proposedGuest}
                    </p>
                  </div>
                </section>
              )}
            </>
          )}

          {/* Message (Community) */}
          {member.message && (
            <section>
              <SectionHeader icon={MessageSquare} label="Message / Introduction" />
              <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-5 relative overflow-hidden">
                <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-[#38B2D8]/60 via-[#1E5FBF]/40 to-transparent" />
                <p className="pl-5 text-sm text-[#CBD5E1] leading-relaxed whitespace-pre-wrap font-mono">
                  {member.message}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Professional Links */}
          {(member.linkedinUrl || member.portfolioUrl) && (
            <section>
              <SectionHeader icon={Globe} label="Links & Profiles" />
              <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-4 space-y-2">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full rounded-xl border border-[#17304E] bg-[#0B1524]/50 px-4 py-3 text-sm font-mono text-[#38B2D8] hover:border-cyan-400 hover:text-white hover:bg-[#0B1524] transition-all group"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <LinkIcon className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      LinkedIn Profile
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-white flex-shrink-0" />
                  </a>
                )}
                {member.portfolioUrl && (
                  <a
                    href={member.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full rounded-xl border border-[#17304E] bg-[#0B1524]/50 px-4 py-3 text-sm font-mono text-[#38B2D8] hover:border-cyan-400 hover:text-white hover:bg-[#0B1524] transition-all group"
                  >
                    <span className="flex items-center gap-2 truncate">
                      <Globe className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      Portfolio / Website
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-white flex-shrink-0" />
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Referral & Attribution Info */}
          {utmReferral && Object.values(utmReferral).some(Boolean) && (
            <section>
              <SectionHeader icon={Share2} label="Campaign Attribution" />
              <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-4 space-y-2 text-xs font-mono">
                {utmReferral.utmSource && (
                  <div className="flex justify-between items-center py-1 border-b border-[#17304E]/40">
                    <span className="text-[#64748B]">utm_source</span>
                    <span className="text-cyan-300 font-bold">{utmReferral.utmSource}</span>
                  </div>
                )}
                {utmReferral.utmMedium && (
                  <div className="flex justify-between items-center py-1 border-b border-[#17304E]/40">
                    <span className="text-[#64748B]">utm_medium</span>
                    <span className="text-slate-300">{utmReferral.utmMedium}</span>
                  </div>
                )}
                {utmReferral.utmCampaign && (
                  <div className="flex justify-between items-center py-1 border-b border-[#17304E]/40">
                    <span className="text-[#64748B]">utm_campaign</span>
                    <span className="text-slate-300">{utmReferral.utmCampaign}</span>
                  </div>
                )}
                {utmReferral.utmContent && (
                  <div className="flex justify-between items-center py-1 border-b border-[#17304E]/40">
                    <span className="text-[#64748B]">utm_content</span>
                    <span className="text-slate-300">{utmReferral.utmContent}</span>
                  </div>
                )}
                {utmReferral.referrer && (
                  <div className="py-1">
                    <span className="text-[#64748B] block mb-0.5">referrer</span>
                    <span className="text-slate-400 break-all">{utmReferral.referrer}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Areas of Interest (Community) */}
          {member.interests && member.interests.length > 0 && (
            <section>
              <SectionHeader icon={Sparkles} label="Areas of Interest" />
              <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-5 flex flex-wrap gap-2">
                {member.interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#1E5FBF]/20 to-[#38B2D8]/10 border border-[#38B2D8]/25 px-3 py-1.5 text-xs font-mono text-[#38B2D8] transition-all cursor-default"
                  >
                    <Sparkles className="h-3 w-3" />
                    {interest}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Quick Actions */}
          <section>
            <SectionHeader icon={Globe} label="Quick Actions" />
            <div className="mt-4 rounded-2xl border border-[#17304E]/60 bg-[#070D17] p-4 space-y-2">
              {isWinterArc ? (
                <button
                  onClick={() => setShowReply(true)}
                  className="flex items-center gap-3 w-full rounded-xl border border-[#38B2D8]/30 bg-[#1E5FBF]/15 px-4 py-3 text-sm font-mono text-[#38B2D8] hover:border-[#38B2D8]/50 hover:text-white hover:bg-[#1E5FBF]/25 transition-all cursor-pointer group"
                >
                  <Reply className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Reply
                </button>
              ) : (
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-3 w-full rounded-xl border border-[#17304E] bg-[#0B1524]/50 px-4 py-3 text-sm font-mono text-[#94A3B8] hover:border-[#38B2D8]/40 hover:text-white hover:bg-[#0B1524] transition-all group"
                >
                  <Mail className="h-4 w-4 text-[#38B2D8] group-hover:scale-110 transition-transform" />
                  Send Email
                </a>
              )}
              {member.contactNumber && (
                <a
                  href={`tel:${member.contactNumber}`}
                  className="flex items-center gap-3 w-full rounded-xl border border-[#17304E] bg-[#0B1524]/50 px-4 py-3 text-sm font-mono text-[#94A3B8] hover:border-[#38B2D8]/40 hover:text-white hover:bg-[#0B1524] transition-all group"
                >
                  <Phone className="h-4 w-4 text-[#38B2D8] group-hover:scale-110 transition-transform" />
                  Call Applicant
                </a>
              )}
              <button
                onClick={handleDelete}
                className="flex items-center gap-3 w-full rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm font-mono text-red-400 hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer group"
              >
                <Trash2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                Remove Record
              </button>
            </div>
          </section>

          {/* Metadata info */}
          <div className="rounded-2xl border border-[#17304E]/40 bg-[#070D17]/60 px-5 py-4 space-y-2">
            <div>
              <p className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-0.5">
                Application Type
              </p>
              <p className="text-xs font-mono text-cyan-400 capitalize">
                {member.applicationType || 'community'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-0.5">
                Record ID
              </p>
              <p className="text-xs font-mono text-[#64748B] break-all">{member.id}</p>
            </div>
          </div>
        </div>
      </main>

      {isWinterArc && showReply && (
        <ReplyModal member={member} onClose={() => setShowReply(false)} />
      )}
    </div>
  );
};

CommunityDetailPage.displayName = 'CommunityDetailPage';

function SectionHeader({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1E5FBF]/20 border border-[#38B2D8]/20">
        <Icon className="h-3.5 w-3.5 text-[#38B2D8]" />
      </div>
      <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#64748B]">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#17304E]/80 to-transparent" />
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  isEmail,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  isEmail?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#17304E]/60 bg-[#070D17] p-4 hover:border-[#38B2D8]/20 transition-colors group">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-[#0E1B2C] border border-[#17304E] group-hover:border-[#38B2D8]/30 transition-colors">
        <Icon className="h-3.5 w-3.5 text-[#64748B] group-hover:text-[#38B2D8] transition-colors" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-mono text-[#475569] uppercase tracking-widest mb-0.5">{label}</p>
        {isEmail ? (
          <a
            href={`mailto:${value}`}
            className="text-sm font-mono text-[#38B2D8] hover:text-white transition-colors truncate block"
          >
            {value}
          </a>
        ) : (
          <p className="text-sm font-mono text-[#E2E8F0] break-words">{value}</p>
        )}
      </div>
    </div>
  );
}
