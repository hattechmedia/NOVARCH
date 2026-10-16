import { NextResponse } from 'next/server';
import { issueFormToken } from '@/lib/formGuard';

export async function GET() {
  try {
    return NextResponse.json(
      { token: issueFormToken() },
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch {
    return NextResponse.json({ error: 'Form protection is not configured' }, { status: 503 });
  }
}
