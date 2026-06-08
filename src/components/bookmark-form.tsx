'use client';

import { Globe, Link2, LockKeyhole, Tag } from 'lucide-react';
import { useActionState, useEffect } from 'react';

import type { BookmarkState, BookmarkValues } from '@/app/services/bookmark-actions';

type BookmarkAction = (
  state: BookmarkState,
  formData: FormData,
) => Promise<BookmarkState>;

type BookmarkFormProps = {
  action: BookmarkAction;
  onSuccess?: () => void;
  submitLabel: string;
  values?: Partial<BookmarkValues>;
};

const initialState: BookmarkState = {};

const inputClassName =
  'h-13 w-full rounded-2xl border border-slate-200 bg-white px-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100';

export function BookmarkForm({
  action,
  onSuccess,
  submitLabel,
  values,
}: BookmarkFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  useEffect(() => {
    if (state.success) {
      onSuccess?.();
    }
  }, [onSuccess, state.success]);

  return (
    <form action={formAction} className="space-y-5">
      {values?.bookmarkId ? (
        <input type="hidden" name="bookmark_id" value={values.bookmarkId} />
      ) : null}

      <div className="space-y-2.5">
        <label
          htmlFor="title"
          className="flex items-center gap-2 text-sm font-medium text-slate-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Tag className="h-4 w-4" />
          </span>
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          maxLength={200}
          defaultValue={values?.title ?? ''}
          className={inputClassName}
          placeholder="Weekly design inspiration"
        />
      </div>

      <div className="space-y-2.5">
        <label
          htmlFor="url"
          className="flex items-center gap-2 text-sm font-medium text-slate-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <Link2 className="h-4 w-4" />
          </span>
          URL
        </label>
        <input
          id="url"
          name="url"
          type="url"
          required
          placeholder="https://example.com"
          defaultValue={values?.url ?? ''}
          className={inputClassName}
        />
      </div>

      <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbfc_100%)] p-4 text-sm text-slate-700 transition hover:border-slate-300">
        <input
          name="is_public"
          type="checkbox"
          defaultChecked={values?.isPublic ?? false}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-200"
        />
        <span className="flex-1">
          <span className="flex items-center gap-2 font-medium text-slate-900">
            <Globe className="h-4 w-4 text-emerald-700" />
            Public bookmark
          </span>
          <span className="mt-1 block leading-6 text-slate-500">
            Turn this on to show the link on your public profile. Leave it off to
            keep the bookmark private.
          </span>
        </span>
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
      </label>

      {state.error ? (
        <p
          role="alert"
          className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
        >
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center rounded-full bg-emerald-950 px-5 text-sm font-medium text-white shadow-[0_14px_30px_rgba(6,78,59,0.22)] transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
