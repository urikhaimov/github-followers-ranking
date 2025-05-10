import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from './FormContext';

const FormProvider = ({ children }) => {
  const formMethods = useForm();
  
  const value = useMemo(() => formMethods, [formMethods]);

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
