'use client';
import ReactPaginate from 'react-paginate';

export default function Pagination({ pageCount, onPageChange, currentPage }) {
  return (
    <div className="flex justify-end mt-4">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={({ selected }) => onPageChange(selected)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        forcePage={typeof currentPage === 'number' ? currentPage : 0}
        containerClassName="flex items-center gap-2"
        pageClassName="join-item btn btn-sm"
        breakClassName="join-item btn btn-sm"
        previousClassName="join-item btn btn-sm"
        nextClassName="join-item btn btn-sm"
        activeClassName="btn-active"
        disabledClassName="opacity-50 pointer-events-none"
      />
    </div>
  );
}
