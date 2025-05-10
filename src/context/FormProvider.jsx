import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from './FormContext';

const FormProvider = ({ children }) => {
  // Initialize all methods from react-hook-form
  const methods = useForm({
    mode: 'onSubmit',
    defaultValues: {
      followerName: '',
      depth: 1
    }
  });
  
  // Memoize to prevent unnecessary re-renders
  const value = useMemo(() => ({
    ...methods
  }), [methods]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;