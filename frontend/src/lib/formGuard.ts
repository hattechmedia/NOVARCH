import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const MIN_TOKEN_AGE_MS = 1000;
const MAX_TOKEN_AGE_MS = 2 * 60 * 60 * 1000;

const hits = new Map<string, number[]>();

function formSecret(): string {
  const secret = process.env.FORM_SIGNING_SECRET;
  if (process.env.NODE_ENV === 'production') {
    if (!secret || secret.length < 32) {
      throw new Error('FORM_SIGNING_SECRET must be set to at least 32 characters in production');
    }
    return secret;
  }
  return secret || 'novarch-form-dev';
}

export function issueFormToken(): string {
  const issuedAt = Date.now().toString();
  const sig = createHmac('sha256', formSecret()).update(issuedAt).digest('hex');
  return Buffer.from(`${issuedAt}.${sig}`).toString('base64url');
}

export function verifyFormToken(token: unknown): boolean {
  if (typeof token !== 'string' || !token) return false;
  try {
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const [issuedAtRaw, sig] = decoded.split('.');
    if (!issuedAtRaw || !sig) return false;
    const expected = createHmac('sha256', formSecret()).update(issuedAtRaw).digest('hex');
    const sigBuf = Buffer.from(sig);
    const expectedBuf = Buffer.from(expected);
    if (sigBuf.length !== expectedBuf.length || !timingSafeEqual(sigBuf, expectedBuf)) {
      return false;
    }
    const issuedAt = Number(issuedAtRaw);
    if (!Number.isFinite(issuedAt)) return false;
    const age = Date.now() - issuedAt;
    return age >= MIN_TOKEN_AGE_MS && age <= MAX_TOKEN_AGE_MS;
  } catch {
    return false;
  }
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get(process.env.VERCEL ? 'x-vercel-forwarded-for' : process.env.NODE_ENV === 'production' ? 'x-novarch-verified-ip' : 'x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown';
  return 'unknown';
}

function pruneAndCount(ip: string): number {
  const now = Date.now();
  if (hits.size >= 5000) {
    for (const [key, times] of hits) {
      if (times.every(t => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  const next = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (next.length <= MAX_PER_WINDOW) next.push(now);
  if (!hits.has(ip) && hits.size >= 5000) return MAX_PER_WINDOW + 1;
  hits.set(ip, next);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      const kept = times.filter((t) => now - t < WINDOW_MS);
      if (kept.length === 0) hits.delete(key);
      else hits.set(key, kept);
    }
  }
  return next.length;
}

export function guardPublicForm(request: Request, body: Record<string, unknown>): NextResponse | null {
  if (typeof body.website_hp === 'string' && body.website_hp.trim() !== '') {
    return NextResponse.json({ error: 'Unable to submit this form.' }, { status: 400 });
  }

  if (!verifyFormToken(body.form_token)) {
    return NextResponse.json(
      { error: 'This form session expired. Please refresh the page and try again.' },
      { status: 400 }
    );
  }

  const ip = clientIp(request);
  if (pruneAndCount(ip) > MAX_PER_WINDOW) {
    return NextResponse.json(
      { error: 'Too many submissions from this network. Please wait a few minutes and try again.' },
      { status: 429 }
    );
  }

  return null;
}

export const BACKEND_UNAVAILABLE_MESSAGE =
  "We couldn't save your submission right now. Please try again in a moment.";
