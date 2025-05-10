import React, { useContext } from 'react';
import { Input, InputLabel, FormHelperText, Box } from '@mui/material';
import { DashboardContext } from '../pages/DashboardPage/DashboardContext';


export const LabeledInput = ({ label, name, placeholder, type = 'text' }) => {
    const { errors, register } = useContext(DashboardContext)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1}}>
            <InputLabel id={name}>{label}:</InputLabel>
            <Input

                {...register(name, { required: `${label} is required` })} // Adding required validation
                placeholder={placeholder}
                type={type}
                helperText={errors[name] ? errors[name].message : ''} // Display error message
            />
            {errors[name] && (
                <>
                <FormHelperText error>{errors[name]?.message}</FormHelperText>
                </>
            )}
        </Box>
    )
}