import { useState, useEffect, useCallback, useMemo, useDeferredValue } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { api } from './services/api';
import { ContactInquiry, DashboardStats, LeadStatus } from './types';
import { Sidebar } from './components/Sidebar';
import { StatsCard } from './components/StatsCard';
import { InquiryTable } from './components/InquiryTable';
import { InquiryDetailPage } from './components/InquiryDetailPage';
import { LoginPage } from './components/LoginPage';
import {
  DollarSign,
  Zap,
  MessageSquare,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Clock,
} from 'lucide-react';

function DashboardView({
  tab,
  stats,
  inquiries,
  onUpdateStatus,
  loadData,
  isRefreshing,
  error,
  currentTime,
  isBackendConnected,
}: {
  tab: 'overview' | 'service_leads' | 'messages';
  stats: DashboardStats | null;
  inquiries: ContactInquiry[];
  onUpdateStatus: (id: string, status: LeadStatus) => void;
  loadData: (manual?: boolean) => void;
  isRefreshing: boolean;
  error: string | null;
  currentTime: string;
  isBackendConnected: boolean;
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    tab === 'service_leads' ? 'service_lead' : tab === 'messages' ? 'message' : 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const deferredSearch = useDeferredValue(searchQuery);

  useEffect(() => {
    if (tab === 'service_leads') {
      setSelectedCategory('service_lead');
    } else if (tab === 'messages') {
      setSelectedCategory('message');
    } else {
      setSelectedCategory('all');
    }
  }, [tab]);

  // Filter inquiries by search, status & category
  const filteredInquiries = useMemo(() => {
    const query = deferredSearch.trim().toLowerCase();

    return inquiries.filter((inq) => {
      const matchesStatus =
        selectedStatus === 'All' ? true : inq.status === selectedStatus;

      const matchesCategory =
        selectedCategory === 'all' ? true : inq.submissionType === selectedCategory;

      if (!matchesStatus || !matchesCategory) return false;
      if (!query) return true;

      return (
        inq.name.toLowerCase().includes(query) ||
        inq.email.toLowerCase().includes(query) ||
        (inq.company && inq.company.toLowerCase().includes(query)) ||
        (inq.planName && inq.planName.toLowerCase().includes(query)) ||
        inq.serviceType.toLowerCase().includes(query)
      );
    });
  }, [inquiries, selectedStatus, selectedCategory, deferredSearch]);

  const serviceLeads = useMemo(() => inquiries.filter((i) => i.submissionType === 'service_lead'), [inquiries]);
  const contactMessages = useMemo(() => inquiries.filter((i) => i.submissionType === 'message'), [inquiries]);
  const newSubmissionsCount = useMemo(() => inquiries.filter((i) => i.status === 'New').length, [inquiries]);
  const totalPipelineValue = useMemo(
    () =>
      inquiries
        .filter((i) => i.status !== 'Payment Declined')
        .reduce((sum, i) => sum + (i.estimatedValue || 0), 0),
    [inquiries]
  );

  return (
    <div className="flex-1 flex flex-col min-w-0">
      {/* Top App Header Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#17304E]/80 bg-[#070D17]/95 px-6 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm font-mono text-[#7A8FA6]">
            <span className="text-[#38B2D8] font-bold">NOVARCH</span>
            <span>/</span>
            <span className="text-white capitalize font-semibold">
              {tab === 'service_leads'
                ? 'Service Package Leads'
                : tab === 'messages'
                ? 'Contact Messages'
                : 'Command Center'}
            </span>
          </div>

          <span className="hidden sm:inline-block h-4 w-[1px] bg-[#17304E]" />

          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-[#94A3B8]">
            <Clock className="h-3.5 w-3.5 text-[#38B2D8]" />
            {currentTime}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Sync Status */}
          <div className="flex items-center gap-2 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-1.5 text-xs font-mono">
            <span
              className={`h-2 w-2 rounded-full ${
                isBackendConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-[#94A3B8]">
              {isBackendConnected ? 'Express Engine: Live' : 'Local Storage Mode'}
            </span>
          </div>

          {/* Refresh Data Button */}
          <button
            onClick={() => loadData(true)}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 rounded-xl bg-[#0B1524] border border-[#17304E] px-3 py-1.5 text-sm font-mono text-[#CBD5E1] hover:text-[#38B2D8] hover:border-[#38B2D8]/50 hover:bg-[#122238] transition-all cursor-pointer disabled:opacity-60 font-semibold"
            title="Sync latest inquiries from database"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin text-[#38B2D8]' : ''}`} />
            <span className="hidden md:inline">Refresh</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* Connection Error Banner */}
        {error && (
          <div className="flex items-center justify-between rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 text-xs text-amber-300">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Express Backend API Notice</p>
                <p className="mt-0.5 text-amber-300/90">{error}</p>
              </div>
            </div>
            <button
              onClick={() => loadData(true)}
              className="rounded-xl bg-amber-500/20 px-3 py-1.5 font-mono text-[11px] font-bold text-amber-300 hover:bg-amber-500/30 cursor-pointer"
            >
              Reconnect
            </button>
          </div>
        )}

        {/* Top Metric Cards — Rendered ONLY on Command Center Overview */}
        {tab === 'overview' && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Service Leads"
              value={serviceLeads.length}
              subtitle="Package & tier bookings"
              icon={Zap}
              color="blue"
              trend="+100% active"
            />
            <StatsCard
              title="Contact Messages"
              value={contactMessages.length}
              subtitle="Website direct inquiries"
              icon={MessageSquare}
              color="emerald"
            />
            <StatsCard
              title="New Inquiries"
              value={newSubmissionsCount}
              subtitle="Pending architecture triage"
              icon={Sparkles}
              color="amber"
            />
            <StatsCard
              title="Pipeline Value"
              value={`$${(stats?.estimatedPipelineValue ?? totalPipelineValue).toLocaleString()}`}
              subtitle="Active contract opportunities"
              icon={DollarSign}
              color="cyan"
            />
          </div>
        )}

        {/* Inquiries Table Component */}
        <InquiryTable
          inquiries={filteredInquiries}
          allInquiriesCount={inquiries.length}
          serviceLeadsCount={serviceLeads.length}
          messagesCount={contactMessages.length}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onUpdateStatus={onUpdateStatus}
          hideCategorySwitcher={tab !== 'overview'}
        />
      </main>
    </div>
  );
}

