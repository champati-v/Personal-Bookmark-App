import { NextResponse } from 'next/server';
import {
  normalizeUsername,
  validateUsername,
} from '@/lib/username';
import { isUsernameAvailable } from '@/lib/supabase/username';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = normalizeUsername(searchParams.get('username') ?? '');
  const validationError = validateUsername(username);

  if (validationError) {
    return NextResponse.json(
      { available: false, message: validationError },
      { status: 400 },
    );
  }

  try {
    const available = await isUsernameAvailable(username);

    return NextResponse.json({
      available,
      message: available
        ? 'Username is available.'
        : 'Username is already taken.',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { available: false, message },
      { status: 500 },
    );
  }
}
