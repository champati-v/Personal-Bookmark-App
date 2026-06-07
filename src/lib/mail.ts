import 'server-only';

export function getAppUrl() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  if (appUrl) {
    return appUrl.replace(/\/$/, '');
  }

  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, '')}`;
  }

  return 'http://localhost:3000';
}

export function getResendFromAddress() {
  return process.env.RESEND_FROM_EMAIL ?? 'Bookmark Manager <hello@contact.vibek.space>';
}
