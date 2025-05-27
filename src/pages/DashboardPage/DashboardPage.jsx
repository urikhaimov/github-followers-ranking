import React, { useReducer, useEffect, useMemo, useCallback, createContext } from 'react';
import { getUsers, getFollowers } from './api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../../utils/rankCalculator';
import { enrichFollowers } from '../../utils/enrichFollowers';
import CardList from '../../components/CardList';
import FetchForm from '../../components/FetchForm';
import { DashboardContext } from '../../context/DashboardContext';
import { reducer } from './store/Reducer';
import { initialState } from './store/initialState';
import { Box, CircularProgress } from '@mui/material';
import { sortFollowers } from '../../utils/sortFollowers';
import FormProvider from '../../context/FormProvider';

// Create a separate Context for form-related functionality
export const FormSubmitContext = createContext(null);

// Extract the FetchForm rendering into a separate component
// This prevents it from rerendering when pagination/sorting changes
const FetchFormContainer = React.memo(({ followers }) => {
  const { onSubmit } = React.useContext(FormSubmitContext);

  return (
    <Box sx={{ mb: 5 }}>
      <FetchForm followers={followers} onSubmit={onSubmit} />
    </Box>
  );
});

function DashboardPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { users, followers, sortBy, currentPage, isLoading } = state;
  const itemsPerPage = 3;

  useEffect(() => {
    async function fetchData() {
      const gitHubUsers = await getUsers();
      dispatch({ type: 'SET_USERS', payload: gitHubUsers });
    }
    fetchData();
  }, []);

  // Handles the main logic: fetches all followers up to given depth, computes ranking, and updates UI
 const onSubmit = useCallback(async (data) => {
  dispatch({ type: 'SET_LOADING' });  // Start loading

  const { followerName, depth } = data;

  const followers = await resolveFollowers(followerName, depth, getFollowers);

  const fullMap = { [followerName]: await getFollowers(followerName) };
  for (const user of followers) {
    fullMap[user] = await getFollowers(user);
  }

  const ranks = calculateRanks(fullMap);

  const allFollowers = [followerName, ...followers];
  const enriched = enrichFollowers(allFollowers, users);

  const ranked = enriched.map((u) => {
    if (u?.name) {
      return { ...u, followersRank: ranks[u?.name] }
    }
    return { ...u, followersRank: -1 }
  }).filter((u) => u.followersRank >= 0);

  // ✅ Set page number to 1 before loading followers
  dispatch({ type: 'SET_CURRENT_PAGE', payload: 1 });

  dispatch({ type: 'SET_FOLLOWERS', payload: ranked });
  dispatch({ type: 'SET_LOADED' });
}, [users]);

  const handleSortChange = useCallback((e) => {
    dispatch({ type: 'SET_SORT_BY', payload: e.target.value });
  }, []);

  const handlePageChange = useCallback((event, value) => {
    dispatch({ type: 'SET_CURRENT_PAGE', payload: value });
  }, []);

  // Calculate visible followers for current page
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentUsers = followers.slice(indexOfFirst, indexOfLast);

  const sortedUsers = useMemo(() =>
    [...currentUsers].sort((a, b) => sortFollowers(a, b, sortBy)),
    [currentUsers, sortBy]
  );

  const totalItems = followers.length;

  // The form submission context value - only includes what FetchForm needs
  const formContextValue = useMemo(() => ({
    onSubmit
  }), [onSubmit]);

  // The dashboard context value - includes everything CardList needs
  const dashboardContextValue = useMemo(() => ({
    sortedUsers,
    sortBy,
    handleSortChange,
    currentPage,
    totalItems,
    itemsPerPage,
    handlePageChange
  }), [
    sortedUsers,
    sortBy,
    handleSortChange,
    currentPage,
    totalItems,
    itemsPerPage,
    handlePageChange
  ]);

  return (
    <>
      <FormSubmitContext.Provider value={formContextValue}>
        <FetchFormContainer followers={state?.users} />
      </FormSubmitContext.Provider>

      <DashboardContext.Provider value={dashboardContextValue}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <CardList />
        )}
      </DashboardContext.Provider>
    </>
  );
}

export default function DashboardPageWithProvider() {
  return (
    <FormProvider>
      <DashboardPage />
    </FormProvider>
  );
}