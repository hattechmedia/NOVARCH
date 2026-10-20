import { readObject, RequestBodyError } from '@/lib/requestBody';
import { NextResponse } from 'next/server';
import { BACKEND_UNAVAILABLE_MESSAGE, guardPublicForm } from '@/lib/formGuard';
import { BACKEND_API_URL, backendForwardHeaders } from '@/lib/backend';

export async function POST(request: Request) {
  try {
    const body = await readObject(request);
    const blocked = guardPublicForm(request, body);
    if (blocked) return blocked;

    const isWinterArc =
      body.applicationType === 'winter-arc' ||
      Boolean(body.whatYouDo || body.whatCanYouOffer || body.whatAreYouLookingFor);

    console.log(
      `[NOVARCH ${isWinterArc ? 'Winter Arc' : 'Community'} Application Received]`
    );

    // Basic validation
    if (!body.fullName || !body.email) {
      return NextResponse.json(
        { error: 'Full name and email are required fields.' },
        { status: 400 }
      );
    }

    if (isWinterArc) {
      if (!body.city) {
        return NextResponse.json(
          { error: 'City is a required field for Winter Arc applications.' },
          { status: 400 }
        );
      }
      if (!body.organization) {
        return NextResponse.json(
          { error: 'Business, project, or community represented is required.' },
          { status: 400 }
        );
      }
      if (!body.whatYouDo) {
        return NextResponse.json(
          { error: 'Please tell us what you do.' },
          { status: 400 }
        );
      }
      if (!body.whatCanYouOffer) {
        return NextResponse.json(
          { error: 'Please share what you can offer the group.' },
          { status: 400 }
        );
      }
      if (!body.whatAreYouLookingFor) {
        return NextResponse.json(
          { error: 'Please share what you are looking for.' },
          { status: 400 }
        );
      }
    }

    // Combine phone with country code if provided
    const formattedContactNumber = body.contactNumber
      ? `${body.countryCode ? body.countryCode + ' ' : ''}${body.contactNumber}`
      : undefined;

    const backendPayload = {
      applicationType: isWinterArc ? 'winter-arc' : 'community',
      fullName: String(body.fullName || '').trim(),
      email: String(body.email || '').trim().toLowerCase(),
      country: body.country ? String(body.country).trim() : undefined,
      city: body.city ? String(body.city).trim() : undefined,
      contactNumber: formattedContactNumber,
      countryCode: body.countryCode,
      organization: body.organization ? String(body.organization).trim() : undefined,
      role: body.role ? String(body.role).trim() : undefined,
      whatYouDo: body.whatYouDo ? String(body.whatYouDo).trim() : undefined,
      whatCanYouOffer: body.whatCanYouOffer ? String(body.whatCanYouOffer).trim() : undefined,
      whatAreYouLookingFor: body.whatAreYouLookingFor ? String(body.whatAreYouLookingFor).trim() : undefined,
      linkedinUrl: body.linkedinUrl ? String(body.linkedinUrl).trim() : undefined,
      portfolioUrl: body.portfolioUrl ? String(body.portfolioUrl).trim() : undefined,
      proposedGuest: body.proposedGuest ? String(body.proposedGuest).trim() : undefined,
      interests: Array.isArray(body.interests) ? body.interests : [],
      message: body.message ? String(body.message).trim() : undefined,
      referral: body.referral || undefined,
      source: body.source || undefined,
      marketingConsent: Boolean(body.marketingConsent === true),
      photoConsent: Boolean(body.photoConsent === true),
    };

    try {
      const backendRes = await fetch(`${BACKEND_API_URL}/community`, {
        method: 'POST',
        headers: backendForwardHeaders(request),
        signal: AbortSignal.timeout(20000),
        body: JSON.stringify(backendPayload),
      });

      const backendData = await backendRes.json().catch(() => ({}));

      if (backendRes.ok) {
        return NextResponse.json({
          success: true,
          message:
            backendData.message ||
            (isWinterArc
              ? "Thank you for applying to Winter Arc. Your application has been received. We'll review it and contact you if you're selected. Thanks for your interest in Treffen 01."
              : 'Community application received and saved successfully.'),
          data: backendData.data,
          emailStatus: backendData.emailStatus,
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
      console.warn('[Community/Winter-Arc Backend Forwarding Warning]: Backend API unreachable.', backendErr);
      return NextResponse.json({ error: BACKEND_UNAVAILABLE_MESSAGE }, { status: 502 });
    }
  } catch (error) {
    if (error instanceof RequestBodyError) return NextResponse.json({ error: error.message }, { status: error.status });
    console.error('[NOVARCH Community/Winter-Arc Join Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing application.' },
      { status: 500 }
    );
  }
}
