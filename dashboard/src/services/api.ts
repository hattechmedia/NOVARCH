import { ContactInquiry, DashboardStats, HealthResponse, LeadStatus } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

// In-flight request deduplication map to prevent redundant concurrent GET queries
const inFlightRequests = new Map<string, Promise<any>>();

async function fetchWithDeduplication<T>(url: string, init?: RequestInit): Promise<T> {
  const method = init?.method?.toUpperCase() || 'GET';
  if (method !== 'GET') {
    const res = await fetch(url, init);
    if (!res.ok) throw new Error(`HTTP Error: ${res.statusText}`);
    return res.json();
  }

  if (inFlightRequests.has(url)) {
    return inFlightRequests.get(url)! as Promise<T>;
  }

  const promise = fetch(url, init)
    .then(async (res) => {
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
  async getHealth(): Promise<HealthResponse> {
    return fetchWithDeduplication<HealthResponse>(`${API_BASE}/health`);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const json = await fetchWithDeduplication<{ data: DashboardStats }>(`${API_BASE}/dashboard/stats`);
    return json.data;
  },

  async getContacts(): Promise<ContactInquiry[]> {
    const json = await fetchWithDeduplication<{ data: ContactInquiry[] }>(`${API_BASE}/contacts`);
    return json.data;
  },

  async updateContactStatus(id: string, status: LeadStatus): Promise<ContactInquiry> {
    const res = await fetch(`${API_BASE}/contacts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`Failed to update status: ${res.statusText}`);
    const json = await res.json();
    return json.data;
  },

  async deleteContact(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
    });
    return res.ok;
  },
};
