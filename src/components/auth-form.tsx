'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import type { AuthState } from '@/app/services/auth-actions';

type AuthAction = (
  state: AuthState,
  formData: FormData,
) => Promise<AuthState>;

type AuthFormProps = {
  action: AuthAction;
  title: string;
  description: string;
  submitLabel: string;
  switchText: string;
  switchHref: string;
  switchLabel: string;
};

const initialState: AuthState = {};

export function AuthForm({
  action,
  title,
  description,
  submitLabel,
  switchText,
  switchHref,
  switchLabel,
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

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
              className="h-11 w-full rounded-xl border text-black border-black/10 px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-black font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                submitLabel === 'Sign up' ? 'new-password' : 'current-password'
              }
              required
              className="h-11 w-full rounded-xl border text-black border-black/10 px-4 text-sm outline-none transition placeholder:text-black/30 focus:border-black/30"
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
            disabled={pending}
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
