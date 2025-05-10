import React from 'react';
import DashboardPage from './pages/DashboardPage';
import { Typography, Box } from '@mui/material';
export default function App() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
      <Typography variant="h6" component="div" >GitHub Followers Ranking Report</Typography>
      <DashboardPage />
    </Box >
  );
}