import { NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/resend/welcome-email';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body: { to?: string; username?: string } = await request.json();
    const to = body.to?.trim();
    const username = body.username?.trim().toLowerCase();

    if (!to || !username) {
      return NextResponse.json(
        { ok: false, error: 'Email and username are required.' },
        { status: 400 },
      );
    }

    const result = await sendWelcomeEmail({ to, username });

    if (!result.ok) {
      return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}