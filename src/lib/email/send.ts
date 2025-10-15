import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

export interface SendEmailResult {
  success: boolean;
  error?: string;
  messageId?: string;
}

export async function sendEmail(options: SendEmailOptions): Promise<SendEmailResult> {
  try {
    // Validate required environment variables
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'RESEND_API_KEY is not configured'
      };
    }

    // Validate required fields
    if (!options.to || !options.subject || !options.html) {
      return {
        success: false,
        error: 'Missing required fields: to, subject, or html'
      };
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: options.from || 'CryptoTax <noreply@cryptotax.app>',
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    if (error) {
      console.error('Resend email error:', error);
      return {
        success: false,
        error: error.message || 'Failed to send email'
      };
    }

    return {
      success: true,
      messageId: data?.id
    };
  } catch (error: any) {
    console.error('Email sending error:', error);
    return {
      success: false,
      error: error?.message || 'Unknown error occurred while sending email'
    };
  }
}

// Convenience function for sending transactional emails
export async function sendTransactionalEmail(
  to: string,
  template: { subject: string; html: string; text?: string }
): Promise<SendEmailResult> {
  return sendEmail({
    to,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}

// Rate limiting for email sending (basic implementation)
const emailRateLimit = new Map<string, { count: number; resetTime: number }>();

export function checkEmailRateLimit(email: string, limit: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now();
  const key = email.toLowerCase();
  const current = emailRateLimit.get(key);

  if (!current || now > current.resetTime) {
    emailRateLimit.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (current.count >= limit) {
    return false;
  }

  current.count++;
  return true;
}

export async function sendEmailWithRateLimit(
  options: SendEmailOptions,
  limit: number = 5,
  windowMs: number = 60000
): Promise<SendEmailResult> {
  const email = Array.isArray(options.to) ? options.to[0] : options.to;
  
  if (!checkEmailRateLimit(email, limit, windowMs)) {
    return {
      success: false,
      error: 'Email rate limit exceeded. Please try again later.'
    };
  }

  return sendEmail(options);
}
