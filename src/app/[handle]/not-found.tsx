import Link from 'next/link';

export default function HandleNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
          Profile not found
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          This profile does not exist.
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/65">
          The handle may be invalid or the profile may have been removed.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
