'use client';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      setErrorMsg('Identifiants incorrects');
      setTimeout(() => setErrorMsg(''), 3000);
    }
  };

  return (
    <div className="w-full max-w-md border border-neutral p-8 rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">Connexion</h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center"
      >
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="input input-bordered w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {errorMsg && (
          <div className="text-white text-sm text-center w-full bg-black p-2 rounded-full">
            {errorMsg}
          </div>
        )}

        <Button type="submit">Se connecter</Button>
      </form>
    </div>
  );
}
