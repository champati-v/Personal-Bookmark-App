import 'server-only';

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
import { getAppUrl, getResendFromAddress } from '@/lib/mail';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

type WelcomeEmailInput = {
  to: string;
  username: string;
};

export async function sendWelcomeEmail({ to, username }: WelcomeEmailInput) {
  if (!resend) {
    return {
      ok: false,
      error: 'Missing RESEND_API_KEY',
    };
  }

  const loginUrl = `${getAppUrl()}/login`;
  const from = getResendFromAddress();

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject: 'Welcome to Bookmark Manager',
      react: EmailTemplate({ username, loginUrl }),
    });

    if (error) {
      return {
        ok: false,
        error: error.message,
      };
    }

    return { ok: true, data };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      ok: false,
      error: message,
    };
  }
}
