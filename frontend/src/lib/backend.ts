const rawUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://novarch-backend.vercel.app'
).replace(/\/+$/, '');

export const BACKEND_API_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export function backendForwardHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  const secret = process.env.INTERNAL_API_SECRET;
  if (secret) {
    headers['X-Internal-Token'] = secret;
  }
  return headers;
}
