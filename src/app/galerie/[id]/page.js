'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Carousel from '@/app/components/Carousel';

export default function OeuvrePage() {
  const { id } = useParams();
  const [oeuvre, setOeuvre] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOeuvre = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setOeuvre(data);
      } catch (err) {
        console.error('Erreur de chargement :', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchOeuvre();
  }, [id]);

  if (isLoading) return <div className="text-center py-8">Chargement...</div>;
  if (!oeuvre)
    return <div className="text-center py-8">Oeuvre introuvable</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">{oeuvre.name}</h1>
      <p className="text-center text-sm text-gray-500 mb-8">
        Catégorie : {oeuvre.category?.name || 'Non classée'}
      </p>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 w-full">
          <Carousel images={oeuvre.images} />
        </div>

        {/* Description */}
        <div className="md:w-1/2 w-full text-justify text-gray-700">
          <p>{oeuvre.description}</p>
        </div>
      </div>
    </div>
  );
}
