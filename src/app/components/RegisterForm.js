'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password }),
    });

    if (res.ok) {
      setMessage('Compte créé avec succès ! Redirection...');
      setTimeout(() => {
        setMessage('');
        router.push('/login');
      }, 3000);
    } else {
      setMessage("Erreur lors de l'inscription.");
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="w-full max-w-md border border-neutral p-8 rounded shadow bg-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Créer un compte
      </h2>

      {message && (
        <div className="mb-4 text-center text-white bg-black px-4 py-2 rounded-full mb-5">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nom"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <Button type="submit">S&apos;inscrire</Button>
      </form>
    </div>
  );
}
