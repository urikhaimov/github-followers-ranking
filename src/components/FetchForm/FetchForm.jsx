import React, { memo, useContext } from 'react';
import { LabeledInput } from '../../ui/LabeledInput';
import { DashboardContext } from '../../context/DashboardContext';
import { FormContext } from '../../context/FormContext';
import { Box, Button } from '@mui/material';
import MuiResponsiveness from '../MuiResponsiveness/MuiResponsiveness';

const FetchForm = memo(() => {
  const { handleSubmit } = useContext(FormContext);
  const { onSubmit } = useContext(DashboardContext);
  console.log('feorm')
  return (
    <Box
      component="form"
      method="post"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        margin: 'auto',
        padding: 3,
        borderRadius: 1,
        boxShadow: 2,
        bgcolor: 'background.paper',
      }}
    >
      <MuiResponsiveness>
        <LabeledInput
          label="GitHub User Name"
          name="followerName"
          placeholder="Enter GitHub User Name"
        />
        <LabeledInput
          label="Traversal Depth (e.g. 1 or 2)"
          name="depth"
          placeholder="Enter Depth"
          type="number"
        />
        <Button type="submit" variant="contained">Fetch</Button>
      </MuiResponsiveness>
    </Box>
  );
});

export default FetchForm;
