'use client';

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  deleteBookmarkAction,
  type BookmarkState,
} from '@/app/services/bookmark-actions';

type BookmarkDeleteButtonProps = {
  bookmarkId: string;
  triggerClassName?: string;
};

const initialState: BookmarkState = {};

export function BookmarkDeleteButton({
  bookmarkId,
  triggerClassName,
}: BookmarkDeleteButtonProps) {
  const router = useRouter();
  const [state, formAction] = useActionState(deleteBookmarkAction, initialState);

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  return (
    <form
      action={formAction}
      onSubmit={(event) => {
        if (!window.confirm('Delete this bookmark?')) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="bookmark_id" value={bookmarkId} />
      <button
        type="submit"
        className={
          triggerClassName ??
          'inline-flex h-9 items-center justify-center rounded-full border border-red-200 px-3 text-sm font-medium text-red-600 hover:bg-red-50'
        }
      >
        Delete
      </button>
    </form>
  );
}
