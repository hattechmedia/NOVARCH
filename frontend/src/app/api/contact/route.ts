import { readObject, RequestBodyError } from '@/lib/requestBody';
import { NextResponse } from 'next/server';
import { BACKEND_UNAVAILABLE_MESSAGE, guardPublicForm } from '@/lib/formGuard';
import { BACKEND_API_URL, backendForwardHeaders } from '@/lib/backend';

export async function POST(request: Request) {
  try {
    const body = await readObject(request);
    const blocked = guardPublicForm(request, body);
    if (blocked) return blocked;

    console.log('[NOVARCH Intake Received]');

    // Validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Combine phone with country code if provided
    const formattedPhone = body.phone
      ? `${body.countryCode ? body.countryCode + ' ' : ''}${body.phone}`
      : undefined;

    const isServiceLead = body.submissionType === 'service_lead';

    // Prepare payload for backend
    const backendPayload = {
      submissionType: isServiceLead ? 'service_lead' : 'message',
      name: body.name,
      email: body.email,
      phone: formattedPhone,
      countryCode: body.countryCode,
      company: body.company || undefined,
      planName: body.planName || undefined,
      planTier: body.planTier || undefined,
      performances: Array.isArray(body.performances) ? body.performances : [],
      serviceType:
        body.serviceType ||
        (Array.isArray(body.performances) && body.performances.length > 0
          ? body.performances.join(', ')
          : 'General Inquiry'),
      preferredService:
        body.preferredService ||
        (Array.isArray(body.performances) && body.performances.length > 0
          ? body.performances[0]
          : 'General Inquiry'),
      news: body.news || undefined,
      message:
        body.message ||
        body.news ||
        (isServiceLead
          ? `Subscription booking for ${body.preferredService || 'Service'} - ${body.planName || 'Package'}`
          : 'Inquiry submitted via website contact form.'),
    };

    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/contact`, {
        method: 'POST',
        headers: backendForwardHeaders(request),
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify(backendPayload),
      });

      const backendData = await backendRes.json().catch(() => ({}));

      if (backendRes.ok) {
        return NextResponse.json({
          success: true,
          message: isServiceLead
            ? 'Package subscription received and synchronized with NOVARCH backend.'
            : 'Project message received and synchronized with NOVARCH backend.',
          data: backendData.data,
        });
      }

      const status = backendRes.status >= 400 && backendRes.status < 500 ? backendRes.status : 502;
      return NextResponse.json(
        {
          error:
            backendData.message ||
            backendData.error ||
            (status === 502 ? BACKEND_UNAVAILABLE_MESSAGE : 'Submission validation failed on server.'),
        },
        { status }
      );
    } catch (backendErr) {
      console.warn('[Backend Forwarding Warning]: Backend API unreachable.', backendErr);
      return NextResponse.json({ error: BACKEND_UNAVAILABLE_MESSAGE }, { status: 502 });
    }
  } catch (error) {
    if (error instanceof RequestBodyError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('[NOVARCH Intake Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing intake.' },
      { status: 500 }
    );
  }
}
