import React, { useContext } from 'react';
import './style.css';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';

const Pagination = () => {
   const { currentPage, itemsPerPage, handlePageChange, totalItems } = useContext(DashboardContext)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => handlePageChange(i + 1)}
          className={currentPage === i + 1 ? 'active' : ''}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
