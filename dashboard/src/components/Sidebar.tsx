import React from 'react';
import {
  LayoutDashboard,
  Zap,
  MessageSquare,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Globe,
  Users,
  ChevronRight,
  Wifi,
  WifiOff,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  frontendUrl: string;
  serviceLeadsCount: number;
  messagesCount: number;
  communityCount: number;
  totalInquiriesCount: number;
  isBackendConnected: boolean;
  adminEmail: string;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = React.memo(({
  currentTab,
  setCurrentTab,
  frontendUrl,
  serviceLeadsCount,
  messagesCount,
  communityCount,
  totalInquiriesCount,
  isBackendConnected,
  adminEmail,
  onLogout,
}) => {
  const navItems = [
    {
      id: 'overview',
      label: 'Command Center',
      icon: LayoutDashboard,
      badge: totalInquiriesCount,
      sublabel: 'Overview & Metrics',
      badgeColor: 'bg-[#1E5FBF]/30 text-[#38B2D8] border border-[#38B2D8]/30',
    },
    {
      id: 'service_leads',
      label: 'Service Leads',
      icon: Zap,
      badge: serviceLeadsCount,
      sublabel: 'Package Subscriptions',
      badgeColor: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: MessageSquare,
      badge: messagesCount,
      sublabel: 'General Inquiries',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      id: 'community',
      label: 'Community',
      icon: Users,
      badge: communityCount,
      sublabel: 'Member Applications',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
  ];

  const adminInitials = adminEmail
    .split('@')[0]
    .split(/[._-]/)
    .map((p: string) => p[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'AD';

  return (
    <aside
      style={{
        background: 'linear-gradient(180deg, #07101E 0%, #050D19 60%, #040B16 100%)',
        borderRight: '1px solid rgba(23,48,78,0.7)',
      }}
      className="fixed left-0 top-0 bottom-0 z-40 w-64 flex flex-col select-none"
    >
      {/* Top glow orb */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-40 rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, #1E5FBF 0%, transparent 70%)' }}
      />

      {/* ── Brand ── */}
      <div className="relative px-5 pt-5 pb-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative">
            <img
              src="/images/logo/logo4F.png"
              alt="NOVARCH Mark"
              className="h-9 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 0 10px rgba(56,178,216,0.5))' }}
            />
          </div>
          <img
            src="/images/logo/ovarch-text.png"
            alt="OVARCH"
            className="h-4 w-auto object-contain -ml-0.5"
          />
        </div>

        {/* Portal tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-[#38B2D8]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] text-[#4A6080]">
              Command Portal
            </span>
          </div>
          <span
            className="rounded px-1.5 py-0.5 text-[10px] font-mono font-bold text-[#38B2D8]"
            style={{ background: 'rgba(56,178,216,0.1)', border: '1px solid rgba(56,178,216,0.2)' }}
          >
            v1.0
          </span>
        </div>

        {/* Connection status pill */}
        <div
          className="mt-3 flex items-center gap-2 rounded-lg px-3 py-2"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(23,48,78,0.6)' }}
        >
          {isBackendConnected ? (
            <Wifi className="h-3 w-3 text-emerald-400 flex-shrink-0" />
          ) : (
            <WifiOff className="h-3 w-3 text-amber-400 flex-shrink-0" />
          )}
          <span className={`text-[11px] font-mono font-medium ${isBackendConnected ? 'text-emerald-400' : 'text-amber-400'}`}>
            {isBackendConnected ? 'Engine Live' : 'Local Mode'}
          </span>
          <span
            className={`ml-auto h-1.5 w-1.5 rounded-full flex-shrink-0 ${isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}
          />
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mx-4 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(56,178,216,0.15), transparent)' }} />

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="px-2 mb-3 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#2A3F58]">
          Navigation
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className="group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 cursor-pointer overflow-hidden"
              style={
                isActive
                  ? {
                      background: 'linear-gradient(135deg, rgba(30,95,191,0.4) 0%, rgba(37,99,235,0.25) 100%)',
                      border: '1px solid rgba(56,178,216,0.25)',
                      boxShadow: '0 0 20px rgba(30,95,191,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                    }
                  : {
                      background: 'transparent',
                      border: '1px solid transparent',
                    }
              }
            >
              {/* Active left bar */}
              {isActive && (
                <span
                  className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
                  style={{ background: 'linear-gradient(to bottom, #38B2D8, #1E5FBF)' }}
                />
              )}

              {/* Hover bg */}
              {!isActive && (
                <span
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ background: 'rgba(14,27,44,0.8)' }}
                />
              )}

              <div className="relative flex items-center gap-3 min-w-0">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-lg flex-shrink-0 transition-all duration-200"
                  style={
                    isActive
                      ? {
                          background: 'linear-gradient(135deg, rgba(30,95,191,0.5), rgba(56,178,216,0.3))',
                          border: '1px solid rgba(56,178,216,0.3)',
                          boxShadow: '0 0 12px rgba(56,178,216,0.2)',
                          color: '#38B2D8',
                        }
                      : {
                          background: 'rgba(14,27,44,0.6)',
                          border: '1px solid rgba(23,48,78,0.6)',
                          color: '#4A6080',
                        }
                  }
                >
                  <Icon className="h-4 w-4" />
                </div>

                <div className="text-left truncate">
                  <span className={`block leading-tight truncate text-sm ${isActive ? 'text-white font-semibold' : 'text-[#8A9BB0] group-hover:text-white'}`}>
                    {item.label}
                  </span>
                  <span className={`text-[10px] font-mono leading-none block mt-0.5 ${isActive ? 'text-[#38B2D8]/80' : 'text-[#3A5070]'}`}>
                    {item.sublabel}
                  </span>
                </div>
              </div>

              <div className="relative flex items-center gap-1.5 flex-shrink-0">
                {item.badge !== undefined && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-mono font-bold ${
                      isActive ? 'bg-white/15 text-white' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <ChevronRight
                  className={`h-3 w-3 transition-all duration-200 ${
                    isActive ? 'text-[#38B2D8] opacity-100' : 'text-[#2A3F58] opacity-0 group-hover:opacity-60'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </nav>

      {/* ── Divider ── */}
      <div className="mx-4 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(56,178,216,0.12), transparent)' }} />

      {/* ── Footer ── */}
      <div className="px-3 py-4 space-y-2">
        {/* Live Website */}
        <a
          href={frontendUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-200 cursor-pointer"
          style={{
            background: 'rgba(14,27,44,0.5)',
            border: '1px solid rgba(23,48,78,0.5)',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,178,216,0.3)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(14,27,44,0.9)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(23,48,78,0.5)';
            (e.currentTarget as HTMLElement).style.background = 'rgba(14,27,44,0.5)';
          }}
        >
          <div className="flex items-center gap-2.5">
            <Globe className="h-4 w-4 text-[#38B2D8]" />
            <span className="text-sm font-medium text-[#7A8FA6] group-hover:text-white transition-colors">
              Live Website
            </span>
          </div>
          <ExternalLink className="h-3.5 w-3.5 text-[#2A3F58] group-hover:text-[#38B2D8] transition-colors" />
        </a>

        {/* User Card */}
        <div
          className="flex items-center gap-3 rounded-xl p-2.5"
          style={{
            background: 'rgba(14,27,44,0.6)',
            border: '1px solid rgba(23,48,78,0.6)',
          }}
        >
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-mono font-bold text-xs"
              style={{
                background: 'linear-gradient(135deg, #1E5FBF, #38B2D8)',
                boxShadow: '0 0 12px rgba(56,178,216,0.3)',
              }}
            >
              {adminInitials}
            </div>
            <span
              className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 ${
                isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'
              }`}
              style={{ borderColor: '#07101E' }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white leading-tight truncate">Super Admin</p>
            <p className="text-[11px] font-mono text-[#4A6080] truncate mt-0.5" title={adminEmail}>
              {adminEmail}
            </p>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="flex-shrink-0 rounded-lg p-1.5 text-[#3A5070] hover:bg-red-500/15 hover:text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
