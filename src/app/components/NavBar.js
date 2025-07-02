'use client';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { PowerIcon, UserIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="navbar bg-base-100 border-b py-4 px-6 flex items-center justify-between h-[168px] fixed top-0 left-0 w-full z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link href="/" className="text-2xl font-bold">
          LOGO
        </Link>
      </div>

      {/* Desktop menu */}
      <div className="hidden lg:flex items-center gap-6">
        <ul className="flex items-center gap-6 text-lg">
          <li>
            <Link href="/galerie">Galerie</Link>
          </li>
          <li>
            <Link href="/expos">Expos</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/forum">Forum</Link>
          </li>
        </ul>

        {session ? (
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="btn btn-ghost"
            title="Se déconnecter"
          >
            <PowerIcon className="h-6 w-6" />
          </button>
        ) : (
          <Link href="/login" className="btn btn-ghost" title="Se connecter">
            <UserIcon className="h-6 w-6" />
          </Link>
        )}
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

        {isOpen && (
          <ul className="absolute right-0 top-[50px] z-50 bg-base-100 shadow rounded w-48 p-2 space-y-2">
            <li>
              <Link href="/galerie" onClick={() => setIsOpen(false)}>
                Galerie
              </Link>
            </li>
            <li>
              <Link href="/expos" onClick={() => setIsOpen(false)}>
                Expos
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Contact
              </Link>
            </li>
            <li>
              <Link href="/forum" onClick={() => setIsOpen(false)}>
                Forum
              </Link>
            </li>
            {session ? (
              <li>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                >
                  Se déconnecter
                </button>
              </li>
            ) : (
              <li>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Connexion
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
