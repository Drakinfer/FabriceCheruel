'use client';
import RegisterForm from '../components/RegisterForm';
import Button from '../components/Button';

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-168px)] px-4">
      <RegisterForm />
      <p className="mt-4 text-center text-sm">
        Déjà un compte ? <Button href="/login">Se connecter</Button>
      </p>
    </div>
  );
}
