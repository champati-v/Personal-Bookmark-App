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

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-black/10 bg-white p-8 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-black/50">
            Public profile
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black">
            @{profile.handle}
          </h1>

          {bookmarks.length === 0 ? (
            <div className="mt-8 rounded-xl border border-dashed border-black/10 bg-black/2 p-8 text-center">
              <p className="text-sm font-medium text-black">
                No public bookmarks yet.
              </p>
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-black/10 overflow-hidden rounded-xl border border-black/10">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id} className="bg-white p-5">
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
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}