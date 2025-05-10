import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFollowers } from '../../api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../../utils/rankCalculator';
import { enrichUsers } from '../../utils/enrichUsers';
import CardList from '../../components/CardList';
import FetchForm from '../../components/FetchForm';
import { DashboardContext } from './DashboardContext';
import Box from '@mui/material/Box';

export default function DashboardPage() {

  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();


  // Handles the main logic: fetches all followers up to given depth, computes ranking, and updates UI
  const onSubmit = async (data) => {
    setUsers([]);
    const { username, depth } = data;
   
    // Step 1: Recursively collect followers up to the specified depth
    const followers = await resolveFollowers(username, depth, getFollowers);
    
    // Step 2: Construct a full map of each user to their direct followers
    const fullMap = { [username]: await getFollowers(username) };
    for (const user of followers) {
      fullMap[user] = await getFollowers(user);
    }

    // Step 3: Calculate total follower ranks for each user (including indirect followers)
    const ranks = calculateRanks(fullMap);

    // Step 4: Enrich user data with profile details (simulated for mock API)
    const allUsers = [username, ...followers];
    const enriched = enrichUsers(allUsers);

    // Step 5: Merge enriched data with calculated ranks and update state
    const ranked = enriched.map((u) => ({ ...u, followersRank: ranks[u.name] || 0 }));

    setUsers(ranked);

  };
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  // Calculate visible users for current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = users.slice(indexOfFirst, indexOfLast);

  const sortedUsers = [...currentUsers].sort((a, b) => {
    if (sortBy === 'username') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'created_at') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'followersRank') {
      return b.followersRank - a.followersRank;
    }
    return 0;
  });



  const value = {
    handleSubmit,
    onSubmit,
    register,
    users: sortedUsers,
    errors,
    isSubmitting,
    sortBy,
    handleSortChange,
    currentPage,
    totalItems: users.length,
    itemsPerPage,
    handlePageChange
  }
  return (
    <DashboardContext.Provider value={value} >
      <Box sx={{ mb: 5 }}>
        <FetchForm />
      </Box>
      {isSubmitting && <p>Loading..</p>}
      {sortedUsers.length > 0 && <CardList />}
    </DashboardContext.Provider>
  );
}
