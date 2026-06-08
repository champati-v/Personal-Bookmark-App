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

const inputClassName =
  'h-11 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-black outline-none transition placeholder:text-black/35 focus:border-black/25 focus:ring-2 focus:ring-black/5';

const submitButtonClassName =
  'inline-flex h-11 w-full items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-60';

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
    <main className="flex min-h-screen items-center justify-center bg-linear-to-b from-neutral-50 to-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Bookmark App
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-7 text-black/60 sm:text-base">
            {description}
          </p>

          <form action={formAction} className="mt-8 space-y-5">
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
                className={inputClassName}
                placeholder="you@example.com"
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
                autoComplete={
                  submitLabel === 'Sign up' ? 'new-password' : 'current-password'
                }
                required
                className={inputClassName}
                placeholder="Enter your password"
              />
            </div>

            {state.error ? (
              <p
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
              >
                {state.error}
              </p>
            ) : null}

            {state.message ? (
              <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                {state.message}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={pending}
              className={submitButtonClassName}
            >
              {pending ? 'Please wait...' : submitLabel}
            </button>
          </form>

          <p className="mt-8 border-t border-black/6 pt-6 text-center text-sm text-black/60">
            {switchText}{' '}
            <Link
              href={switchHref}
              className="font-medium text-black underline decoration-black/20 underline-offset-4 transition-colors hover:text-black/80"
            >
              {switchLabel}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
