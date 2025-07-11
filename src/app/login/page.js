'use client';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';
import Button from '../components/Button';

export default function LoginPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <LoginForm />
      <p className="mt-4 text-center text-sm">
        Mot de passe oublié ?{' '}
        <Button href="/forgot-password">Le réinitialiser ici</Button>
      </p>
      <p className="mt-4 text-center text-sm">
        Pas de compte ? <Button href="/register">S&apos;inscrire</Button>
      </p>
    </div>
  );
}
