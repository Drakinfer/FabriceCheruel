// components/ClientLayout.js
'use client';

import Navbar from './NavBar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="relative lg:h-[calc(100vh-186px)] h-[calc(100vh-65px)] mt-[65px] px-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
