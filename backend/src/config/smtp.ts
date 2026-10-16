import { decryptSecret } from '../utils/crypto.js';

export interface SmtpConfig {
  host: string;
  port: number;
  useSsl: boolean;
  username: string;
  password: string;
  fromEmail: string;
  fromName: string;
  timeoutSeconds: number;
}

export function getSmtpConfig(): SmtpConfig | null {
  const encryptionKey = process.env.EMAIL_ENCRYPTION_KEY;
  const usernameEnc = process.env.SMTP_USERNAME_ENC;
  const appPasswordEnc = process.env.SMTP_APP_PASSWORD_ENC || process.env.SMTP_PASSWORD_ENC;

  if (!encryptionKey || !usernameEnc || !appPasswordEnc) {
    return null;
  }

  try {
    const username = decryptSecret(usernameEnc, encryptionKey);
    const smtpPassword = decryptSecret(appPasswordEnc, encryptionKey);

    return {
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465,
      useSsl: process.env.SMTP_USE_SSL !== 'false',
      username,
      password: smtpPassword,
      fromEmail: process.env.SMTP_FROM_EMAIL || username,
      fromName: process.env.SMTP_FROM_NAME || 'Novarch Support',
      timeoutSeconds: process.env.SMTP_TIMEOUT_SECONDS
        ? parseInt(process.env.SMTP_TIMEOUT_SECONDS, 10)
        : 30,
    };
  } catch (err) {
    console.error('[SMTP]: Failed to decrypt email credentials.', err);
    return null;
  }
}
