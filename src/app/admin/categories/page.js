'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import ConfirmModal from '@/app/components/ConfirmModal';
import CategoryForm from '@/app/components/CategoryForm';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import Pagination from '@/app/components/Pagination';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCategories = async (page = currentPage) => {
    const res = await fetch(`/api/categories?page=${page}`);
    const data = await res.json();
    console.log(data);

    if (data.categories.length === 0 && page > 0) {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    } else {
      setCategories(data.categories);
      setTotalPages(data.totalPages);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (category) => {
    setSelectedCategory(category);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await fetch(`/api/categories/${selectedCategory.id}`, {
      method: 'DELETE',
    });

    setIsConfirmOpen(false);
    setSelectedCategory(null);
    setCurrentPage(0);
    fetchCategories(0); // force la recharge page 1
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setCurrentPage(0);
    fetchCategories();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des catégories</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Ajouter une catégorie
        </Button>
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={totalPages}
        onPageChange={setCurrentPage}
      />
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="border rounded p-3 flex justify-between items-center"
          >
            <span>{category.name}</span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="btn btn-sm btn-outline"
              >
                <PencilIcon className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(category)}
                className="btn btn-sm btn-error text-red"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCategory(null);
        }}
        title={
          selectedCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'
        }
      >
        <CategoryForm
          initialData={selectedCategory}
          onSuccess={handleSuccess}
        />
      </Modal>

      <ConfirmModal
        open={isConfirmOpen}
        message={`Supprimer la catégorie « ${selectedCategory?.name} » ?`}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
