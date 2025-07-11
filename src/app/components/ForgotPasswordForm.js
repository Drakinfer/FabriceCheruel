'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from './Button';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');

    try {
      const res = await fetch('/api/auth/generate-reset-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Erreur serveur');

      const { resetToken } = await res.json();
      const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password?token=${resetToken}`;

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_FORGOT_PASSWORD_TEMPLATE_ID,
        {
          email: email,
          link: resetUrl,
        },
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      );

      setMessage('Email envoyé ! Vérifie ta boîte mail.');
    } catch (error) {
      console.error('Erreur EmailJS :', error);
      setMessage('Une erreur est survenue.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-lg font-semibold">Réinitialiser le mot de passe</h2>

      <input
        type="email"
        className="input input-bordered w-full"
        placeholder="Ton email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button type="submit">Envoyer le lien</Button>

      {message && <p className="text-sm text-center mt-2">{message}</p>}
    </form>
  );
}
