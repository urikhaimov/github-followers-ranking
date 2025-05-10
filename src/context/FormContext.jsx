// FormContext.jsx
import { createContext } from 'react';

export const FormContext = createContext({
  register: () => {},
  handleSubmit: () => {},
  formState: { errors: {} },
  setValue: () => {},
  getValues: () => {},
  watch: () => {}
});
