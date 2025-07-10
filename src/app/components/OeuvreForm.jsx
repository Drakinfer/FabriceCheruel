'use client';

'use client';

import { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader';
import Button from './Button';

export default function OeuvreForm({ onSuccess, initialData = {} }) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [imageUrls, setImageUrls] = useState(initialData?.images || []);
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || '');
  const [categories, setCategories] = useState([]);


  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories :', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name,
    description,
    images: imageUrls,
    categoryId: Number(categoryId),
  };

  const url = initialData?.id
    ? `/api/products/${initialData.id}`
    : '/api/products';

  const method = initialData?.id ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error('Erreur lors de l’envoi du formulaire');

    onSuccess();
  } catch (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement de l'œuvre");
  }
};


  const getPublicIdFromUrl = (url) => {
  const parts = url.split('/');
  const filename = parts[parts.length - 1].split('.')[0];
  const folder = parts[parts.length - 2];
  return `${folder}/${filename}`;
};

const handleDeleteImage = async (url) => {
  const publicId = getPublicIdFromUrl(url);

  try {
    await fetch('/api/delete-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicId }),
    });

    setImageUrls((prev) => prev.filter((img) => img !== url));
  } catch (err) {
    console.error('Erreur de suppression :', err);
  }
};

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nom"
        className="input input-bordered w-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <ImageUploader onUpload={(urls) => setImageUrls(urls)} />

      {Array.isArray(imageUrls) && imageUrls.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-2">
    {imageUrls.map((url, idx) => (
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

      <select
        className="select select-bordered w-full"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        required
      >
        <option value="">Choisir une catégorie</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <Button type="submit">
        {initialData.id ? 'Modifier' : 'Ajouter'}
      </Button>
    </form>
  );
}
