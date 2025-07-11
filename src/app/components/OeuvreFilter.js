'use client';

import { useEffect, useState, useRef } from 'react';

export default function OeuvreFilter({ filters, onFilterChange }) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [categories, setCategories] = useState([]);
  const firstRender = useRef(true);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const parsedValue =
      type === 'number' || name === 'categoryId' ? parseInt(value) : value;

    const updated = { ...localFilters, [name]: parsedValue };
    setLocalFilters(updated);
    onFilterChange(updated); // ← Seulement en interaction utilisateur
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories :', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          placeholder="Ex: abstrait moderne..."
        />
      </div>

      {/* Catégorie */}
      <div>
        <label className="label">
          <span className="label-text">Catégorie</span>
        </label>
        <select
          name="categoryId"
          value={localFilters.categoryId || ''}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
