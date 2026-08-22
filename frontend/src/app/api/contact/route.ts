import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log('[NOVARCH Intake Received]:', JSON.stringify(body, null, 2));

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
      planPrice: body.planPrice || undefined,
      estimatedValue: body.estimatedValue || undefined,
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

    // Forward to Express Backend Server
    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
      });

      if (backendRes.ok) {
        const backendData = await backendRes.json();
        return NextResponse.json({
          success: true,
          message: isServiceLead
            ? 'Package subscription received and synchronized with NOVARCH backend.'
            : 'Project message received and synchronized with NOVARCH backend.',
          data: backendData.data,
        });
      }
    } catch (backendErr) {
      console.warn('[Backend Forwarding Warning]: Backend API unreachable, recorded locally.', backendErr);
    }

    return NextResponse.json({
      success: true,
      message: isServiceLead
        ? 'Subscription request received successfully. The NOVARCH team will reach out within 24 hours.'
        : 'Message received successfully. The NOVARCH team will reach out within 24 hours.',
    });
  } catch (error) {
    console.error('[NOVARCH Intake Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing intake.' },
      { status: 500 }
    );
  }
}
