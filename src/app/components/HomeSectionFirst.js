'use client';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import ProtectedImage from './ProtectedImage';

export default function HomeSection1({ onScrollDown }) {
  return (
    <section className="w-full min-h-[calc(100vh+3rem)] md:min-h-full flex items-center justify-center relative px-6 sm:px-12">
      <div className="h-full flex flex-col md:flex-row w-full max-w-7xl items-center justify-between md:gap-24 gap-6">
        <div className="relative w-full md:w-1/2 md:aspect-auto md:overflow-hidden rounded mt-1">
          <ProtectedImage
            src="/accueil.jpg"
            alt="Fabrice Cheruel"
            fill
            containerClass="aspect-[4/3]"
          />
        </div>

        {/* Texte */}
        <div className="w-full md:w-1/2 text-left leading-relaxed pb-20 md:pb-0">
          <p>
            <span className="font-bold">
              Atelier artistique – Dessins – Sculptures-vitraux
            </span>
          </p>
          <p>
            <span className="font-bold">
              Bienvenue dans mon univers artistique
            </span>
          </p>
          <p>
            Plongez dans l&apos;univers de la création avec cet atelier
            artistique qui combine trois formes d&apos;expression
            complémentaires : le dessin, la sculpture et le vitrail.
          </p>
          <p>
            Cet espace de découverte permet d&apos;explorer et d&apos;échanger
            sur différentes techniques de dessin (crayon, fusain, encre,
            acrylique...) ainsi que le travail du volume, de la lumière à
            travers la sculpture et le verre (vitrail).
          </p>
          <p>
            Je vous donne rendez-vous dans un monde où chaque trait, chaque
            courbe, chaque volume raconte un voyage. À travers mes
            illustrations, dessins ,sculptures et vitraux , je cherche à
            capturer l&apos;émotion, explorer la matière, la lumière et donner
            vie à l&apos;imaginaire et aux sensations.
          </p>
          <p>
            Ce site est une galerie vivante de mes créations – un espace où
            l&apos;art visuel prend forme. Explorez mes projets, suivez le
            processus créatif, et laissez-vous emporter par l&apos;énergie du
            trait de dessins, des mélanges de couleurs dans la lumière . Bonne
            visite!
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
