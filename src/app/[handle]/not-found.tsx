import { ArrowLeft, SearchX, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function HandleNotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_24%,#f7fbff_100%)] px-6 py-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(circle_at_top,#c8f2df_0,#effaf4_40%,transparent_74%)]" />
      <div className="absolute -right-32 top-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="absolute -left-32 bottom-16 -z-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="w-full max-w-2xl rounded-4xl border border-white/70 bg-white/82 p-8 text-center shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-10">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
          Profile not found
        </div>

        <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-slate-950 text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
          <SearchX className="h-9 w-9" />
        </div>

        <h1 className="mt-6 text-3xl font-semibold tracking-tighter text-slate-950 sm:text-4xl">
          This public profile does not exist.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          The handle may be invalid, unavailable, or the profile may have been
          removed. Try heading back home and starting from a valid bookmark profile.
        </p>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
