export type AuditAction =
  | 'CREATE'
  | 'UPDATE'
  | 'UPDATE_STATUS'
  | 'PUBLISH'
  | 'ARCHIVE'
  | 'DELETE'
  | 'AUTH_LOGIN'
  | 'AUTH_LOGOUT';

export type AuditStatus = 'SUCCESS' | 'FAILURE';

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: AuditAction;
  resource: string;
  resourceId?: string;
  status: AuditStatus;
  timestamp: string;
  metadata?: Record<string, any>;
}

export class AuditService {
  private logs: AuditLogEntry[] = [];
  private maxLogs = 500;

  async log(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<AuditLogEntry> {
    const fullEntry: AuditLogEntry = {
      ...entry,
      id: `audit-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
    };

    this.logs.unshift(fullEntry);
    if (this.logs.length > this.maxLogs) {
      this.logs.length = this.maxLogs;
    }

    if (process.env.NODE_ENV !== 'test') {
      console.log(
        `[AUDIT] [${fullEntry.timestamp}] [${fullEntry.actor}] ${fullEntry.action} ${fullEntry.resource} (${fullEntry.resourceId || 'N/A'}) -> ${fullEntry.status}`
      );
    }

    return fullEntry;
  }

  async getRecentLogs(limit = 50): Promise<AuditLogEntry[]> {
    return this.logs.slice(0, limit);
  }
}

export const auditService = new AuditService();
