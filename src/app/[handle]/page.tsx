import { ArrowUpRight, BookMarked, Globe, Link2, Sparkles } from "lucide-react";
import { notFound } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";
import { Profile } from "@/types";
import { PublicLinkCopyButton } from "@/components/public-link-copy-button";
import Badge from "@/components/badge";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const supabase = createAdminClient();
  const { handle } = await params;

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, handle")
    .eq("handle", handle)
    .maybeSingle<Profile>();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile) {
    notFound();
  }

  const { data: bookmarks, error: bookmarksError } = await supabase
    .from("bookmarks")
    .select("id, title, url, category, is_public")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  if (bookmarksError) {
    throw new Error(bookmarksError.message);
  }

  const publicBookmarkCount = bookmarks?.length ?? 0;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_24%,#f7fbff_100%)] px-4 py-10 sm:px-6 sm:py-14">
      <div className="absolute inset-x-0 top-0 -z-10 h-120 bg-[radial-gradient(circle_at_top,#c8f2df_0,#effaf4_40%,transparent_74%)]" />
      <div className="absolute -right-32 top-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="absolute -left-32 top-104 -z-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <section className="rounded-4xl border border-white/70 bg-white/82 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Public profile
              </div>

              <div className="mt-6 flex items-start gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.75rem] bg-slate-950 text-2xl font-semibold uppercase text-white shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
                  {profile.handle.charAt(0)}
                </div>

                <div>
                  <h1 className="text-3xl font-semibold tracking-tighter text-slate-950 sm:text-4xl md:text-5xl">
                    @{profile.handle}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    {publicBookmarkCount === 0
                      ? "No public links shared yet."
                      : `${publicBookmarkCount} public ${publicBookmarkCount === 1 ? "link" : "links"} curated and ready to explore.`}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:w-88 lg:grid-cols-1">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/70">
                    Shared resources
                  </p>
                  <Globe className="h-4 w-4 text-emerald-300" />
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {publicBookmarkCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  visible bookmarks on this public page
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <BookMarked className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Curated list
                    </p>
                    <p className="text-xs text-slate-500">
                      Clean public browsing
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  A simple profile for browsing selected links without the noise
                  of a full dashboard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-slate-200/80 bg-white/82 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Shared links
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Public bookmark collection
              </h2>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <Link2 className="h-4 w-4 text-emerald-700" />
              Open any link in a new tab
            </div>
          </div>

          {publicBookmarkCount === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfc_100%)] px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <Globe className="h-7 w-7" />
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-950">
                No public bookmarks yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-7 text-slate-500">
                When links are marked public, they will appear here.
              </p>
            </div>
          ) : (
            <ul className="mt-8 flex flex-col gap-4">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.id}>
                  <span className="group block rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)] sm:p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div className="min-w-0 text-left">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                            <Link2 className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <h2 className="flex items-center gap-2 text-base font-semibold leading-6 text-slate-950 sm:text-lg">
                              {bookmark.title}
                              <Badge bookmark={bookmark} type="category" />
                            </h2>
                            <a
                              href={bookmark.url}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-1 truncate text-sm text-slate-500 hover:underline"
                            >
                              {bookmark.url}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <PublicLinkCopyButton profileUrl={bookmark.url} type="url" />
                        <a href={bookmark.url} target="_blank" rel="noreferrer">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition group-hover:border-slate-300 group-hover:text-slate-950"
                          >
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}
