'use client';
import { useEffect, useState } from 'react';
import OeuvreFilter from '@/app/components/OeuvreFilter';
import OeuvreList from '@/app/components/OeuvreList';
import Pagination from '@/app/components/Pagination';
import { useSession } from 'next-auth/react';

export default function OeuvresPage() {
  const [oeuvres, setOeuvres] = useState([]);
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(0); // 0-based
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
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

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:h-full">
      <div className="md:w-1/4">
        <OeuvreFilter filters={filters} onFilterChange={handleFilterChange} />
      </div>

      <div className="md:w-3/4 flex flex-col gap-6 justify-center">
        <Pagination
          currentPage={currentPage}
          pageCount={totalPages}
          onPageChange={setCurrentPage}
        />
        <OeuvreList
          oeuvres={oeuvres}
          isAdmin={isAdmin}
          isLoading={isLoading}
          showLinkBase={`/galerie`}
        />
      </div>
    </div>
  );
}