function MainLayout({
  inquiries,
  isBackendConnected,
  adminEmail,
  onLogout,
  children,
}: {
  inquiries: ContactInquiry[];
  isBackendConnected: boolean;
  adminEmail: string;
  onLogout: () => void;
  children: React.ReactNode;
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = useMemo(() => {
    if (location.pathname.startsWith('/service-leads')) return 'service_leads';
    if (location.pathname.startsWith('/messages')) return 'messages';
    return 'overview';
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'service_leads') navigate('/service-leads');
    else if (tabId === 'messages') navigate('/messages');
    else navigate('/');
  };

  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000';
  const serviceLeads = inquiries.filter((i) => i.submissionType === 'service_lead');
  const contactMessages = inquiries.filter((i) => i.submissionType === 'message');

  return (
    <div className="flex min-h-screen bg-[#050A12] text-white select-none">
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        frontendUrl={frontendUrl}
        serviceLeadsCount={serviceLeads.length}
        messagesCount={contactMessages.length}
        totalInquiriesCount={inquiries.length}
        isBackendConnected={isBackendConnected}
        adminEmail={adminEmail}
        onLogout={onLogout}
      />
      <div className="flex-1 pl-64 flex flex-col min-w-0">{children}</div>
    </div>
  );
}

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const localToken = localStorage.getItem('novarch_admin_token');
    const sessionToken = sessionStorage.getItem('novarch_admin_token');
    return !!(localToken || sessionToken);
  });

  const [adminEmail, setAdminEmail] = useState<string>(() => {
    return (
      localStorage.getItem('novarch_admin_user') ||
      sessionStorage.getItem('novarch_admin_user') ||
      'admin@novarch.com'
    );
  });

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [isBackendConnected, setIsBackendConnected] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString(undefined, {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }) +
          ' ' +
          now.toLocaleTimeString(undefined, {
            hour: '2-digit',
            minute: '2-digit',
          })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const loadData = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    setError(null);
    try {
      const health = await api.getHealth();
      setIsBackendConnected(health.status === 'healthy');

      const [fetchedStats, fetchedContacts] = await Promise.all([
        api.getDashboardStats(),
        api.getContacts(),
      ]);

      setStats(fetchedStats);
      setInquiries(fetchedContacts);
    } catch (err: any) {
      console.warn('Backend connection warning:', err);
      setIsBackendConnected(false);
      if (inquiries.length === 0) {
        setError('Backend API currently offline. Operating in local storage mode.');
      }
    } finally {
      if (manual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, [inquiries.length]);

  // Polling with visibility detection
  useEffect(() => {
    if (!isAuthenticated) return;

    loadData();

    let interval: ReturnType<typeof setInterval> | null = null;

    const startPolling = () => {
      if (!interval) {
        interval = setInterval(() => {
          if (document.visibilityState !== 'hidden') {
            loadData();
          }
        }, 15000);
      }
    };

    const stopPolling = () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadData();
        startPolling();
      } else {
        stopPolling();
      }
    };

    startPolling();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadData, isAuthenticated]);

  const handleLoginSuccess = (email: string) => {
    setAdminEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('novarch_admin_token');
    localStorage.removeItem('novarch_admin_user');
    sessionStorage.removeItem('novarch_admin_token');
    sessionStorage.removeItem('novarch_admin_user');
    setIsAuthenticated(false);
  };

  const handleUpdateStatus = useCallback(async (id: string, newStatus: LeadStatus) => {
    try {
      const updated = await api.updateContactStatus(id, newStatus);
      setInquiries((prev) => prev.map((item) => (item.id === id ? updated : item)));
      const newStats = await api.getDashboardStats();
      setStats(newStats);
    } catch (err) {
      setInquiries((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: newStatus, updatedAt: new Date().toISOString() } : item))
      );
    }
  }, []);

  const handleDelete = useCallback(async (id: string) => {
    try {
      await api.deleteContact(id);
      setInquiries((prev) => prev.filter((item) => item.id !== id));
      const newStats = await api.getDashboardStats();
      setStats(newStats);
    } catch (err) {
      setInquiries((prev) => prev.filter((item) => item.id !== id));
    }
  }, []);

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Full-Page Route for Lead by ID (/inquiry/:id) */}
        <Route
          path="/inquiry/:id"
          element={
            <InquiryDetailPage
              inquiries={inquiries}
              onUpdateStatus={handleUpdateStatus}
              onDelete={handleDelete}
            />
          }
        />

        {/* Command Center (Overview) */}
        <Route
          path="/"
          element={
            <MainLayout
              inquiries={inquiries}
              isBackendConnected={isBackendConnected}
              adminEmail={adminEmail}
              onLogout={handleLogout}
            >
              <DashboardView
                tab="overview"
                stats={stats}
                inquiries={inquiries}
                onUpdateStatus={handleUpdateStatus}
                loadData={loadData}
                isRefreshing={isRefreshing}
                error={error}
                currentTime={currentTime}
                isBackendConnected={isBackendConnected}
              />
            </MainLayout>
          }
        />

        {/* Service Package Leads */}
        <Route
          path="/service-leads"
          element={
            <MainLayout
              inquiries={inquiries}
              isBackendConnected={isBackendConnected}
              adminEmail={adminEmail}
              onLogout={handleLogout}
            >
              <DashboardView
                tab="service_leads"
                stats={stats}
                inquiries={inquiries}
                onUpdateStatus={handleUpdateStatus}
                loadData={loadData}
                isRefreshing={isRefreshing}
                error={error}
                currentTime={currentTime}
                isBackendConnected={isBackendConnected}
              />
            </MainLayout>
          }
        />

        {/* Contact Messages */}
        <Route
          path="/messages"
          element={
            <MainLayout
              inquiries={inquiries}
              isBackendConnected={isBackendConnected}
              adminEmail={adminEmail}
              onLogout={handleLogout}
            >
              <DashboardView
                tab="messages"
                stats={stats}
                inquiries={inquiries}
                onUpdateStatus={handleUpdateStatus}
                loadData={loadData}
                isRefreshing={isRefreshing}
                error={error}
                currentTime={currentTime}
                isBackendConnected={isBackendConnected}
              />
            </MainLayout>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
