import React, { useContext } from 'react';
import { Grid, Box } from '@mui/material';
import UserCard from '../userCard';
import Sorting from '../Sorting';
import FollowersPagination from '../FollowersPagination';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';

const CardList = () => {
  const { users } = useContext(DashboardContext)
  return (
    <>
      <Box sx={{ mb: 3 }}>
        <Sorting />
      </Box>
      <Grid container spacing={2} justifyContent="center" >
        {users.map((item, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <UserCard user={item} />
          </Grid>
        ))}
      </Grid>
      <FollowersPagination />
    </>
  );
};

export default CardList;
