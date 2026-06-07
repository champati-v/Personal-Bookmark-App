import { logoutAction } from '@/app/auth-actions';

export default function DashboardPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
          Dashboard
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
          Authentication complete.
        </h1>
        <p className="mt-3 text-sm leading-6 text-black/65">
          Bookmark features will live here.
        </p>
        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium text-black"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}