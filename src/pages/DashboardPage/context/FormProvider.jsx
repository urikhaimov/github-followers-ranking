// FormProvider.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormContext } from './FormContext';

const FormProvider = ({ children }) => {
  const form = useForm();

  return (
    <FormContext.Provider value={form}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
