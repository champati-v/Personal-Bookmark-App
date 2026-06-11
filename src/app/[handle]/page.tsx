import { ArrowUpRight, BookMarked, Globe, Link2, Sparkles, Search } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { createAdminClient } from "@/lib/supabase/admin";
import { Profile } from "@/types";
import { PublicLinkCopyButton } from "@/components/public-link-copy-button";
import { SearchAndFilters } from "@/components/search-filters";
import Badge from "@/components/badge";

type PageProps = {
  params: Promise<{
    handle: string;
  }>;
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
};

export default async function PublicProfilePage({ params, searchParams }: PageProps) {
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

  const resolvedParams = await searchParams;
  const q = resolvedParams?.q;
  const category = resolvedParams?.category;
  const pageParam = resolvedParams?.page;

  const parsedPage = parseInt(pageParam || "1", 10);
  const currentPage = isNaN(parsedPage) ? 1 : Math.max(1, parsedPage);
  const limit = 10;
  const offset = (currentPage - 1) * limit;
  const from = offset;
  const to = offset + limit - 1;

  let bookmarksQuery = supabase
    .from("bookmarks")
    .select("id, title, url, category, is_public", { count: "exact" })
    .eq("user_id", profile.id)
    .eq("is_public", true);

  if (q) {
    bookmarksQuery = bookmarksQuery.or(`title.ilike.%${q}%,url.ilike.%${q}%`);
  }

  if (category && category !== "All") {
    bookmarksQuery = bookmarksQuery.eq("category", category);
  }

  const [
    { data: bookmarksData, error: bookmarksError, count: matchingCountResult },
    { data: allPublicBookmarks, error: allPublicError },
  ] = await Promise.all([
    bookmarksQuery
      .order("created_at", { ascending: false })
      .range(from, to),
    supabase
      .from("bookmarks")
      .select("id")
      .eq("user_id", profile.id)
      .eq("is_public", true),
  ]);

  if (bookmarksError) {
    throw new Error(bookmarksError.message);
  }

  if (allPublicError) {
    throw new Error(allPublicError.message);
  }

  const bookmarks = bookmarksData ?? [];
  const publicBookmarkCount = allPublicBookmarks?.length ?? 0;
  const isFiltered = !!(q || (category && category !== "All"));

  const matchingCount = matchingCountResult ?? 0;
  const totalPages = Math.max(1, Math.ceil(matchingCount / limit));

  const startRange = matchingCount === 0 ? 0 : offset + 1;
  const endRange = Math.min(offset + bookmarks.length, isFiltered ? matchingCount : publicBookmarkCount);

  const getPageLink = (pageNum: number) => {
    const params = new URLSearchParams();
    if (pageNum > 1) {
      params.set("page", pageNum.toString());
    }
    if (q) {
      params.set("q", q);
    }
    if (category && category !== "All") {
      params.set("category", category);
    }
    const queryString = params.toString();
    return queryString ? `/${handle}?${queryString}` : `/${handle}`;
  };

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
              {publicBookmarkCount > 0 && (
                <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                  {isFiltered
                    ? matchingCount === 0
                      ? "No matches found."
                      : `Showing ${startRange}-${endRange} of ${matchingCount} public ${matchingCount === 1 ? "resource" : "resources"} matching your filters.`
                    : `Showing ${startRange}-${endRange} of ${publicBookmarkCount} public ${publicBookmarkCount === 1 ? "link" : "links"} across this profile.`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <Link2 className="h-4 w-4 text-emerald-700" />
              Open any link in a new tab
            </div>
          </div>

          <SearchAndFilters key={`${q || ""}-${category || "All"}`} actionPath={`/${handle}`} />

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
          ) : bookmarks.length === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfc_100%)] px-6 py-14 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                <Search className="h-7 w-7" />
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-950">
                No matches found
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                We couldn&apos;t find any bookmarks matching your search or category filters. Try clearing your filters to see all bookmarks.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href={`/${handle}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 sm:w-auto"
                >
                  Clear filters
                </Link>
              </div>
            </div>
          ) : (
            <>
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

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-6">
                <div className="text-sm text-slate-500 text-center sm:text-left">
                  Page <span className="font-semibold text-slate-900">{currentPage}</span> of{" "}
                  <span className="font-semibold text-slate-900">{totalPages}</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  {currentPage > 1 ? (
                    <Link
                      href={getPageLink(currentPage - 1)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 sm:w-auto"
                    >
                      Previous
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-5 text-sm font-medium text-slate-400 cursor-not-allowed sm:w-auto"
                    >
                      Previous
                    </button>
                  )}

                  {currentPage < totalPages ? (
                    <Link
                      href={getPageLink(currentPage + 1)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 sm:w-auto"
                    >
                      Next
                    </Link>
                  ) : (
                    <button
                      disabled
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-5 text-sm font-medium text-slate-400 cursor-not-allowed sm:w-auto"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
