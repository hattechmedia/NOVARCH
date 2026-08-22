import React from 'react';
import {
  LayoutDashboard,
  Zap,
  MessageSquare,
  ExternalLink,
  LogOut,
  ShieldCheck,
  Globe,
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  frontendUrl: string;
  serviceLeadsCount: number;
  messagesCount: number;
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
    },
    {
      id: 'service_leads',
      label: 'Service Leads',
      icon: Zap,
      badge: serviceLeadsCount,
      sublabel: 'Package Subscriptions',
      badgeColor: 'bg-[#1E5FBF]/25 text-[#38B2D8] border border-[#38B2D8]/40',
    },
    {
      id: 'messages',
      label: 'Contact Messages',
      icon: MessageSquare,
      badge: messagesCount,
      sublabel: 'General Inquiries',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 z-40 w-64 border-r border-[#17304E] bg-[#070D17] flex flex-col justify-between p-4 select-none">
      <div>
        {/* Brand Header with Clean Spacing & Separated Admin Pill */}
        <div className="px-2 py-3 border-b border-[#17304E]/80">
          <div className="flex items-center gap-1.5">
            <img
              src="/images/logo/logo4F.png"
              alt="NOVARCH Mark"
              className="h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(56,178,216,0.4)]"
            />
            <img
              src="/images/logo/ovarch-text.png"
              alt="OVARCH"
              className="h-5 w-auto object-contain -ml-1"
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-semibold text-[#7A8FA6] tracking-wider uppercase">
              <ShieldCheck className="h-3 w-3 text-[#38B2D8]" />
              <span>COMMAND PORTAL</span>
            </div>
            <span className="rounded-md bg-[#1E5FBF]/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-[#38B2D8] border border-[#38B2D8]/30">
              v1.0
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="mt-6">
          <span className="px-3 text-[10px] font-mono font-bold uppercase tracking-widest text-[#64748B] block mb-2">
            Navigation
          </span>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1E5FBF] to-[#2563EB] text-white shadow-lg shadow-[#1E5FBF]/25 font-bold'
                      : 'text-[#94A3B8] hover:bg-[#0E1B2C] hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#0E1B2C] text-[#7A8FA6] group-hover:text-[#38B2D8]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="text-left truncate">
                      <span className="block leading-tight truncate">{item.label}</span>
                      <span
                        className={`text-[10px] font-mono leading-none block mt-0.5 ${
                          isActive ? 'text-white/80' : 'text-[#64748B]'
                        }`}
                      >
                        {item.sublabel}
                      </span>
                    </div>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badgeColor || 'bg-[#17304E] text-[#38B2D8]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Sleek User Profile & System Footer (Cleaned up from previous clutter) */}
      <div className="space-y-3 pt-4 border-t border-[#17304E]/80">
        {/* Live Website Quick Action */}
        <a
          href={frontendUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-between rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-2 text-xs font-mono text-[#94A3B8] hover:text-white hover:border-[#38B2D8]/40 hover:bg-[#0E1B2C] transition-all duration-200 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5 text-[#38B2D8]" />
            <span>Live Website</span>
          </div>
          <ExternalLink className="h-3 w-3 text-[#64748B] group-hover:text-[#38B2D8] transition-colors" />
        </a>

        {/* User Card with Status Dot & Logout Action */}
        <div className="flex items-center justify-between rounded-xl bg-[#0B1524] p-2.5 border border-[#17304E]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex-shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#1E5FBF] to-[#38B2D8] text-white font-mono font-bold text-xs shadow-md">
                AD
              </div>
              {/* Pulse status indicator */}
              <span
                className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#070D17] ${
                  isBackendConnected ? 'bg-emerald-400' : 'bg-amber-400'
                }`}
                title={isBackendConnected ? 'Backend Connected' : 'Local Standalone Mode'}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate leading-tight">
                Super Admin
              </p>
              <p className="text-[10px] font-mono text-[#7A8FA6] truncate mt-0.5" title={adminEmail}>
                {adminEmail}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            title="Sign Out"
            className="rounded-lg p-1.5 text-[#7A8FA6] hover:bg-red-500/15 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
});

Sidebar.displayName = 'Sidebar';
