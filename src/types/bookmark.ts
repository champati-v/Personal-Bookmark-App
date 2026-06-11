export const BOOKMARK_CATEGORIES = [
  'Professional',
  'Projects',
  'Social',
  'Documents',
  'Other',
] as const;

export type BookmarkCategory = (typeof BOOKMARK_CATEGORIES)[number];
