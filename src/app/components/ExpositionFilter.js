'use client';

import { useEffect, useState, useRef } from 'react';

export default function ExpositionFilter({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const firstRender = useRef(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...localFilters, [name]: value };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setLocalFilters(filters);
  }, [filters]);

  return (
    <div className="border rounded p-4 bg-base-100 shadow space-y-4 w-full">
      <h2 className="text-lg font-semibold">Filtres</h2>

      {/* Mot-clé */}
      <div>
        <label className="label">
          <span className="label-text">Mots-clés</span>
        </label>
        <input
          type="text"
          name="keywords"
          value={localFilters.keywords || ''}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Ex: Paris, vernissage, etc."
        />
      </div>
    </div>
  );
}
