import React, { useContext } from 'react';
import { LabeledInput } from '../../ui/LabeledInput';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';
import { FormContext } from '../../pages/DashboardPage/context/FormContext';
import { Box, Button } from '@mui/material';
import MuiResponsiveness from '../MuiResponsiveness/MuiResponsiveness';

const FetchForm = () => {
  console.log('FetchForm');
  const { handleSubmit } = useContext(FormContext);
  const { onSubmit } = useContext(DashboardContext);
  
  const { formState: { errors } } = useContext(FormContext); // ✅ get errors here

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
          required
          error={errors.followerName}
        />
        <LabeledInput
          label="Traversal Depth (e.g. 1 or 2)"
          name="depth"
          placeholder="Enter Depth"
          type="number"
          required
          error={errors.depth}
        />
        <Button type="submit" variant="contained">Fetch</Button>
      </MuiResponsiveness>
    </Box>
  );
};

export default FetchForm;
