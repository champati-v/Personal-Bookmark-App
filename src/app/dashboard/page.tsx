import { redirect } from 'next/navigation';

import { createBookmarkAction } from '@/app/bookmark-actions';
import { logoutAction } from '@/app/auth-actions';
import { BookmarkForm } from '@/components/bookmark-form';
import { createClient } from '@/lib/supabase/server';

type Bookmark = {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .select('id, title, url, is_public')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const bookmarks = (data ?? []) as Bookmark[];

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
                Dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
                Your bookmarks
              </h1>
            </div>
            <form action={logoutAction}>
              <button
                type="submit"
                className="inline-flex h-11 items-center justify-center rounded-full border border-black/10 px-4 text-sm font-medium text-black"
              >
                Log out
              </button>
            </form>
          </div>

          <div className="mt-8">
            <BookmarkForm action={createBookmarkAction} />
          </div>

          {bookmarks.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-black/10 bg-black/2 p-8 text-center">
              <p className="text-sm font-medium text-black">No bookmarks yet.</p>
              <p className="mt-2 text-sm leading-6 text-black/65">
                Add your first bookmark to see it here.
              </p>
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id} className="bg-white p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h2 className="text-base font-medium text-black">
                        {bookmark.title}
                      </h2>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 block break-all text-sm text-black/65 hover:text-black"
                      >
                        {bookmark.url}
                      </a>
                    </div>
                    <span
                      className={`inline-flex h-7 items-center rounded-full px-3 text-xs font-medium ${
                        bookmark.is_public
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-black/5 text-black/65'
                      }`}
                    >
                      {bookmark.is_public ? 'Public' : 'Private'}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}