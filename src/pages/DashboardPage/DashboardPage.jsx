import React, { useReducer, useEffect, useMemo, useCallback, useContext } from 'react';
import { getUsers, getFollowers } from './api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../../utils/rankCalculator';
import { enrichFollowers } from '../../utils/enrichFollowers';
import CardList from '../../components/CardList';
import FetchForm from '../../components/FetchForm';
import { DashboardContext } from '../../context/DashboardContext';
import { reducer } from './store/Reducer';
import { initialState } from './store/initialState';
import {Box} from '@mui/material';
import { sortFollowers } from '../../utils/sortFollowers';
import FormProvider from '../../context/FormProvider';




function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, followers, sortBy, currentPage } = state;
  const itemsPerPage = 3;
  
  
  useEffect(() => {
    async function fetchData() {
      const gitHubUsers = await getUsers();
      dispatch({ type: 'SET_USERS', payload: gitHubUsers });

    }
    fetchData();

  }, [])


  // Handles the main logic: fetches all followers up to given depth, computes ranking, and updates UI
  const onSubmit = useCallback(async (data) => {
    dispatch({ type: 'CLEAR', payload: [] });

    const { followerName, depth } = data;

    // Step 1: Recursively collect followers up to the specified depth
    const followers = await resolveFollowers(followerName, depth, getFollowers);

    // Step 2: Construct a full map of each user to their direct followers
    const fullMap = { [followerName]: await getFollowers(followerName) };
    for (const user of followers) {
      fullMap[user] = await getFollowers(user);
    }

    // Step 3: Calculate total follower ranks for each user (including indirect followers)
    const ranks = calculateRanks(fullMap);

    // Step 4: Enrich user data with profile details (simulated for mock API)
    const allFollowers = [followerName, ...followers];
    const enriched = enrichFollowers(allFollowers, users);

    // Step 5: Merge enriched data with calculated ranks and update state
    const ranked = enriched.map((u) => ({ ...u, followersRank: ranks[u.name] || 0 }));


    dispatch({ type: 'SET_FOLLOWERS', payload: ranked });

  });
  const handleSortChange = useCallback((e) => {
    dispatch({ type: 'SET_SORT_BY', payload: e.target.value });
  });


  const handlePageChange = useCallback((event, value) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
  });

  // Calculate visible followers for current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentUsers = followers.slice(indexOfFirst, indexOfLast);

  const sortedUsers = [...currentUsers].sort((a, b) => sortFollowers(a, b, sortBy));
  const totalItems = followers.length;
  const contextValue = useMemo(() => ({
  
    onSubmit,
    sortedUsers,
    sortBy,
    handleSortChange,
    currentPage,
    totalItems,
    itemsPerPage,
    handlePageChange
  }), [ 
    onSubmit,
    sortedUsers,
    sortBy,
    handleSortChange,
    currentPage,
    totalItems,
    itemsPerPage,
    handlePageChange]);


  return (
      <DashboardContext.Provider value={contextValue} >
        <Box sx={{ mb: 5 }}>
          <FetchForm />
        </Box>
        <CardList />
      </DashboardContext.Provider>
  );
}



export default function DashboardPageWithProvider() {
  return (
    <FormProvider>
      <DashboardPage />
    </FormProvider>
  );
}
