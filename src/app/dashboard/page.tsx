import { redirect } from 'next/navigation';

import { logoutAction } from '@/app/services/auth-actions';
import { BookmarkDialog } from '@/components/bookmark-dialog';
import { BookmarkDeleteButton } from '@/components/bookmark-delete-button';
import { createClient } from '@/lib/supabase/server';

type Bookmark = {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
};

const primaryButtonClassName =
  'inline-flex h-11 w-full items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white transition-colors hover:bg-black/90 sm:w-auto';

const secondaryButtonClassName =
  'inline-flex h-11 w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 text-sm font-medium text-black transition-colors hover:bg-black/5 sm:w-auto';

const cardActionButtonClassName =
  'inline-flex h-9 items-center justify-center rounded-lg border border-black/10 bg-white px-3 text-sm font-medium text-black transition-colors hover:bg-black/5';

const cardDeleteButtonClassName =
  'inline-flex h-9 items-center justify-center rounded-lg border border-red-200 bg-white px-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const [{ data, error }, { data: profile }] = await Promise.all([
    supabase
      .from('bookmarks')
      .select('id, title, url, is_public')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false }),
    supabase.from('profiles').select('handle').eq('id', user.id).maybeSingle(),
  ]);

  if (error) {
    throw new Error(error.message);
  }

  const bookmarks = (data ?? []) as Bookmark[];
  const handle = profile?.handle ?? 'user';
  const totalCount = bookmarks.length;
  const publicCount = bookmarks.filter((bookmark) => bookmark.is_public).length;
  const privateCount = totalCount - publicCount;

  const stats = [
    {
      label: 'Total bookmarks',
      value: totalCount,
      accent: 'border-l-black/20',
    },
    {
      label: 'Public bookmarks',
      value: publicCount,
      accent: 'border-l-emerald-400',
    },
    {
      label: 'Private bookmarks',
      value: privateCount,
      accent: 'border-l-slate-300',
    },
  ];

  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-50 to-white px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 sm:gap-10">
        <section className="rounded-2xl border border-black/8 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
                Welcome back
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
                @{handle}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-black/60 sm:text-base">
                Manage your bookmarks and control what&apos;s visible on your public
                profile.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:shrink-0">
              <BookmarkDialog
                triggerLabel="Add Bookmark"
                title="Add bookmark"
                description="Save a bookmark to your dashboard."
                triggerClassName={primaryButtonClassName}
              />
              <form action={logoutAction} className="w-full sm:w-auto">
                <button type="submit" className={secondaryButtonClassName}>
                  Log out
                </button>
              </form>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-black/8 border-l-4 bg-white p-5 shadow-sm ${stat.accent}`}
            >
              <p className="text-sm font-medium text-black/50">{stat.label}</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-black">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-black sm:text-2xl">
                Your bookmarks
              </h2>
              <p className="mt-1 text-sm text-black/55">
                {totalCount === 0
                  ? 'Start building your link collection.'
                  : `${totalCount} saved ${totalCount === 1 ? 'link' : 'links'}`}
              </p>
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
              <p className="text-base font-medium text-black">No bookmarks yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-black/60">
                Add your first link to get started and choose whether it appears on
                your public profile.
              </p>
              <div className="mt-6 flex justify-center">
                <BookmarkDialog
                  triggerLabel="Add Bookmark"
                  title="Add bookmark"
                  description="Save a bookmark to your dashboard."
                  triggerClassName={primaryButtonClassName}
                />
              </div>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {bookmarks.map((bookmark) => (
                <li
                  key={bookmark.id}
                  className="group flex flex-col rounded-2xl border border-black/8 bg-white p-5 shadow-sm transition-all hover:border-black/15 hover:shadow-md"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-base font-medium leading-6 text-black">
                        {bookmark.title}
                      </h3>
                      <span
                        className={`inline-flex h-7 shrink-0 items-center rounded-full px-3 text-xs font-medium ${
                          bookmark.is_public
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-black/5 text-black/65'
                        }`}
                      >
                        {bookmark.is_public ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <a
                      href={bookmark.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 block break-all text-sm leading-6 text-black/55 transition-colors hover:text-black"
                    >
                      {bookmark.url}
                    </a>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-black/6 pt-4">
                    <BookmarkDialog
                      triggerLabel="Edit"
                      title="Edit bookmark"
                      description="Update the title, URL, or visibility."
                      values={{
                        bookmarkId: bookmark.id,
                        title: bookmark.title,
                        url: bookmark.url,
                        isPublic: bookmark.is_public,
                      }}
                      mode="edit"
                      triggerClassName={cardActionButtonClassName}
                    />
                    <BookmarkDeleteButton
                      bookmarkId={bookmark.id}
                      triggerClassName={cardDeleteButtonClassName}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
