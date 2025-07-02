// components/ClientLayout.js
'use client';

import Navbar from './NavBar';
import Footer from './Footer';

export default function ClientLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="relative lg:h-[calc(100vh-400px)] h-[calc(100vh-168px)] my-[168px] px-4 overflow-hidden">
        {children}
      </main>
      <Footer />
    </>
  );
}
