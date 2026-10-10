/**
 * NOVARCH Email Service
 * Handles transactional acknowledgment emails for Community & Winter Arc submissions.
 * If credentials are not configured, it safely reports unconfigured status without failing submissions.
 */

export interface SendAcknowledgmentParams {
  to: string;
  fullName: string;
  applicationType: 'winter-arc' | 'community';
}

export interface EmailSendResult {
  sent: boolean;
  status: 'sent' | 'unconfigured' | 'failed';
  message?: string;
  error?: string;
}

export class EmailService {
  private isConfigured(): boolean {
    return Boolean(
      process.env.RESEND_API_KEY ||
      (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS)
    );
  }

  async sendAcknowledgmentEmail(params: SendAcknowledgmentParams): Promise<EmailSendResult> {
    const { to, fullName, applicationType } = params;

    if (!this.isConfigured()) {
      const msg = `[Email Service]: Email delivery not configured in environment (RESEND_API_KEY / SMTP missing). Application saved successfully, acknowledgment email skipped for ${to}.`;
      console.log(msg);
      return {
        sent: false,
        status: 'unconfigured',
        message: msg,
      };
    }

    try {
      if (process.env.RESEND_API_KEY) {
        const subject =
          applicationType === 'winter-arc'
            ? 'Application Received: Winter Arc · Treffen 01 | NOVARCH'
            : 'Welcome to NOVARCH Community — Application Received';

        const textBody =
          applicationType === 'winter-arc'
            ? `Hello ${fullName},\n\nThank you for applying to Winter Arc · Treffen 01 in Ilmenau. We have received your application and will review it individually. If selected, we will reach out to you directly with event and venue details.\n\nBest regards,\nNOVARCH Team\nIlmenau, Germany\nhttps://novarch.eu`
            : `Hello ${fullName},\n\nThank you for joining the NOVARCH community. We have received your details and look forward to connecting.\n\nBest regards,\nNOVARCH Team\nhttps://novarch.eu`;

        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'NOVARCH <hello@novarch.eu>',
            to: [to],
            subject: subject,
            text: textBody,
          }),
        });

        if (res.ok) {
          console.log(`✉️ Acknowledgment email sent via Resend to ${to}`);
          return { sent: true, status: 'sent' };
        } else {
          const errData = await res.text();
          console.warn(`⚠️ Resend API responded with error for ${to}:`, errData);
          return { sent: false, status: 'failed', error: errData };
        }
      }

      return { sent: false, status: 'unconfigured' };
    } catch (err: any) {
      console.error(`❌ Failed to dispatch acknowledgment email to ${to}:`, err.message || err);
      return { sent: false, status: 'failed', error: err.message || String(err) };
    }
  }
}

export const emailService = new EmailService();
