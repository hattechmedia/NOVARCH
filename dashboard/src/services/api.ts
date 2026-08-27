import { ContactInquiry, DashboardStats, HealthResponse, LeadStatus } from '../types';

const rawBase = (import.meta.env.VITE_API_URL || '/api').trim();
const API_BASE = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

// Helper to get stored JWT Token
export function getAdminToken(): string | null {
  return localStorage.getItem('novarch_admin_token') || sessionStorage.getItem('novarch_admin_token');
}

// In-flight request deduplication map to prevent redundant concurrent GET queries
const inFlightRequests = new Map<string, Promise<any>>();

async function fetchWithAuth<T>(url: string, init?: RequestInit): Promise<T> {
  const token = getAdminToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(init?.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const method = init?.method?.toUpperCase() || 'GET';
  if (method !== 'GET') {
    const res = await fetch(url, { ...init, headers });
    if (res.status === 401) {
      localStorage.removeItem('novarch_admin_token');
      sessionStorage.removeItem('novarch_admin_token');
      window.location.reload();
      throw new Error('Unauthorized');
    }
    if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);
    return res.json();
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)! as Promise<T>;
  }

  const promise = fetch(url, { ...init, headers })
    .then(async (res) => {
      if (res.status === 401) {
        localStorage.removeItem('novarch_admin_token');
        sessionStorage.removeItem('novarch_admin_token');
        window.location.reload();
        throw new Error('Unauthorized');
      }
      if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);
      return res.json();
    })
    .finally(() => {
      inFlightRequests.delete(url);
    });

  inFlightRequests.set(url, promise);
  return promise as Promise<T>;
}

export const api = {
  async login(email: string, password: string): Promise<{ token: string; user: { email: string } }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Invalid administrator email or password.');
    }

    return res.json();
  },

  async getHealth(): Promise<HealthResponse> {
    const res = await fetch(`${API_BASE}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return res.json();
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const json = await fetchWithAuth<{ data: DashboardStats }>(`${API_BASE}/dashboard/stats`);
    return json.data;
  },

  async getContacts(): Promise<ContactInquiry[]> {
    const json = await fetchWithAuth<{ data: ContactInquiry[] }>(`${API_BASE}/contacts`);
    return json.data;
  },

  async updateContactStatus(id: string, status: LeadStatus): Promise<ContactInquiry> {
    const json = await fetchWithAuth<{ data: ContactInquiry }>(`${API_BASE}/contacts/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return json.data;
  },

  async deleteContact(id: string): Promise<boolean> {
    await fetchWithAuth(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
    });
    return true;
  },
};
