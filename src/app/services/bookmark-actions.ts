'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

import { BOOKMARK_CATEGORIES, type BookmarkCategory } from '../../types/bookmark';

export type BookmarkState = {
  error?: string;
  success?: boolean;
};

export type BookmarkValues = {
  bookmarkId?: string;
  title: string;
  url: string;
  isPublic: boolean;
  category?: string;
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
  const category = readField(formData, 'category') || 'Other';

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

  if (!BOOKMARK_CATEGORIES.includes(category as BookmarkCategory)) {
    return {
      error: 'Invalid category.',
    };
  }

  const { error } = await supabase.from('bookmarks').insert({
    user_id: user.id,
    title,
    url,
    is_public: isPublic,
    category,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  revalidatePath('/dashboard');

  return {
    success: true,
  };
}

export async function updateBookmarkAction(
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

  const bookmarkId = readField(formData, 'bookmark_id');
  const title = readField(formData, 'title');
  const url = readField(formData, 'url');
  const isPublic = formData.get('is_public') === 'on';
  const category = readField(formData, 'category') || 'Other';

  if (!bookmarkId) {
    return {
      error: 'Bookmark id is required.',
    };
  }

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

  if (!BOOKMARK_CATEGORIES.includes(category as BookmarkCategory)) {
    return {
      error: 'Invalid category.',
    };
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .update({
      title,
      url,
      is_public: isPublic,
      category,
    })
    .eq('id', bookmarkId)
    .eq('user_id', user.id)
    .select('id');

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!data || data.length === 0) {
    return {
      error: 'Bookmark not found.',
    };
  }

  revalidatePath('/dashboard');

  return {
    success: true,
  };
}

export async function deleteBookmarkAction(
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

  const bookmarkId = readField(formData, 'bookmark_id');

  if (!bookmarkId) {
    return {
      error: 'Bookmark id is required.',
    };
  }

  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', bookmarkId)
    .eq('user_id', user.id)
    .select('id');

  if (error) {
    return {
      error: error.message,
    };
  }

  if (!data || data.length === 0) {
    return {
      error: 'Bookmark not found.',
    };
  }

  revalidatePath('/dashboard');

  return {
    success: true,
  };
}
