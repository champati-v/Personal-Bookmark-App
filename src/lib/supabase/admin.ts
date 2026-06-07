import 'server-only';

import { createClient } from '@supabase/supabase-js';
import { getSupabaseEnv, getSupabaseServiceRoleKey } from './config';

export function createAdminClient() {
  const { supabaseUrl } = getSupabaseEnv();
  const supabaseServiceRoleKey = getSupabaseServiceRoleKey();

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
