import React, { useContext } from 'react';
import { Grid, Box, CircularProgress } from '@mui/material';
import UserCard from '../UserCard';
import Sorting from '../Sorting';
import FollowersPagination from '../FollowersPagination';
import { DashboardContext } from '../../context/DashboardContext';
import { FormContext } from '../../context/FormContext';

const CardList = () => {
  const { formState: { isSubmitting } } = useContext(FormContext);
  const { sortedUsers: followers } = useContext(DashboardContext);
  console.log('followers', followers)
  if (isSubmitting) return <CircularProgress color="inherit" />
  if (followers.length === 0) return null;
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Sorting />
      </Box>
      <Grid container spacing={2} justifyContent="center" >
        {followers.length > 0 && followers.map((item, index) => (
          <Grid key={index} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={item} />
          </Grid>
        ))}
      </Grid>
      <FollowersPagination />
    </>
  );
};

export default CardList;
