'use client';
import { useEffect, useRef, useState } from 'react';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const dropupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropupRef.current && !dropupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <footer className="hidden lg:block bg-base-200 text-base-content border-t fixed bottom-0 left-0 w-full">
        <div className="container mx-auto py-2 px-4 flex flex-col justify-between md:flex-row gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Informations légales</h2>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/mentions-legales" className="link link-hover">
                  Mentions légales
                </a>
              </li>
              <li>
                <a
                  href="/politique-confidentialite"
                  className="link link-hover"
                >
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="/cgu" className="link link-hover">
                  Conditions d&apos;utilisation
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Contact</h2>
            <ul className="space-y-1 text-sm">
              <li>
                Email :{' '}
                <a href="mailto:contact@monsite.com" className="link">
                  contact@monsite.com
                </a>
              </li>
              <li>
                <a href="/contact" className="link link-hover">
                  Formulaire de contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center text-xs p-4 bg-base-300">
          © {new Date().getFullYear()} Fabrice Cheruel. Tous droits réservés.
        </div>
      </footer>

      {/* Mobile dropup footer */}
      <div
        className="lg:hidden fixed bottom-6 mb-5 right-4 z-50"
        ref={dropupRef}
      >
        <div className="dropdown dropdown-top dropdown-end relative">
          <button
            tabIndex={0}
            onClick={() => setOpen(!open)}
            className="btn btn-primary btn-circle absolute top-2 right-2 text-lg text-gray-600 hover:text-black"
            aria-label="Afficher les infos légales"
          >
            {open ? '✖️' : '⬆️'}
          </button>

          {open && (
            <div
              tabIndex={0}
              className="dropdown-content z-[1] menu p-4 shadow bg-white rounded-box w-72 text-sm"
            >
              <p className="font-bold mb-2">Informations légales</p>
              <ul className="mb-3 space-y-1">
                <li>
                  <a href="/mentions-legales">Mentions légales</a>
                </li>
                <li>
                  <a href="/politique-confidentialite">
                    Politique de confidentialité
                  </a>
                </li>
                <li>
                  <a href="/cgu">Conditions d&apos;utilisation</a>
                </li>
              </ul>

              <p className="font-bold mb-2">Contact</p>
              <ul className="mb-3 space-y-1">
                <li>
                  <a href="mailto:contact@monsite.com">contact@monsite.com</a>
                </li>
                <li>
                  <a href="/contact">Formulaire de contact</a>
                </li>
              </ul>

              <p className="text-center text-xs mt-4">
                © {new Date().getFullYear()} Fabrice Cheruel
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
