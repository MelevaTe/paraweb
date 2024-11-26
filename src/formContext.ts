import { createContext } from 'react';
import { FormContextType } from './types/form.types';

export const formContext = createContext<FormContextType>({
    handleChange: () => {},
    handleBlur: () => {},
    getDirty: () => false,
    errors: {},
    formValid: false
});

