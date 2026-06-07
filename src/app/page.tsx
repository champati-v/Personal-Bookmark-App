import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
          Bookmark App
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          Save and organize bookmarks.
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/65">
          Sign in to continue or create an account to get started.
        </p>
        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium text-black"
          >
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
