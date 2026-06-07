export const USERNAME_PATTERN = /^[a-z0-9_]{3,15}$/;

export function normalizeUsername(value: string) {
  return value.toLowerCase();
}

export function validateUsername(value: string) {
  if (!value) {
    return 'Username is required.';
  }

  if (value !== value.toLowerCase()) {
    return 'Username must be lowercase.';
  }

  if (!USERNAME_PATTERN.test(value)) {
    return 'Username must be 3-15 characters and use only lowercase letters, numbers, and underscores.';
  }

  return null;
}
