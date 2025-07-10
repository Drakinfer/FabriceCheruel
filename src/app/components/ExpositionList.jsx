'use client';

import Image from 'next/image';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import ProtectedImage from './ProtectedImage';

export default function ExpositionList({ expositions, onEdit, onDelete, isAdmin }) {
  return (
    <div className="flex flex-col gap-4">
      {expositions.map((expo) => (
        <div
          key={expo.id}
          className="flex flex-col sm:flex-row gap-4 border rounded p-2 items-start"
        >
          <div className="w-full h-full sm:w-[200px] relative shrink-0">
            <ProtectedImage
              src={expo.image}
              alt={expo.name}
              fill
              container="object-cover rounded"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-lg font-bold">{expo.name}</h2>
            <p className="text-sm text-gray-600">
              {expo.address}, {expo.postalCode} {expo.city}, {expo.country}
            </p>
            <p className="text-sm text-gray-500">
              {new Date(expo.date).toLocaleDateString()}
            </p>
          </div>

          {isAdmin && (
  <div className="flex gap-2">
    <button onClick={() => handleClickEdit(expo)} className="btn btn-sm btn-outline">
      <PencilIcon className="h-4 w-4" />
    </button>
    <button onClick={() => handleClickDelete(expo.id)} className="btn btn-sm btn-error">
      <TrashIcon className="h-4 w-4" />
    </button>
  </div>
)}
        </div>
      ))}
    </div>
  );
}