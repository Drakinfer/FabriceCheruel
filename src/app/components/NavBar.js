'use client';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar bg-base-100 border-b py-4 px-6 flex items-center justify-between h-[64px]">
      {/* Logo */}
      <div className="flex-1">
        <a href="/" className="text-2xl font-bold">
          LOGO
        </a>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center gap-6">
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <a href="/galerie">Galerie</a>
          </li>
          <li>
            <a href="/expos">Expos</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/forum">Forum</a>
          </li>
        </ul>
        <a href="/profile" className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804
              M15 10a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </a>
      </div>

      {/* Burger menu (mobile) */}
      <div className="lg:hidden relative">
        <button onClick={() => setIsOpen(!isOpen)} className="btn btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <ul className="absolute right-0 top-[50px] z-50 bg-base-100 shadow rounded w-48 p-2 space-y-2">
            <li>
              <a href="/galerie" onClick={() => setIsOpen(false)}>
                Galerie
              </a>
            </li>
            <li>
              <a href="/expos" onClick={() => setIsOpen(false)}>
                Expos
              </a>
            </li>
            <li>
              <a href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
            <li>
              <a href="/forum" onClick={() => setIsOpen(false)}>
                Forum
              </a>
            </li>
            <li>
              <a href="/profile" onClick={() => setIsOpen(false)}>
                Profil
              </a>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
