'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    });

    if (res.ok) {
      setMessage('Mot de passe réinitialisé 🎉');
    } else {
      setMessage('Lien invalide ou expiré ❌');
    }
  };

  return (
    <Suspense>
      <form onSubmit={handleReset} className="max-w-md mx-auto mt-10 space-y-4">
        <h2 className="text-xl font-bold text-center">Nouveau mot de passe</h2>
        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button className="btn btn-primary w-full">Réinitialiser</button>
        {message && <p className="text-center mt-2">{message}</p>}
      </form>
    </Suspense>
  );
}
