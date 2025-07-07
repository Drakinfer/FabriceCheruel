'use client';

import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-40 h-[50%] w-[30%] border my-auto mx-auto">
        <div className="modal-box relative">
          {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
          {children}
          <div className="modal-backdrop absolute top-1 right-1 font-bold" onClick={onClose}>X</div>
        </div>
    </div>
  );
}
