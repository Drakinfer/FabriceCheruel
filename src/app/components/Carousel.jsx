'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Carrousel({ images = [] }) {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
      {images.length > 0 && (
        <Image
          src={images[current]}
          alt={`Image ${current + 1}`}
          fill
          className="object-contain rounded"
        />
      )}

      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded shadow"
          >
            ❮
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-1 rounded shadow"
          >
            ❯
          </button>

          <div className="absolute bottom-2 w-full flex justify-center gap-1">
            {images.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === current ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
