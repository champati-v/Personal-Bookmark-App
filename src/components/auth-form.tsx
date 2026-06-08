'use client';

import { ArrowRight, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
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
  'h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100';

const submitButtonClassName =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-950 px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60';

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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_26%,#f7fbff_100%)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(circle_at_top,#c8f2df_0,#effaf4_40%,transparent_74%)]" />
      <div className="absolute -right-32 top-20 -z-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="absolute -left-32 bottom-20 -z-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Secure bookmark workspace
          </div>

          <h1 className="mt-6 text-4xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-5xl lg:text-6xl">
            Keep your best links <span className="text-emerald-800">organized and ready</span>.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            Sign in to manage private research, publish curated resources, and keep
            your bookmark library feeling intentional.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950">Private by default</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep personal research hidden until you choose to share it.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                <Mail className="h-5 w-5" />
              </div>
              <p className="mt-4 text-sm font-semibold text-slate-950">Simple access</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Use your email and password to get back to your saved workspace fast.
              </p>
            </div>
          </div>
        </section>

        <section className="w-full max-w-xl justify-self-end">
          <div className="rounded-4xl border border-white/70 bg-white/82 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.1)] backdrop-blur sm:p-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-600">
              <LockKeyhole className="h-3.5 w-3.5" />
              Account access
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              {description}
            </p>

            <form action={formAction} className="mt-8 space-y-5">
              <div className="space-y-2.5">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-slate-800"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <Mail className="h-4 w-4" />
                  </span>
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

              <div className="space-y-2.5">
                <label
                  htmlFor="password"
                  className="flex items-center gap-2 text-sm font-medium text-slate-800"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <LockKeyhole className="h-4 w-4" />
                  </span>
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
                  className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                >
                  {state.error}
                </p>
              ) : null}

              {state.message ? (
                <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-700">
                  {state.message}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={pending}
                className={submitButtonClassName}
              >
                {pending ? 'Please wait...' : submitLabel}
                {!pending ? <ArrowRight className="h-4 w-4" /> : null}
              </button>
            </form>

            <p className="mt-8 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">
              {switchText}{' '}
              <Link
                href={switchHref}
                className="font-medium text-slate-950 underline decoration-slate-300 underline-offset-4 transition-colors hover:text-emerald-800"
              >
                {switchLabel}
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
