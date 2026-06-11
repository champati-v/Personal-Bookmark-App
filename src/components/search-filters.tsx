'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useTransition } from 'react';
import { Search } from 'lucide-react';
import { BOOKMARK_CATEGORIES } from '@/types/bookmark';

export function SearchAndFilters({ actionPath = '/dashboard' }: { actionPath?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get('q') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    
    const queryVal = search.trim();
    if (queryVal) {
      params.set('q', queryVal);
    }
    
    if (category && category !== 'All') {
      params.set('category', category);
    }

    startTransition(() => {
      router.push(`${actionPath}?${params.toString()}`);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search title or URL..."
          className="h-11 w-full rounded-full border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800/20"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      <div className="w-full sm:w-48 relative">
        <select
          className="h-11 w-full rounded-full border border-slate-200 bg-white pl-4 pr-10 text-sm text-slate-700 focus:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-800/20 cursor-pointer appearance-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {BOOKMARK_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-500">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m6 8 4 4 4-4" />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-950 px-6 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-900 focus:outline-none focus:ring-2 focus:ring-slate-950/20 disabled:opacity-50 cursor-pointer"
      >
        <Search className="h-4 w-4" />
        {isPending ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}
