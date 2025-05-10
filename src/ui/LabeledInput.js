import React, { useContext } from 'react';
import { Input, InputLabel } from '@mui/material';
import { DashboardContext } from '../pages/DashboardPage/DashboardContext';


export const LabeledInput = ({ label, name, placeholder, type = 'text' }) => {
    const { register } = useContext(DashboardContext)
    return (
        <>
            <InputLabel id={name}>{label}:</InputLabel>
            <Input

                {...register(name)}
                placeholder={placeholder}
                type={type}
            />
        </>
    )
}