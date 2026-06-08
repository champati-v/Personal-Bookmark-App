'use client';

import { AlertTriangle, Trash2, X } from 'lucide-react';
import { useActionState, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
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
  const [state, formAction, pending] = useActionState(deleteBookmarkAction, initialState);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (state.success) {
      router.refresh();
    }
  }, [router, state.success]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          triggerClassName ??
          'inline-flex h-9 items-center justify-center rounded-full border border-red-200 px-3 text-sm font-medium text-red-600 hover:bg-red-50'
        }
      >
        Delete
      </button>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget && !pending) {
                  setIsOpen(false);
                }
              }}
              className="fixed inset-0 z-110 flex min-h-screen items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="bookmark-delete-dialog-title"
                className="w-full max-w-md overflow-hidden rounded-4xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,251,252,0.98)_100%)] shadow-[0_30px_80px_rgba(15,23,42,0.22)]"
              >
                <div className="border-b border-slate-200/80 px-6 pb-5 pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-50 text-red-600 ring-1 ring-red-100">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h2
                          id="bookmark-delete-dialog-title"
                          className="text-2xl font-semibold tracking-tight text-slate-950"
                        >
                          Delete bookmark?
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          This will permanently remove the bookmark from your dashboard
                          and public profile if it was shared.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      disabled={pending}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-60"
                      aria-label="Close dialog"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {state.error ? (
                    <p
                      role="alert"
                      className="mb-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700"
                    >
                      {state.error}
                    </p>
                  ) : null}

                  <form action={formAction} className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <input type="hidden" name="bookmark_id" value={bookmarkId} />
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      disabled={pending}
                      className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={pending}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-red-200 bg-red-600 px-5 text-sm font-medium text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Trash2 className="h-4 w-4" />
                      {pending ? 'Deleting...' : 'Delete bookmark'}
                    </button>
                  </form>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
