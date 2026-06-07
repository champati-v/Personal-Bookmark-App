import { signupAction } from '@/app/auth-actions';
import { SignupForm } from '@/components/signup-form';

export default function SignupPage() {
  return (
    <SignupForm
      action={signupAction}
      title="Create account"
      description="Choose a unique public username, then create your account."
      submitLabel="Sign up"
      switchText="Already have an account?"
      switchHref="/login"
      switchLabel="Log in"
    />
  );
}