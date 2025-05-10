import React from 'react';
import { Typography, Box } from '@mui/material';
import DashboardPageWithProvider from './pages/DashboardPage/DashboardPage';
export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography variant="h6" component="div" >GitHub Followers Ranking Report</Typography>
      <DashboardPageWithProvider />
    </Box >
  );
}