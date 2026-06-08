'use client';

import { useCallback, useState } from 'react';
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

      {isOpen ? (
        <div
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeDialog();
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bookmark-dialog-title"
            className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-black/10 p-6">
              <div>
                <h2
                  id="bookmark-dialog-title"
                  className="text-lg font-semibold tracking-tight text-black"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm leading-6 text-black/65">{description}</p>
              </div>
              <button
                type="button"
                onClick={closeDialog}
                className="rounded-full p-2 text-black/50 hover:bg-black/5 hover:text-black"
                aria-label="Close dialog"
              >
                ×
              </button>
            </div>

            <div className="p-6">
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
      ) : null}
    </>
  );
}
