'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from './Button';
import Modal from './Modal';
import CGUContent from './CGUContent';

export default function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, password, has_agreed_cgu: agreed }),
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

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-center items-center"
      >
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
        <div className="text-sm flex items-start gap-2">
          <input
            type="checkbox"
            id="cgu"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="checkbox mt-1"
            required
          />
          <label htmlFor="cgu">
            J’accepte les{' '}
            <button
              type="button"
              className="link link-primary"
              onClick={() => setModalOpen(true)}
            >
              Conditions Générales d&apos;Utilisation
            </button>
          </label>
        </div>
        <Button type="submit">S&apos;inscrire</Button>
      </form>
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Conditions Générales d’Utilisation"
      >
        <div className="max-h-[50vh] overflow-y-auto px-2 pr-4">
          <CGUContent withPadding={false} />
        </div>
      </Modal>
    </div>
  );
}
