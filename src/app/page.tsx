import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  FolderKanban,
  Globe,
  Layers3,
  LockKeyhole,
  Sparkles,
  Star,
} from "lucide-react";

const featureCards = [
  {
    icon: BookMarked,
    title: "Capture in seconds",
    description:
      "Save articles, docs, videos, and reference links before they disappear into open tabs.",
  },
  {
    icon: LockKeyhole,
    title: "Private by default",
    description:
      "Separate personal research from public resources with simple visibility controls that stay out of your way.",
  },
  {
    icon: Globe,
    title: "Share curated pages",
    description:
      "Turn selected collections into a polished public profile that is ready to send to clients, teams, or communities.",
  },
];

const stats = [
  { value: "10k+", label: "curated collections created" },
  { value: "3x", label: "faster link retrieval for teams" },
  { value: "24/7", label: "access to your research library" },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[linear-gradient(180deg,#f7faf7_0%,#ffffff_24%,#f7fbff_100%)] text-slate-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-136 bg-[radial-gradient(circle_at_top,#c8f2df_0,#effaf4_38%,transparent_72%)]" />
      <div className="absolute -right-40 top-24 -z-10 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute -left-32 top-128 -z-10 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />

      <section className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 pb-16 pt-8 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-950 text-white shadow-lg shadow-emerald-950/20">
              <BookMarked className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight">Bookmark App</p>
              <p className="text-xs text-slate-500">Clean link management for modern teams</p>
            </div>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950"
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="inline-flex h-11 items-center justify-center rounded-full bg-emerald-950 px-5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(6,78,59,0.25)] transition hover:bg-emerald-900"
            >
              Get Started
            </Link>
          </div>
        </div>

        <div className="grid flex-1 items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-900 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              Trusted by focused creators and operators
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-slate-950 sm:text-6xl lg:text-7xl">
              All your links, <span className="text-emerald-800">organized like a product</span>.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              A modern bookmark workspace for saving, structuring, and sharing
              resources without the clutter of generic bookmarking tools.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-emerald-950 px-7 text-base font-medium text-white shadow-[0_18px_40px_rgba(6,78,59,0.28)] transition hover:bg-emerald-900"
              >
                Start for free
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/login"
                className="inline-flex h-14 items-center justify-center rounded-full border border-slate-200 bg-white/85 px-7 text-base font-medium text-slate-700 shadow-sm backdrop-blur transition hover:border-slate-300 hover:text-slate-950"
              >
                Explore your dashboard
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/80 bg-white/75 p-5 shadow-[0_10px_25px_rgba(15,23,42,0.05)] backdrop-blur"
                >
                  <p className="text-2xl font-semibold tracking-tight text-slate-950">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-8 hidden rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.08)] backdrop-blur lg:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Weekly curation</p>
                  <p className="text-xs text-slate-500">Save first, organize later</p>
                </div>
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(247,250,252,0.98)_100%)] p-5 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
              <div className="rounded-3xl border border-slate-200 bg-slate-950 p-1.5">
                <div className="rounded-[1.2rem] bg-white p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Product Design Vault</p>
                      <p className="text-sm text-slate-500">34 links across 4 collections</p>
                    </div>
                    <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                      Public profile on
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            UX research methods for early-stage teams
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            Private collection, tagged for onboarding and discovery
                          </p>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600">
                          Research
                        </span>
                      </div>
                    </div>

                    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            SaaS landing page inspiration library
                          </p>
                          <p className="mt-1 text-sm text-slate-500">
                            Shared publicly, perfect for clients and content teams
                          </p>
                        </div>
                        <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-emerald-700">
                          Featured
                        </span>
                      </div>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
                            <Layers3 className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Smart collections</p>
                            <p className="text-xs text-slate-500">Topic-first organization</p>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-2xl border border-slate-200 p-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                            <FolderKanban className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">Project hubs</p>
                            <p className="text-xs text-slate-500">Everything in one place</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-24 sm:px-8 lg:px-10">
        <div className="rounded-4xl border border-slate-200/70 bg-white/80 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-800">
              Simplicity by design
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
              Minimal enough for personal use, polished enough for public sharing.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
              The experience is built around clarity. Save what matters, structure it
              quickly, and present it beautifully when it is time to share.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featureCards.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="group rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfc_100%)] p-7 shadow-[0_12px_30px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(15,23,42,0.1)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
                  {title}
                </h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16 sm:px-8 lg:px-10">
        <div className="rounded-[2.25rem] bg-slate-950 px-8 py-12 text-white shadow-[0_25px_80px_rgba(15,23,42,0.18)] md:px-12 md:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-300">
                Start organizing smarter
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Give your bookmarks a home that feels as intentional as the work you do.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex h-13 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
              >
                Create your account
              </Link>
              <Link
                href="/login"
                className="inline-flex h-13 items-center justify-center rounded-full border border-white/20 px-6 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Log into workspace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}