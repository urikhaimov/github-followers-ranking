import React, { memo, useContext } from 'react';
import { LabeledInput } from '../../ui/LabeledInput';
import { Box, Button } from '@mui/material';
import MuiResponsiveness from '../MuiResponsiveness/MuiResponsiveness';
import { FormContext } from '../../context/FormContext';

const FetchForm = memo(({ onSubmit }) => {
    const { handleSubmit, register } = useContext(FormContext);
    console.log('form render');

    // Create a proper handler that uses react-hook-form's handleSubmit
    const submitHandler = handleSubmit(onSubmit);

    return (
        <Box
            component="form"
            method="post"
            onSubmit={submitHandler}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                margin: 'auto',
                padding: 3,
                borderRadius: 1,
                boxShadow: 2,
                bgcolor: 'background.paper',
            }}
        >
            <MuiResponsiveness>
                <LabeledInput
                    label="GitHub User Name"
                    name="followerName"
                    placeholder="Enter GitHub User Name"
                    {...register("followerName", { required: true })}
                />
                <LabeledInput
                    label="Traversal Depth (e.g. 1 or 2)"
                    name="depth"
                    placeholder="Enter Depth"
                    type="number"
                    {...register("depth", { required: true, valueAsNumber: true })}
                />
                <Button type="submit" variant="contained">Fetch</Button>
            </MuiResponsiveness>
        </Box>
    );
});

export default FetchForm;