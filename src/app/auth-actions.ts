'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import {
  normalizeUsername,
  validateUsername,
} from '@/lib/username';
import { isUsernameAvailable } from '@/lib/supabase/username';
import { sendWelcomeEmail } from '@/lib/resend/welcome-email';
import { redirect } from 'next/navigation';

export type AuthState = {
  error?: string;
  message?: string;
};

function readField(formData: FormData, key: string, trim = true) {
  const value = formData.get(key);

  if (typeof value !== 'string') {
    return '';
  }

  return trim ? value.trim() : value;
}

async function cleanupCreatedUser(
  supabase: Awaited<ReturnType<typeof createClient>>,
  adminClient: ReturnType<typeof createAdminClient>,
  userId: string,
) {
  const { error: deleteError } = await adminClient.auth.admin.deleteUser(userId);
  const { error: signOutError } = await supabase.auth.signOut();

  return deleteError?.message ?? signOutError?.message ?? null;
}

export async function loginAction(
  _: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = readField(formData, 'email');
  const password = readField(formData, 'password');

  if (!email || !password) {
    return {
      error: 'Email and password are required.',
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  redirect('/dashboard');
}

export async function signupAction(
  _: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const username = normalizeUsername(readField(formData, 'username', false));
  const email = readField(formData, 'email');
  const password = readField(formData, 'password');

  const usernameError = validateUsername(username);

  if (usernameError) {
    return {
      error: usernameError,
    };
  }

  if (!email || !password) {
    return {
      error: 'Email and password are required.',
    };
  }

  const supabase = await createClient();
  const adminClient = createAdminClient();

  try {
    const availableBeforeSignup = await isUsernameAvailable(username);

    if (!availableBeforeSignup) {
      return {
        error: 'Username is already taken.',
      };
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      error: message,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      error: error.message,
    };
  }

  const userId = data.user?.id;

  if (!userId) {
    await supabase.auth.signOut();
    return {
      error: 'Signup succeeded, but the auth user record was not returned.',
    };
  }

  try {
    const availableAfterSignup = await isUsernameAvailable(username);

    if (!availableAfterSignup) {
      const cleanupError = await cleanupCreatedUser(supabase, adminClient, userId);
      return {
        error: cleanupError
          ? `Username is already taken. Cleanup failed: ${cleanupError}`
          : 'Username is already taken.',
      };
    }
  } catch (error) {
    const cleanupError = await cleanupCreatedUser(supabase, adminClient, userId);
    const message = error instanceof Error ? error.message : 'Unknown error';

    return {
      error: cleanupError
        ? `${message} Cleanup failed: ${cleanupError}`
        : message,
    };
  }

  const { error: profileCreateError } = await adminClient.from('profiles').insert({
    id: userId,
    handle: username,
  });

  if (profileCreateError) {
    const cleanupError = await cleanupCreatedUser(
      supabase,
      adminClient,
      userId,
    );

    if (cleanupError) {
      return {
        error: `${profileCreateError.message} Cleanup failed: ${cleanupError}`,
      };
    }
    return {
      error: profileCreateError.message,
    };
  }

  const welcomeEmailResult = await sendWelcomeEmail({
    to: email,
    username,
  });

  if (data.session) {
    redirect('/dashboard');
  }

  if (!welcomeEmailResult.ok) {
    return {
      message: `Account created. Welcome email could not be sent: ${welcomeEmailResult.error}`,
    };
  }

  return {
    message: 'Check your email to finish creating your account.',
  };
}

export async function logoutAction(): Promise<never> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect('/login');
}
