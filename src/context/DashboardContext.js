import { createContext } from 'react';

export const DashboardContext = createContext({
  sortedUsers: [],
  sortBy: '',
  handleSortChange: () => {},
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 3,
  handlePageChange: () => {}
});
