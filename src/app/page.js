'use client';
import { useState } from 'react';
import HomeSection1 from './components/HomeSectionFirst';
import HomeSection2 from './components/HomeSectionSecond';

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState(1);

  return (
    <>
      <div
        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
          ${
            currentSection === 1
              ? 'opacity-100 pointer-events-auto z-20 translate-y-0'
              : 'opacity-0 pointer-events-none hidden -translate-y-full'
          }
        `}
      >
        <HomeSection1 onScrollDown={() => setCurrentSection(2)} />
      </div>

      <div
        className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
          ${
            currentSection === 2
              ? 'opacity-100 pointer-events-auto z-20 translate-y-0'
              : 'opacity-0 pointer-events-none hidden translate-y-full'
          }
        `}
      >
        <HomeSection2 onScrollUp={() => setCurrentSection(1)} />
      </div>
    </>
  );
}
