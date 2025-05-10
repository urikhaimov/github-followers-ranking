import React, { useContext } from 'react';
import {
  Input,
  InputLabel,
  FormHelperText,
  Box,
  FormControl
} from '@mui/material';
import { DashboardContext } from '../pages/DashboardPage/DashboardContext';

export const LabeledInput = ({ label, name, placeholder, type = 'text' }) => {
    console.log('LabeledInput')
  const { errors, register } = useContext(DashboardContext);

  return (
    <FormControl error={!!errors[name]} variant="standard">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        {...register(name, { required: `${label} is required` })}
        placeholder={placeholder}
        type={type}
      />
      {errors[name] && (
        <FormHelperText>{errors[name]?.message}</FormHelperText>
      )}
    </FormControl>
  );
};
