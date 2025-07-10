'use client';

import { useEffect, useState } from 'react';
import ExpositionList from '@/app/components/ExpositionList';
import ExpositionFilter from '@/app/components/ExpositionFilter';
import Pagination from '@/app/components/Pagination';
import { useSession } from 'next-auth/react';

export default function ExpositionsPage() {
  const [expositions, setExpositions] = useState([]);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState({ keywords: '' });
  const [page, setPage] = useState(1);
  const limit = 3;
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  const fetchExpositions = async () => {
    const params = new URLSearchParams({
      page,
      limit,
      keywords: filters.keywords || '',
    });

    const res = await fetch(`/api/expositions?${params}`);
    const data = await res.json();
    setExpositions(data.items);
    setTotal(data.total);
  };

  useEffect(() => {
    fetchExpositions();
  }, [page, filters]);

  return (
    <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:h-full">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <ExpositionFilter filters={filters} onFilterChange={setFilters} />
        </div>

        <div className="w-full md:w-2/3 space-y-6">
          <Pagination
            currentPage={page}
            totalItems={total}
            itemsPerPage={limit}
            onPageChange={setPage}
          />
          <ExpositionList expositions={expositions} isAdmin={isAdmin} />
        </div>
      </div>
    </div>
  );
}
