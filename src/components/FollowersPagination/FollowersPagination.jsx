import React, { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import { Box, Pagination } from '@mui/material';

const FollowersPagination = () => {
  const { currentPage, itemsPerPage, handlePageChange, totalItems } = useContext(DashboardContext)
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
      />
    </Box>
  );
};

export default FollowersPagination;
