import {
  ArrowUpRight,
  BookMarked,
  Globe,
  LockKeyhole,
  LogOut,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/services/auth-actions";
import { BookmarkDeleteButton } from "@/components/bookmark-delete-button";
import { BookmarkDialog } from "@/components/bookmark-dialog";
import { PublicLinkCopyButton } from "@/components/public-link-copy-button";
import { createClient } from "@/lib/supabase/server";
import { Bookmark } from "@/types";
import Badge from "@/components/badge";

const primaryButtonClassName =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-emerald-950 px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 sm:w-auto";

const secondaryButtonClassName =
  "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/90 px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 sm:w-auto";

const cardActionButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950";

const cardDeleteButtonClassName =
  "inline-flex h-10 items-center justify-center gap-1 rounded-full border border-red-200 bg-white px-4 text-sm font-medium text-red-600 transition hover:bg-red-50";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const [{ data, error }, { data: profile }] = await Promise.all([
    supabase
      .from("bookmarks")
      .select("id, title, url, is_public, category")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false }),
    supabase.from("profiles").select("handle").eq("id", user.id).maybeSingle(),
  ]);

  if (error) {
    throw new Error(error.message);
  }

  const bookmarks = (data ?? []) as Bookmark[];
  const handle = profile?.handle ?? "user";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  const publicProfileUrl = appUrl ? `${appUrl}/${handle}` : `/${handle}`;
  const totalCount = bookmarks.length;
  const publicCount = bookmarks.filter((bookmark) => bookmark.is_public).length;
  const privateCount = totalCount - publicCount;

  const stats = [
    {
      label: "Saved links",
      value: totalCount,
      description: "Everything in your workspace.",
      icon: BookMarked,
      iconClassName: "bg-slate-950 text-white",
    },
    {
      label: "Public links",
      value: publicCount,
      description: "Visible on your shared profile.",
      icon: Globe,
      iconClassName: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
    },
    {
      label: "Private links",
      value: privateCount,
      description: "Hidden from your public page.",
      icon: LockKeyhole,
      iconClassName: "bg-sky-50 text-sky-700 ring-1 ring-sky-100",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_24%,#f7fbff_100%)] px-4 py-8 sm:px-6 sm:py-10">
      <div className="absolute inset-x-0 top-0 -z-10 h-112 bg-[radial-gradient(circle_at_top,#c8f2df_0,#effaf4_40%,transparent_74%)]" />
      <div className="absolute -right-32 top-24 -z-10 h-72 w-72 rounded-full bg-emerald-200/35 blur-3xl" />
      <div className="absolute -right-32 top-128 -z-10 h-72 w-72 rounded-full bg-sky-200/35 blur-3xl" />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="rounded-4xl border border-white/70 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-900 shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Workspace overview
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tighter text-slate-950 sm:text-4xl md:text-5xl">
                Welcome back,{" "}
                <span className="text-emerald-800">@{handle}</span>
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                Manage your saved resources, keep sensitive research private,
                and maintain a polished public profile without the usual
                dashboard clutter.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookmarkDialog
                  triggerLabel="Add Bookmark"
                  title="Add bookmark"
                  description="Save a bookmark to your dashboard."
                  triggerClassName={primaryButtonClassName}
                />
                <PublicLinkCopyButton profileUrl={publicProfileUrl} type="public_profile" />
                <form action={logoutAction} className="w-full sm:w-auto">
                  <button type="submit" className={secondaryButtonClassName}>
                    <LogOut className="h-4 w-4" />
                    Log out
                  </button>
                </form>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:w-104 lg:grid-cols-1">
              <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_40px_rgba(15,23,42,0.16)]">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/70">
                    Profile visibility
                  </p>
                  <Globe className="h-4 w-4 text-emerald-300" />
                </div>
                <p className="mt-5 text-3xl font-semibold tracking-tight">
                  {publicCount}
                </p>
                <p className="mt-2 text-sm leading-6 text-white/70">
                  public {publicCount === 1 ? "bookmark" : "bookmarks"} ready
                  for sharing
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Workspace health
                    </p>
                    <p className="text-xs text-slate-500">
                      Your library at a glance
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {totalCount === 0
                    ? "Your dashboard is ready for its first saved resource."
                    : `You have ${totalCount} saved ${totalCount === 1 ? "link" : "links"} with ${privateCount} kept private.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols">
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <article
                  key={stat.label}
                  className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {stat.label}
                      </p>
                      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                        {stat.value}
                      </p>
                    </div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconClassName}`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {stat.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-4xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
                Bookmark library
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl">
                Your saved resources
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                {totalCount === 0
                  ? "Start building your link collection."
                  : `${totalCount} saved ${totalCount === 1 ? "link" : "links"} across your private and public workspace.`}
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
              <BookMarked className="h-4 w-4 text-emerald-700" />
              Organized for fast access
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <div className="mt-8 rounded-[1.75rem] border border-dashed border-slate-300 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfc_100%)] px-6 py-14 text-center sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                <Plus className="h-7 w-7" />
              </div>
              <p className="mt-6 text-lg font-semibold text-slate-950">
                No bookmarks yet
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-slate-500">
                Add your first link to get started and choose whether it appears
                on your public profile.
              </p>
              <div className="mt-8 flex justify-center">
                <BookmarkDialog
                  triggerLabel="Add Bookmark"
                  title="Add bookmark"
                  description="Save a bookmark to your dashboard."
                  triggerClassName={primaryButtonClassName}
                />
              </div>
            </div>
          ) : (
            <ul className="mt-8 grid grid-cols-1 gap-4">
              {bookmarks.map((bookmark) => (
                <li
                  key={bookmark.id}
                  className="group rounded-3xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#fbfdff_100%)] p-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_18px_35px_rgba(15,23,42,0.08)]"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          {bookmark.is_public ? (
                            <Globe className="h-5 w-5" />
                          ) : (
                            <LockKeyhole className="h-5 w-5" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold leading-6 text-slate-950 sm:text-lg">
                            {bookmark.title}
                          </h3>
                          <div className="mt-2 flex items-center gap-2">
                            <Badge bookmark={bookmark} type="visibility" />
                            <Badge bookmark={bookmark} type="category" />
                          </div>
                        </div>
                      </div>

                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex max-w-full items-center gap-2 break-all text-sm leading-6 text-slate-500 transition hover:text-slate-950"
                      >
                        <ArrowUpRight className="h-4 w-4 shrink-0" />
                        <span className="truncate sm:max-w-xl">
                          {bookmark.url}
                        </span>
                      </a>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4 lg:border-t-0 lg:pt-0">
                      <BookmarkDialog
                        triggerLabel="Edit"
                        title="Edit bookmark"
                        description="Update the title, URL, or visibility."
                        values={{
                          bookmarkId: bookmark.id,
                          title: bookmark.title,
                          url: bookmark.url,
                          isPublic: bookmark.is_public,
                          category: bookmark.category,
                        }}
                        mode="edit"
                        triggerClassName={cardActionButtonClassName}
                      />
                      <BookmarkDeleteButton
                        bookmarkId={bookmark.id}
                        triggerClassName={cardDeleteButtonClassName}
                      />
                    </div>
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
