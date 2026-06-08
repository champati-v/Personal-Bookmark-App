'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export type BookmarkState = {
  error?: string;
};

function readField(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
}

function validateUrl(value: string) {
  try {
    const url = new URL(value);

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return 'URL must start with http:// or https://.';
    }

    return null;
  } catch {
    return 'Please enter a valid URL.';
  }
}

export async function createBookmarkAction(
  _: BookmarkState,
  formData: FormData,
): Promise<BookmarkState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const title = readField(formData, 'title');
  const url = readField(formData, 'url');
  const isPublic = formData.get('is_public') === 'on';

  if (!title) {
    return {
      error: 'Title is required.',
    };
  }

  const urlError = validateUrl(url);

  if (urlError) {
    return {
      error: urlError,
    };
  }

  const { error } = await supabase.from('bookmarks').insert({
    user_id: user.id,
    title,
    url,
    is_public: isPublic,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect('/dashboard');
}
