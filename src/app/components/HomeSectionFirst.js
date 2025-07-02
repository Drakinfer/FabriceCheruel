'use client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';

export default function HomeSection1({ onScrollDown }) {
  return (
    <section className="h-full w-full flex  items-center justify-center relative px-12">
      <div className="flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-12">
        <div className="basis-[60%]">
          <Image
            src="/accueil.jpg"
            alt="Œuvre d'art"
            width={800} // largeur réelle
            height={600} // hauteur réelle
            className="object-cover rounded shadow w-full h-auto"
            priority
          />
        </div>

        {/* Texte */}
        <div className="basis-[30%] lg:text-2xl leading-relaxed text-left">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>
      </div>

      {/* Flèche */}
      <button
        onClick={onScrollDown}
        aria-label="Aller à la section suivante"
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ChevronDownIcon className="h-6 w-6 text-black animate-bounce" />
      </button>
    </section>
  );
}
