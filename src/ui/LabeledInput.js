import React, { useContext } from 'react';
import { Input, InputLabel, FormHelperText, Box, FormControl } from '@mui/material';
import { FormContext } from '../context/FormContext';

export const LabeledInput = React.memo( ({ label, name, placeholder, type = 'text', required }) => {
  const { register} = useContext(FormContext);
  console.log('labeled')
  return (
    <FormControl variant="standard">
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <Input
        id={name}
        {...register(name, { required: `${label} is required` })}
        placeholder={placeholder}
        type={type}
      
      />
    
    </FormControl>
  );
});
