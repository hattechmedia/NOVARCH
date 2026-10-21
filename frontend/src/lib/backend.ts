const rawUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://novarch-backend.vercel.app'
).replace(/\/+$/, '');

export const BACKEND_API_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export function backendForwardHeaders(request?: Request): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const secret = process.env.INTERNAL_API_SECRET;
  if (secret) {
    headers['X-Internal-Token'] = secret;
    if (request) {
      const header = process.env.VERCEL ? 'x-vercel-forwarded-for' : process.env.NODE_ENV === 'production' ? 'x-novarch-verified-ip' : 'x-forwarded-for';
      const ip = request.headers.get(header)?.split(',')[0]?.trim() || 'unknown';
      headers['X-Form-Client-IP'] = ip.slice(0, 64);
    }
  }
  return headers;
}
