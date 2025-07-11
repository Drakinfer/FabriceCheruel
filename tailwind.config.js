/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // pour le dossier /app (Next.js App Router)
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light'],
  },

  safelist: [
    'h-[calc(100vh-234px)]',
    'h-[calc(100vh-65px)]',
    'mt-[65px]',
    'translate-y-full',
    'translate-y-0',
    'opacity-0',
    'opacity-100',
    'z-10',
    'z-20',
    'w-*',
    'h-*',
    'gap-*',
  ],
};
