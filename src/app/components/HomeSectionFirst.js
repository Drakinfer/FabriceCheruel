'use client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ProtectedImage from './ProtectedImage';

export default function HomeSection1({ onScrollDown }) {
  return (
    <section className="w-full h-full flex items-center justify-center relative px-6 sm:px-12">
      <div className="h-full flex flex-col md:flex-row w-full max-w-7xl items-center justify-between gap-24">
        <div className="md:h-[80%] relative w-full md:w-2/3 aspect-[4/3] md:aspect-auto overflow-hidden rounded shadow">
          <ProtectedImage
            src="/accueil.jpg"
            alt="Fabrice Cheruel"
            fill
            containerClass="aspect-[4/3]"
          />
        </div>

        {/* Texte */}
        <div className="w-full md:w-1/3 text-left leading-relaxed">
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
