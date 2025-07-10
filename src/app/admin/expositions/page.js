'use client';

import { useEffect, useState } from 'react';
import Button from '@/app/components/Button';
import Modal from '@/app/components/Modal';
import ConfirmModal from '@/app/components/ConfirmModal';
import Pagination from '@/app/components/Pagination';
import ExpositionForm from '@/app/components/ExpositionForm';
import ExpositionList from '@/app/components/ExpositionList';
import ExpoFilter from '@/app/components/ExpositionFilter';
import { useSession } from 'next-auth/react';

export default function AdminExpositionsPage() {
  const [expositions, setExpositions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  const fetchExpositions = async () => {
    const params = new URLSearchParams({
      page: currentPage + 1,
      limit: 3,
      ...(filters.keywords && { keywords: filters.keywords }),
    });
    const res = await fetch(`/api/expositions?${params}`);
    const data = await res.json();
    setExpositions(data.items);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchExpositions();
  }, [currentPage, filters]);

  const handleEdit = (expo) => {
    setSelectedExpo(expo);
    setIsModalOpen(true);
  };

  const handleDelete = (expo) => {
    setSelectedExpo(expo);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await fetch(`/api/expositions/${selectedExpo.id}`, {
      method: 'DELETE',
    });
    setIsConfirmOpen(false);
    setSelectedExpo(null);
    setCurrentPage(0); // Revenir à la première page
    fetchExpositions();
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setSelectedExpo(null);
    fetchExpositions();
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <div className="md:w-1/4">
        <Button onClick={() => setIsModalOpen(true)} className="mb-4">
          Ajouter une exposition
        </Button>
        <ExpoFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="md:w-3/4 flex flex-col gap-6 ">
        <Pagination
          currentPage={currentPage}
          pageCount={totalPages}
          onPageChange={setCurrentPage}
        />

        <ExpositionList
          expositions={expositions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isAdmin={isAdmin}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedExpo(null);
        }}
        title={
          selectedExpo ? 'Modifier une exposition' : 'Ajouter une exposition'
        }
      >
        <ExpositionForm initialData={selectedExpo} onSuccess={handleSuccess} />
      </Modal>

      <ConfirmModal
        open={isConfirmOpen}
        message={`Supprimer l’exposition « ${selectedExpo?.name} » ?`}
        onCancel={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
