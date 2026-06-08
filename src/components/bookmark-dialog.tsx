'use client';

import { Bookmark, Sparkles, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';

import {
  createBookmarkAction,
  updateBookmarkAction,
  type BookmarkValues,
} from '@/app/services/bookmark-actions';
import { BookmarkForm } from '@/components/bookmark-form';

type BookmarkDialogProps = {
  triggerLabel: string;
  title: string;
  description: string;
  values?: Partial<BookmarkValues>;
  mode?: 'create' | 'edit';
  triggerClassName?: string;
};

export function BookmarkDialog({
  triggerLabel,
  title,
  description,
  values,
  mode = 'create',
  triggerClassName,
}: BookmarkDialogProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    setFormKey((currentKey) => currentKey + 1);
  }, []);

  const handleSuccess = useCallback(() => {
    closeDialog();
    router.refresh();
  }, [closeDialog, router]);

  const action = mode === 'edit' ? updateBookmarkAction : createBookmarkAction;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          triggerClassName ??
          'inline-flex h-11 items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white'
        }
      >
        {triggerLabel}
      </button>

      {isOpen && typeof document !== 'undefined'
        ? createPortal(
            <div
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeDialog();
                }
              }}
              className="fixed inset-0 z-100 flex min-h-screen items-center justify-center bg-slate-950/45 p-4 backdrop-blur-md"
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="bookmark-dialog-title"
                className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-y-auto rounded-4xl border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,251,252,0.98)_100%)] shadow-[0_30px_80px_rgba(15,23,42,0.22)]"
              >
                <div className="border-b border-slate-200/80 px-6 pb-5 pt-6 sm:px-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-900 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        Bookmark workspace 
                      </div>

                      <div className="mt-4 flex items-start gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-950 text-white shadow-[0_12px_30px_rgba(6,78,59,0.18)]">
                          <Bookmark className="h-5 w-5" />
                        </div>

                        <div>
                          <h2
                            id="bookmark-dialog-title"
                            className="text-2xl font-semibold tracking-tight text-slate-950"
                          >
                            {title}
                          </h2>
                          <p className="mt-2 text-sm leading-6 text-slate-500">
                            {description}
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={closeDialog}
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900"
                      aria-label="Close dialog"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
                    <BookmarkForm
                      key={formKey}
                      action={action}
                      onSuccess={handleSuccess}
                      submitLabel={mode === 'edit' ? 'Update bookmark' : 'Save bookmark'}
                      values={values}
                    />
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
