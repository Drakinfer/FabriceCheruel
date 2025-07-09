'use client';

import { useState } from 'react';
import Button from './Button';

export default function CategoryForm({ initialData = null, onSuccess }) {
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = initialData ? 'PUT' : 'POST';
    const url = initialData
      ? `/api/categories/${initialData.id}`
      : '/api/categories';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (res.ok) {
      onSuccess();
    } else {
      alert("Erreur lors de l'enregistrement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="input input-bordered w-full"
        placeholder="Nom de la catégorie"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button type="submit">
        {initialData ? 'Modifier' : 'Ajouter'}
      </Button>
    </form>
  );
}
