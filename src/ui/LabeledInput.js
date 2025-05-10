import React, { forwardRef } from 'react';
import { TextField } from '@mui/material';

export const LabeledInput = forwardRef(({ label, ...props }, ref) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      label={label}
      inputRef={ref}
      {...props}
    />
  );
});