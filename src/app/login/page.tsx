import { loginAction } from '@/app/auth-actions';
import { AuthForm } from '@/components/auth-form';

export default function LoginPage() {
  return (
    <AuthForm
      action={loginAction}
      title="Log in"
      description="Use your email and password to access your account."
      submitLabel="Log in"
      switchText="Don't have an account?"
      switchHref="/signup"
      switchLabel="Sign up"
    />
  );
}