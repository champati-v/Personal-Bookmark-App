'use client';

import Link from 'next/link';
import { useActionState, useState } from 'react';
import type { AuthState } from '@/app/auth-actions';
import { normalizeUsername, validateUsername } from '@/lib/username';

type AuthAction = (
  state: AuthState,
  formData: FormData,
) => Promise<AuthState>;

type SignupFormProps = {
  action: AuthAction;
  title: string;
  description: string;
  submitLabel: string;
  switchText: string;
  switchHref: string;
  switchLabel: string;
};

const initialState: AuthState = {};

type UsernameStatus = 'idle' | 'checking' | 'available' | 'unavailable';

export function SignupForm({
  action,
  title,
  description,
  submitLabel,
  switchText,
  switchHref,
  switchLabel,
}: SignupFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<UsernameStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusError, setStatusError] = useState('');

  const validationError = validateUsername(normalizeUsername(username));
  const submitDisabled =
    pending || status === 'checking' || status === 'unavailable' || Boolean(validationError);

  async function checkUsernameAvailability() {
    const normalized = normalizeUsername(username);

    setUsername(normalized);
    setStatusError('');
    setStatusMessage('');

    if (!normalized) {
      setStatus('idle');
      return;
    }

    if (validationError) {
      setStatus('unavailable');
      setStatusError(validationError);
      return;
    }

    setStatus('checking');

    const response = await fetch(
      `/api/username-availability?username=${encodeURIComponent(normalized)}`,
      {
        method: 'GET',
        cache: 'no-store',
      },
    );

    const data: { available: boolean; message?: string } = await response.json();

    if (!response.ok) {
      setStatus('unavailable');
      setStatusError(data.message ?? 'Unable to verify username availability.');
      return;
    }

    if (data.available) {
      setStatus('available');
      setStatusMessage(data.message ?? 'Username is available.');
      return;
    }

    setStatus('unavailable');
    setStatusError(data.message ?? 'Username is already taken.');
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
          Bookmark App
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          {title}
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/65">{description}</p>

        <form action={formAction} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-black"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(event) => {
                setUsername(normalizeUsername(event.target.value));
                setStatus('idle');
                setStatusError('');
                setStatusMessage('');
              }}
              onBlur={checkUsernameAvailability}
              autoComplete="off"
              required
              minLength={3}
              maxLength={15}
              className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
              placeholder="your_handle"
            />
            {statusError ? (
              <p className="mt-2 text-sm text-red-600">{statusError}</p>
            ) : null}
            {statusMessage ? (
              <p className="mt-2 text-sm text-emerald-600">{statusMessage}</p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
            />
          </div>

          {state.error ? (
            <p className="text-sm text-red-600">{state.error}</p>
          ) : null}

          {state.message ? (
            <p className="text-sm text-emerald-600">{state.message}</p>
          ) : null}

          <button
            type="submit"
            disabled={submitDisabled}
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? 'Please wait...' : submitLabel}
          </button>
        </form>

        <p className="mt-6 text-sm text-black/65">
          {switchText}{' '}
          <Link href={switchHref} className="font-medium text-black">
            {switchLabel}
          </Link>
        </p>
      </div>
    </main>
  );
}
