'use client';
import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import Button from './Button';
import ProtectedImage from './ProtectedImage';
import Link from 'next/link';

export default function HomeSection2({ onScrollUp }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch('/api/products/latest')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <section className="h-full w-full flex flex-col items-center justify-center px-8 relative text-center md:text-left">
      <button
        onClick={onScrollUp}
        aria-label="Remonter"
        className="absolute top-6 left-1/2 -translate-x-1/2"
      >
        <ChevronUpIcon className="h-6 w-6 text-black animate-bounce" />
      </button>
      <h2 className="pt-15 text-3xl font-semibold">Ma dernière création</h2>
      {product && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-16 max-w-6xl w-full h-full">
          {/* Colonne image + texte */}
          <div className="flex flex-col justify-center h-full items-center gap-4 w-full md:w-2/3">
            <Link href={`galerie/${product.id}`} className="w-full">
              <div className="relative w-full aspect-[4/3] max-w-md border border-black rounded overflow-hidden">
                <ProtectedImage
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  containerClass="aspect-[4/3]"
                />
              </div>

              <p className="text-base leading-relaxed text-lg">
                {product.name}
              </p>
            </Link>
          </div>

          <Button href="/galerie">Voir mes œuvres</Button>
        </div>
      )}
    </section>
  );
}
