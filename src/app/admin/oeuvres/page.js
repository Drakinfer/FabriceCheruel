'use client';
import { useEffect, useState } from 'react';
import OeuvreFilter from '../../components/OeuvreFilter';
import OeuvreList from '../../components/OeuvreList';
import Pagination from '../../components/Pagination';
import { useSession } from 'next-auth/react';
import Button from '@/app/components/Button';
import OeuvreForm from '@/app/components/OeuvreForm';
import Modal from '@/app/components/Modal';

export default function OeuvresPage() {
  const [oeuvres, setOeuvres] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  const fetchOeuvres = async () => {
    setIsLoading(true);

    const params = new URLSearchParams({
      page: currentPage + 1,
      limit: 3,
      ...(filters.categoryId && { categoryId: filters.categoryId }),
      ...(filters.keywords && { keywords: filters.keywords }),
    });

    try {
      const res = await fetch(`/api/products?${params}`);
      const data = await res.json();

      setOeuvres(data.items);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error('Erreur lors du chargement des œuvres :', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOeuvres();
  }, [currentPage, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(0); // reset pagination à la première page
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erreur lors de la suppression');

      fetchOeuvres();
    } catch (error) {
      console.error('Suppression échouée :', error);
    }
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    fetchOeuvres();
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
      <div className="md:w-1/4">
        <Button onClick={() => setIsModalOpen(true)} className="mb-4">
          Ajouter une oeuvre
        </Button>
        <OeuvreFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="md:w-3/4 flex flex-col gap-6">
        <Pagination
          currentPage={currentPage}
          pageCount={totalPages}
          onPageChange={setCurrentPage}
        />
        <OeuvreList
          oeuvres={oeuvres}
          isAdmin={isAdmin}
          isLoading={isLoading}
          onDelete={handleDelete}
          onSuccess={handleSuccess}
          showLinkBase="../galerie/"
        />
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Ajouter une œuvre"
        >
          <OeuvreForm onSuccess={handleSuccess} />
        </Modal>
      )}
    </div>
  );
}
