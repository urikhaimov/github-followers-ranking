import React from 'react';
import { Box } from '@mui/material';

const MuiResponsiveness = ({ children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // column on mobile, row on desktop
        gap: 2,
        flexWrap: 'wrap', // allows wrapping when in row mode
        maxWidth: 800,
        mx: 'auto',
        mt: 4,
        px: 2,
        alignItems: 'center', // optional: aligns vertically in row layout
      }}
    >
      {children}
    </Box>
  );
};

export default MuiResponsiveness;
