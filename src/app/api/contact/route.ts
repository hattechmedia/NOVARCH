import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Log received project intake data for verification
    console.log('[NOVARCH Contact Intake Received]:', JSON.stringify(body, null, 2));

    // Basic validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    if (!body.privacyAcknowledged) {
      return NextResponse.json(
        { error: 'Privacy acknowledgment is required.' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Project intake received successfully. The NOVARCH team will reach out within 24 hours.',
    });
  } catch (error) {
    console.error('[NOVARCH Contact Error]:', error);
    return NextResponse.json(
      { error: 'Internal server error processing project intake.' },
      { status: 500 }
    );
  }
}
