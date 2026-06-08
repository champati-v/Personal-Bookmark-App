'use client';

import { useActionState } from 'react';

import type { BookmarkState } from '@/app/bookmark-actions';

type BookmarkAction = (
  state: BookmarkState,
  formData: FormData,
) => Promise<BookmarkState>;

type BookmarkFormProps = {
  action: BookmarkAction;
};

const initialState: BookmarkState = {};

export function BookmarkForm({ action }: BookmarkFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold tracking-tight text-black">
        Add bookmark
      </h2>

      <form action={formAction} className="mt-5 space-y-4">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-black">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
          />
        </div>

        <div>
          <label htmlFor="url" className="mb-2 block text-sm font-medium text-black">
            URL
          </label>
          <input
            id="url"
            name="url"
            required
            placeholder="https://example.com"
            className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
          />
        </div>

        <label className="flex items-center gap-3 text-sm font-medium text-black">
          <input
            name="is_public"
            type="checkbox"
            className="h-4 w-4 rounded border-black/20"
          />
          Public bookmark
        </label>

        {state.error ? <p className="text-sm text-red-600">{state.error}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? 'Saving...' : 'Save bookmark'}
        </button>
      </form>
    </section>
  );
}
