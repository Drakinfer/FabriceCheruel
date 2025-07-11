'use client';

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Button from '@/app/components/Button';

export default function ContactPage() {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      )
      .then(
        () => {
          setSuccess(true);
          form.current.reset();
        },
        () => {
          setError(true);
        },
      );
  };

  return (
    <div className="h-full flex items-center justify-center">
      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-xl mx-auto my-auto space-y-4 p-6 bg-base-100 rounded border flex flex-col items-center justify-center"
      >
        <h2 className="text-2xl font-bold text-center">Contactez-moi</h2>

        <input
          type="text"
          name="user_name"
          placeholder="Votre nom"
          className="input input-bordered w-full"
          required
        />

        <input
          type="email"
          name="user_email"
          placeholder="Votre email"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="title"
          placeholder="Objet du message"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="message"
          placeholder="Votre message"
          className="textarea textarea-bordered w-full h-[175px]"
          required
        />

        <Button type="submit">Envoyer</Button>

        {success && (
          <p className="text-green-600 text-sm text-center">
            Message envoyé ✅
          </p>
        )}
        {error && (
          <p className="text-red-600 text-sm text-center">Erreur d’envoi ❌</p>
        )}
      </form>
    </div>
  );
}
