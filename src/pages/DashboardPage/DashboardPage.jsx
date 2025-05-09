import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFollowers } from '../../api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../../utils/rankCalculator';
import { enrichUsers } from '../../utils/enrichUsers';

import { UserList } from '../../components/UserList/UserList';

import './style.css';
import FetchForm from '../../components/FetchForm/FetchForm';
import { DashboardContext } from './DashboardContext';


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
    console.log('data', data)
    // Step 1: Recursively collect followers up to the specified depth
    const followers = await resolveFollowers(username, depth, getFollowers);
    console.log('followers', followers)
    // Step 2: Construct a full map of each user to their direct followers
    const fullMap = { [username]: await getFollowers(username) };
    console.log('fullMap', fullMap)
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
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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



  const value ={
    handleSubmit,
    onSubmit,
    register,
    users:sortedUsers,
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
      <div className='dashboard'>
        <FetchForm   />
        <br/>
         <UserList />

      </div>
    </DashboardContext.Provider>
  );
}
