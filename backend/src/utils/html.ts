export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

/** A separate escaped view for HTML templates; never use for database writes. */
export function htmlValues<T>(value: T): T {
  if (typeof value === 'string') return escapeHtml(value) as T;
  if (Array.isArray(value)) return value.map(htmlValues) as T;
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => {
      if (/url$/i.test(key) && typeof item === 'string' && item) {
        try { const url = new URL(item); if (!['https:', 'http:'].includes(url.protocol)) return [key, '#']; }
        catch { return [key, '#']; }
      }
      return [key, htmlValues(item)];
    })) as T;
  }
  return value;
}
