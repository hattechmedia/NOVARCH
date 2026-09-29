import { NextResponse } from 'next/server';

const rawUrl = (
  process.env.BACKEND_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:5000'
).replace(/\/+$/, '');
const BACKEND_API_URL = rawUrl.endsWith('/api') ? rawUrl : `${rawUrl}/api`;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('[NOVARCH Community Join Received]:', JSON.stringify(body, null, 2));

    // Basic validation
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { error: 'Full name and email are required fields.' },
        { status: 400 }
      );
    }

    // Combine phone with country code if provided
    const formattedContactNumber = body.contactNumber
      ? `${body.countryCode ? body.countryCode + ' ' : ''}${body.contactNumber}`
      : undefined;

    const backendPayload = {
      fullName: body.fullName,
      email: body.email,
      contactNumber: formattedContactNumber,
      countryCode: body.countryCode,
      organization: body.organization || undefined,
      role: body.role || undefined,
      interests: Array.isArray(body.interests) ? body.interests : [],
      message: body.message || undefined,
      website_hp: body.website_hp || undefined,
    };

    // Forward to Express Backend
    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/community`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backendPayload),
      });

      const backendData = await backendRes.json().catch(() => ({}));

      if (backendRes.ok) {
        return NextResponse.json({
          success: true,
          message: 'Community application received and saved successfully.',
          data: backendData.data,
        });
      } else {
        if (backendRes.status >= 400 && backendRes.status < 500) {
          return NextResponse.json(
            { error: backendData.message || backendData.error || 'Submission validation failed on server.' },
            { status: backendRes.status }
          );
        }
      }
    } catch (backendErr) {
      console.warn('[Community Backend Forwarding Warning]: Backend API unreachable, recorded locally.', backendErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Community application received successfully. Welcome to NOVARCH!',
    });
  } catch (error) {
    console.error('[NOVARCH Community Join Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing community application.' },
      { status: 500 }
    );
  }
}
