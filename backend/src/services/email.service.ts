import { htmlValues } from '../utils/html.js';
/**
 * NOVARCH Email Service
 * Handles transactional emails, customer acknowledgments, and instant admin lead notifications
 * for all website contact inquiries, service subscriptions, Winter Arc, and community applications.
 */

import nodemailer from 'nodemailer';
import { getSmtpConfig } from '../config/smtp.js';
import { ContactInquiry } from '../types/contact.types.js';
import { CommunityMember } from '../types/community.types.js';

export interface SendAcknowledgmentParams {
  to: string;
  fullName: string;
  applicationType: 'winter-arc' | 'community';
}

export interface SendEmailOptions {
  to: string | string[];
  replyTo?: string;
  subject: string;
  text: string;
  html?: string;
}

export interface EmailSendResult {
  sent: boolean;
  status: 'sent' | 'unconfigured' | 'failed';
  message?: string;
  error?: string;
}

export function getAdminNotificationEmail(): string {
  return (
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.NOTIFICATION_EMAIL ||
    process.env.SMTP_FROM_EMAIL ||
    'mesum@novarch.eu'
  );
}

export class EmailService {
  private isConfigured(): boolean {
    return Boolean(process.env.RESEND_API_KEY || getSmtpConfig());
  }

  /**
   * Generic unified email sender supporting Resend API & SMTP (with HTML, text & reply-to)
   */
  async sendEmail(options: SendEmailOptions): Promise<EmailSendResult> {
    const { to, replyTo, subject, text, html } = options;
    const recipientStr = Array.isArray(to) ? to.join(', ') : to;

    if (!this.isConfigured()) {
      const msg = `[Email Service]: Neither RESEND_API_KEY nor SMTP credentials configured. Email skipped.`;
      console.log(msg);
      return { sent: false, status: 'unconfigured', message: msg };
    }

    try {
      // Option A: Resend API
      if (process.env.RESEND_API_KEY) {
        const toList = Array.isArray(to) ? to : [to];
        const res = await fetch('https://api.resend.com/emails', {
          signal: AbortSignal.timeout(15000),
          method: 'POST',
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.EMAIL_FROM || 'NOVARCH <hello@novarch.eu>',
            to: toList,
            reply_to: replyTo,
            subject,
            text,
            html,
          }),
        });

        if (res.ok) {
          console.log(`✉️ Email successfully dispatched via Resend `);
          return { sent: true, status: 'sent' };
        } else {
          const errData = await res.text();
          console.warn('Email provider rejected request', res.status);
          return { sent: false, status: 'failed', error: errData };
        }
      }

      // Option B: Encrypted SMTP via Nodemailer
      const smtp = getSmtpConfig();
      if (!smtp) {
        return { sent: false, status: 'unconfigured' };
      }

      const transporter = nodemailer.createTransport({
        host: smtp.host,
        port: smtp.port,
        secure: smtp.useSsl,
        auth: {
          user: smtp.username,
          pass: smtp.password,
        },
        connectionTimeout: smtp.timeoutSeconds * 1000,
        greetingTimeout: smtp.timeoutSeconds * 1000,
        socketTimeout: smtp.timeoutSeconds * 1000,
      });

      await transporter.sendMail({
        from: `"${smtp.fromName}" <${smtp.fromEmail}>`,
        to,
        replyTo: replyTo || smtp.fromEmail,
        subject,
        text,
        html,
      });

