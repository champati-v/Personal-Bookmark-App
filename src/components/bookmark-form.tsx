'use client';

import { useActionState, useEffect } from 'react';

import type { BookmarkState, BookmarkValues } from '@/app/bookmark-actions';

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
    <form action={formAction} className="space-y-4">
      {values?.bookmarkId ? (
        <input type="hidden" name="bookmark_id" value={values.bookmarkId} />
      ) : null}

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
          defaultValue={values?.title ?? ''}
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
          type="url"
          required
          placeholder="https://example.com"
          defaultValue={values?.url ?? ''}
          className="h-11 w-full rounded-xl border border-black/10 px-4 text-sm text-black outline-none transition placeholder:text-black/30 focus:border-black/30"
        />
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-black">
        <input
          name="is_public"
          type="checkbox"
          defaultChecked={values?.isPublic ?? false}
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
        {pending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}
