'use client';
import ForgotPasswordForm from '@/app/components/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto mt-12 p-4 border rounded bg-base-100 shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Mot de passe oublié
      </h1>
      <ForgotPasswordForm />
    </div>
  );
}
