import 'server-only';

import { createAdminClient } from './admin';

export async function isUsernameAvailable(username: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('handle', username)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data === null;
}
