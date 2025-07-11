'use client';

import { useState, useEffect } from 'react';
import Button from './Button';
import ImageUploader from './ImageUploader';

export default function ExpositionForm({ initialData = {}, onSuccess }) {
  const [name, setName] = useState(initialData?.name || '');
  const [address, setAddress] = useState(initialData?.address || '');
  const [city, setCity] = useState(initialData?.city || '');
  const [postalCode, setPostalCode] = useState(initialData?.postalCode || '');
  const [country, setCountry] = useState(initialData?.country || '');
  const [imageUrl, setImageUrl] = useState(initialData?.image || []);
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().substring(0, 10)
      : '',
  );
  const [description, setDescription] = useState(
    initialData?.description || '',
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name,
      address,
      city,
      postalCode,
      country,
      image: Array.isArray(imageUrl) ? imageUrl[0] : imageUrl,
      date,
    };

    const url = initialData?.id
      ? `/api/expositions/${initialData.id}`
      : `/api/expositions`;

    const method = initialData?.id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Erreur lors de l’envoi du formulaire');

      onSuccess?.();
    } catch (err) {
      console.error('Erreur soumission formulaire :', err);
      alert('Erreur lors de la sauvegarde de l’exposition.');
    }
  };

  const handleDeleteImage = async () => {
    const publicId = getPublicIdFromUrl(imageUrl);

    try {
      await fetch('/api/delete-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ publicId }),
      });

      setImageUrl('');
    } catch (err) {
      console.error('Erreur de suppression :', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nom de l’exposition"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        type="date"
        className="input input-bordered w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Adresse"
        className="input input-bordered w-full"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Code postal"
          className="input input-bordered w-1/2"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Ville"
          className="input input-bordered w-1/2"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      <input
        type="text"
        placeholder="Pays"
        className="input input-bordered w-full"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ImageUploader onUpload={(urls) => setImageUrl(urls)} />

      {Array.isArray(imageUrl) && imageUrl.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {imageUrl.map((url, idx) => (
            <div key={idx} className="relative w-20 h-20">
              <img
                src={url}
                alt={`Image ${idx + 1}`}
                className="object-cover w-full h-full rounded border"
              />
              <button
                type="button"
                className="absolute top-0 right-0 bg-white text-red-500 text-xs px-1 rounded-full"
                onClick={() => handleDeleteImage(url)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      <Button type="submit">{initialData?.id ? 'Modifier' : 'Ajouter'}</Button>
    </form>
  );
}