      console.log(`✉️ Email successfully dispatched via SMTP `);
      return { sent: true, status: 'sent' };
    } catch (err: any) {
      console.error('Email dispatch failed');
      return { sent: false, status: 'failed', error: err.message || String(err) };
    }
  }

  /**
   * Alert the website owner / admin whenever a new Contact inquiry or Service Lead is submitted
   */
  async sendContactLeadNotification(inquiry: ContactInquiry): Promise<EmailSendResult> {
    const adminEmail = getAdminNotificationEmail();
    const isServiceLead = inquiry.submissionType === 'service_lead';
    const title = isServiceLead ? 'New Service Package Lead' : 'New Contact Inquiry';
    const subject = isServiceLead
      ? `[NOVARCH Lead] ${inquiry.planName || 'Package Subscription'} — ${inquiry.name}`
      : `[NOVARCH Contact] New Inquiry from ${inquiry.name}`;

    const textBody = `
========================================
🔔 NOVARCH: ${title.toUpperCase()}
========================================

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'Not provided'}
Company: ${inquiry.company || 'Not provided'}

Submission Type: ${isServiceLead ? 'Service Package Lead' : 'Contact Message'}
Service: ${inquiry.serviceType || 'General'}
${inquiry.planName ? `Plan / Package: ${inquiry.planName}` : ''}
${inquiry.planTier ? `Tier: ${inquiry.planTier}` : ''}
${inquiry.planPrice ? `Estimated Value: ${inquiry.planPrice}` : ''}

Message / Details:
${inquiry.message || inquiry.news || 'No additional message.'}

Received At: ${new Date(inquiry.createdAt || Date.now()).toLocaleString()}
Lead ID: ${inquiry.id}

---
Direct Dashboard: https://novarch-dashboard.vercel.app/inquiry/${inquiry.id}
    `.trim();

    const safeHtml = htmlValues(inquiry);
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050A12; color: #FFFFFF; margin: 0; padding: 24px 12px; }
    .card { max-width: 620px; margin: 0 auto; background: #0B1524; border: 1px solid #17304E; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #07101E 0%, #0F233D 100%); padding: 24px 28px; border-bottom: 1px solid #1E3A5F; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-family: monospace; font-weight: bold; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.08em; background: rgba(56,178,216,0.15); color: #38B2D8; border: 1px solid rgba(56,178,216,0.3); margin-bottom: 8px; }
    .title { margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; }
    .body-content { padding: 28px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .data-table td { padding: 10px 12px; border-bottom: 1px solid rgba(23,48,78,0.7); }
    .data-table td.label { width: 35%; color: #7A8FA6; font-family: monospace; font-size: 12px; text-transform: uppercase; }
    .data-table td.value { color: #F1F5F9; font-weight: 500; }
    .message-box { background: #07101E; border: 1px solid #17304E; border-radius: 10px; padding: 16px; font-size: 14px; line-height: 1.6; color: #CBD5E1; white-space: pre-wrap; margin-bottom: 24px; }
    .cta-container { text-align: center; padding-top: 8px; }
    .btn { display: inline-block; background: #1E5FBF; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; letter-spacing: 0.02em; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #4A6080; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">NOVARCH INTAKE ALERT</span>
      <h1 class="title">${title}</h1>
    </div>
    <div class="body-content">
      <table class="data-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${safeHtml.name}</strong></td>
        </tr>
        <tr>
          <td class="label">Work Email</td>
          <td class="value"><a href="mailto:${safeHtml.email}" style="color: #38B2D8; text-decoration: none;">${safeHtml.email}</a></td>
        </tr>
        ${safeHtml.phone ? `<tr><td class="label">Phone</td><td class="value">${safeHtml.phone}</td></tr>` : ''}
        ${safeHtml.company ? `<tr><td class="label">Company</td><td class="value">${safeHtml.company}</td></tr>` : ''}
        <tr>
          <td class="label">Service / Scope</td>
          <td class="value">${safeHtml.serviceType || 'General Inquiry'}</td>
        </tr>
        ${safeHtml.planName ? `<tr><td class="label">Package Plan</td><td class="value" style="color: #38B2D8;"><strong>${safeHtml.planName}</strong> (${safeHtml.planTier || 'Standard'})</td></tr>` : ''}
        ${safeHtml.planPrice ? `<tr><td class="label">Estimated Value</td><td class="value" style="color: #34D399; font-weight: bold;">${safeHtml.planPrice}</td></tr>` : ''}
        <tr>
          <td class="label">Submission Date</td>
          <td class="value">${new Date(safeHtml.createdAt || Date.now()).toLocaleString()}</td>
        </tr>
      </table>

      <div style="font-size: 12px; font-family: monospace; color: #7A8FA6; text-transform: uppercase; margin-bottom: 8px;">
        Inquiry Message / Notes:
      </div>
      <div class="message-box">
        ${safeHtml.message || safeHtml.news || 'No additional note provided.'}
      </div>

      <div class="cta-container">
        <a href="https://novarch-dashboard.vercel.app/inquiry/${safeHtml.id}" class="btn">
          Open in Command Dashboard &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      NOVARCH Command Portal &bull; Automated Lead Notification &bull; Reply directly to reach client
    </div>
  </div>
</body>
</html>
    `.trim();

    return this.sendEmail({
      to: adminEmail,
      replyTo: inquiry.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
  }

  /**
   * Confirmation email sent directly to client after submitting website contact form
   */
  async sendContactAcknowledgment(inquiry: ContactInquiry): Promise<EmailSendResult> {
    const isServiceLead = inquiry.submissionType === 'service_lead';
    const subject = isServiceLead
      ? `We have received your request for ${inquiry.planName || 'NOVARCH Blueprint'}`
      : 'Thank you for reaching out to NOVARCH';

    const textBody = `
Hello ${inquiry.name},

Thank you for contacting NOVARCH. We have received your ${isServiceLead ? `inquiry for ${inquiry.planName || 'our engineering packages'}` : 'message'}.

Our technical architecture team will review your requirements and follow up with you within 24 hours.

Your Submission Summary:
- Service: ${inquiry.serviceType || 'General Inquiry'}
${inquiry.planName ? `- Package: ${inquiry.planName}` : ''}
${inquiry.company ? `- Company: ${inquiry.company}` : ''}

Best regards,
The NOVARCH Team
https://novarch.eu
    `.trim();

    const safeHtml = htmlValues(inquiry);
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050A12; color: #FFFFFF; margin: 0; padding: 24px 12px; }
    .card { max-width: 600px; margin: 0 auto; background: #0B1524; border: 1px solid #17304E; border-radius: 16px; padding: 32px 28px; }
    .title { font-size: 20px; font-weight: 700; color: #FFFFFF; margin: 0 0 16px 0; }
    p { font-size: 14px; line-height: 1.6; color: #CBD5E1; margin: 0 0 16px 0; }
    .highlight-box { background: #07101E; border-left: 3px solid #38B2D8; border-radius: 4px; padding: 14px 18px; margin: 20px 0; font-size: 13px; color: #94A3B8; }
    .footer { border-top: 1px solid #17304E; padding-top: 20px; margin-top: 28px; font-size: 12px; color: #64748B; }
  </style>
</head>
<body>
  <div class="card">
    <h1 class="title">Thank you for connecting with NOVARCH</h1>
    <p>Hello <strong>${safeHtml.name}</strong>,</p>
    <p>We have successfully logged your safeHtml. Our engineering and architecture team will review your requirements and respond directly to this email within 24 hours.</p>
    
    <div class="highlight-box">
      <strong>Scope:</strong> ${safeHtml.serviceType || 'General Inquiry'}<br/>
      ${safeHtml.planName ? `<strong>Package:</strong> ${safeHtml.planName}<br/>` : ''}
      <strong>Status:</strong> Under Architecture Review
    </div>

    <p>If you have additional technical specifications or context to share, simply reply to this email.</p>

    <div class="footer">
      <strong>NOVARCH</strong> &bull; Next-Generation Engineering Systems<br/>
      <a href="https://novarch.eu" style="color: #38B2D8; text-decoration: none;">https://novarch.eu</a>
    </div>
  </div>
</body>
</html>
    `.trim();

    return this.sendEmail({
      to: inquiry.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
  }

  /**
   * Alert the website owner / admin whenever a new Community or Winter Arc application is received
   */
  async sendCommunityAdminNotification(member: CommunityMember): Promise<EmailSendResult> {
    const adminEmail = getAdminNotificationEmail();
    const isWinterArc = member.applicationType === 'winter-arc';
    const title = isWinterArc
      ? 'Winter Arc · Treffen 01 Application'
      : 'New Community Member Application';
    const subject = isWinterArc
      ? `[NOVARCH Winter Arc] Treffen 01 Application — ${member.fullName}`
      : `[NOVARCH Community] New Application — ${member.fullName}`;

    const referralText =
      typeof member.referral === 'string'
        ? member.referral
        : member.referral
        ? [member.referral.utmSource, member.referral.utmMedium, member.referral.utmCampaign, member.referral.referrer]
            .filter(Boolean)
            .join(' | ')
        : 'Direct / Website';

    const textBody = `
========================================
🔥 NOVARCH: ${title.toUpperCase()}
========================================

Full Name: ${member.fullName}
Email: ${member.email}
Country / Location: ${member.country || 'Not provided'}
Role: ${member.role || 'Not provided'}
Company / Org: ${member.organization || 'Not provided'}

${isWinterArc ? `
[Winter Arc Details]
- What You Do: ${member.whatYouDo || 'N/A'}
- What You Can Offer: ${member.whatCanYouOffer || 'N/A'}
- What You Are Looking For: ${member.whatAreYouLookingFor || 'N/A'}
- LinkedIn: ${member.linkedinUrl || 'N/A'}
- Portfolio / GitHub: ${member.portfolioUrl || 'N/A'}
` : `
[Community Details]
- Interests: ${member.interests?.join(', ') || 'N/A'}
- Introduction / Message: ${member.message || 'N/A'}
- Source / Referral: ${referralText}
`}

Submission Date: ${new Date(member.createdAt || Date.now()).toLocaleString()}
Application ID: ${member.id}

---
View in Dashboard: https://novarch-dashboard.vercel.app/${isWinterArc ? 'winter-arc' : 'community'}/${member.id}
    `.trim();

    const safeHtml = htmlValues(member);
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050A12; color: #FFFFFF; margin: 0; padding: 24px 12px; }
    .card { max-width: 620px; margin: 0 auto; background: #0B1524; border: 1px solid #17304E; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #07101E 0%, #152238 100%); padding: 24px 28px; border-bottom: 1px solid #1E3A5F; }
    .badge { display: inline-block; padding: 4px 10px; font-size: 11px; font-family: monospace; font-weight: bold; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.08em; background: ${isWinterArc ? 'rgba(6,182,212,0.15)' : 'rgba(245,158,11,0.15)'}; color: ${isWinterArc ? '#22D3EE' : '#FBBF24'}; border: 1px solid ${isWinterArc ? 'rgba(6,182,212,0.3)' : 'rgba(245,158,11,0.3)'}; margin-bottom: 8px; }
    .title { margin: 0; font-size: 22px; font-weight: 700; color: #FFFFFF; }
    .body-content { padding: 28px; }
    .data-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .data-table td { padding: 10px 12px; border-bottom: 1px solid rgba(23,48,78,0.7); }
    .data-table td.label { width: 35%; color: #7A8FA6; font-family: monospace; font-size: 12px; text-transform: uppercase; }
    .data-table td.value { color: #F1F5F9; font-weight: 500; }
    .section-title { font-size: 12px; font-family: monospace; color: #7A8FA6; text-transform: uppercase; margin: 16px 0 8px 0; }
    .content-box { background: #07101E; border: 1px solid #17304E; border-radius: 10px; padding: 14px 16px; font-size: 14px; line-height: 1.6; color: #CBD5E1; margin-bottom: 16px; white-space: pre-wrap; }
    .cta-container { text-align: center; padding-top: 16px; }
    .btn { display: inline-block; background: #1E5FBF; color: #FFFFFF !important; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-weight: 600; font-size: 14px; }
    .footer { text-align: center; padding: 20px; font-size: 12px; color: #4A6080; font-family: monospace; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <span class="badge">${isWinterArc ? 'TREFFEN 01 APPLICATION' : 'COMMUNITY JOIN APPLICATION'}</span>
      <h1 class="title">${title}</h1>
    </div>
    <div class="body-content">
      <table class="data-table">
        <tr>
          <td class="label">Full Name</td>
          <td class="value"><strong>${safeHtml.fullName}</strong></td>
        </tr>
        <tr>
          <td class="label">Email Address</td>
          <td class="value"><a href="mailto:${safeHtml.email}" style="color: #38B2D8; text-decoration: none;">${safeHtml.email}</a></td>
        </tr>
        ${safeHtml.country ? `<tr><td class="label">Country / Location</td><td class="value">${safeHtml.country}</td></tr>` : ''}
        ${safeHtml.organization ? `<tr><td class="label">Organization / Company</td><td class="value">${safeHtml.organization}</td></tr>` : ''}
        ${safeHtml.role ? `<tr><td class="label">Role</td><td class="value">${safeHtml.role}</td></tr>` : ''}
        ${!isWinterArc && referralText ? `<tr><td class="label">Source / Referral</td><td class="value">${htmlValues(referralText)}</td></tr>` : ''}
        <tr>
          <td class="label">Submitted</td>
          <td class="value">${new Date(safeHtml.createdAt || Date.now()).toLocaleString()}</td>
        </tr>
      </table>

      ${isWinterArc ? `
        ${safeHtml.whatYouDo ? `
          <div class="section-title">What You Do</div>
          <div class="content-box">${safeHtml.whatYouDo}</div>
        ` : ''}
        ${safeHtml.whatCanYouOffer ? `
          <div class="section-title">What You Can Offer</div>
          <div class="content-box">${safeHtml.whatCanYouOffer}</div>
        ` : ''}
        ${safeHtml.whatAreYouLookingFor ? `
          <div class="section-title">What You Are Looking For</div>
          <div class="content-box">${safeHtml.whatAreYouLookingFor}</div>
        ` : ''}
        ${safeHtml.linkedinUrl ? `<p style="font-size: 13px; color: #94A3B8;">LinkedIn: <a href="${safeHtml.linkedinUrl}" style="color: #38B2D8;">${safeHtml.linkedinUrl}</a></p>` : ''}
        ${safeHtml.portfolioUrl ? `<p style="font-size: 13px; color: #94A3B8;">Portfolio / GitHub: <a href="${safeHtml.portfolioUrl}" style="color: #38B2D8;">${safeHtml.portfolioUrl}</a></p>` : ''}
      ` : `
        ${safeHtml.interests && safeHtml.interests.length > 0 ? `
          <div class="section-title">Interests</div>
          <p style="color: #38B2D8; font-family: monospace; font-size: 13px; margin: 0 0 16px 0;">${safeHtml.interests.join(' &bull; ')}</p>
        ` : ''}
        ${safeHtml.message ? `
          <div class="section-title">Introduction / Message</div>
          <div class="content-box">${safeHtml.message}</div>
        ` : ''}
      `}

      <div class="cta-container">
        <a href="https://novarch-dashboard.vercel.app/${isWinterArc ? 'winter-arc' : 'community'}/${safeHtml.id}" class="btn">
          View Application in Dashboard &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      NOVARCH Command Portal &bull; Automated Community Alert &bull; Reply directly to reach applicant
    </div>
  </div>
</body>
</html>
    `.trim();

    return this.sendEmail({
      to: adminEmail,
      replyTo: member.email,
      subject,
      text: textBody,
      html: htmlBody,
    });
  }

  /**
   * Existing acknowledgment method for Community / Winter Arc applicants
   */
  async sendAcknowledgmentEmail(params: SendAcknowledgmentParams): Promise<EmailSendResult> {
    const { to, fullName, applicationType } = params;

    const subject =
      applicationType === 'winter-arc'
        ? 'Application Received: Winter Arc · Treffen 01 | NOVARCH'
        : 'Welcome to NOVARCH Community — Application Received';

    const textBody =
      applicationType === 'winter-arc'
        ? `Hello ${fullName},\n\nThank you for applying to Winter Arc · Treffen 01 in Ilmenau. We have received your application and will review it individually. If selected, we will reach out to you directly with event and venue details.\n\nBest regards,\nNOVARCH Team\nIlmenau, Germany\nhttps://novarch.eu`
        : `Hello ${fullName},\n\nThank you for joining the NOVARCH community. We have received your details and look forward to connecting.\n\nBest regards,\nNOVARCH Team\nhttps://novarch.eu`;

    return this.sendEmail({
      to,
      subject,
      text: textBody,
    });
  }

  /**
   * Existing method for admin replying to a Winter Arc applicant
   */
  async sendWinterArcReply(params: {
    to: string;
    fullName: string;
    subject: string;
    message: string;
  }): Promise<EmailSendResult> {
    return this.sendEmail({
      to: params.to,
      subject: params.subject,
      text: params.message,
    });
  }

  /**
   * Guard: returns true ONLY if the member has active, unrevoked marketing consent.
   * This MUST be called at the last responsible moment before sending any promotional email.
   * Absence of consent, explicit false, or a recorded withdrawal all return false.
   */
  canSendMarketingEmail(member: Pick<CommunityMember, 'marketingConsent' | 'marketingConsentWithdrawnAt'>): boolean {
    if (!member.marketingConsent) return false;
    if (member.marketingConsentWithdrawnAt) return false;
    return true;
  }
}

export const emailService = new EmailService();
