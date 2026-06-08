import { notFound } from 'next/navigation';

import { createAdminClient } from '@/lib/supabase/admin';

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

type Profile = {
  id: string;
  handle: string;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const supabase = createAdminClient();
  const { handle } = await params;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, handle')
    .eq('handle', handle)
    .maybeSingle<Profile>();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile) {
    notFound();
  }

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from('bookmarks')
    .select('id, title, url')
    .eq('user_id', profile.id)
    .eq('is_public', true)
    .order('created_at', { ascending: false });

  if (bookmarksError) {
    throw new Error(bookmarksError.message);
  }

  const publicBookmarkCount = bookmarks?.length ?? 0;

  return (
    <main className="min-h-screen bg-linear-to-b from-neutral-50 to-white px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto flex w-full max-w-lg flex-col gap-8">
        <section className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-black/8 bg-white text-2xl font-semibold uppercase text-black shadow-sm">
            {profile.handle.charAt(0)}
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-black/45">
            Public profile
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
            @{profile.handle}
          </h1>
          <p className="mt-3 text-sm leading-7 text-black/60 sm:text-base">
            {publicBookmarkCount === 0
              ? 'No public links shared yet.'
              : `${publicBookmarkCount} public ${publicBookmarkCount === 1 ? 'link' : 'links'}`}
          </p>
        </section>

        <section>
          {publicBookmarkCount === 0 ? (
            <div className="rounded-2xl border border-dashed border-black/12 bg-white px-6 py-10 text-center shadow-sm">
              <p className="text-base font-medium text-black">No public bookmarks yet</p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-black/60">
                When links are marked public, they will appear here.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3 sm:gap-4">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id}>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group block rounded-2xl border border-black/8 bg-white p-4 shadow-sm transition-all hover:border-black/15 hover:bg-black/2 hover:shadow-md sm:p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 text-left">
                        <h2 className="text-base font-medium leading-6 text-black transition-colors group-hover:text-black">
                          {bookmark.title}
                        </h2>
                        <p className="mt-1 truncate text-sm text-black/50">
                          {bookmark.url}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-black/8 bg-white text-sm text-black/45 transition-colors group-hover:border-black/15 group-hover:text-black"
                      >
                        →
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
