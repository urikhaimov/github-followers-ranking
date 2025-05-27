import React, { memo, useContext } from 'react';
import { LabeledInput } from '../../ui/LabeledInput';
import { Autocomplete, TextField, Box, Button } from '@mui/material';
import MuiResponsiveness from '../MuiResponsiveness/MuiResponsiveness';
import { FormContext } from '../../context/FormContext';


const FetchForm = memo(({ followers, onSubmit }) => {

    const { handleSubmit, register, setValue, watch } = useContext(FormContext);
    const submitHandler = handleSubmit(onSubmit);

    // Watch the followerName field so Autocomplete stays synced with react-hook-form
    const followerNameValue = watch('followerName', '');

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
                {/* Autocomplete input */}
                <Autocomplete
                    fullWidth
                    options={followers ? followers.map(f => f.name) : []}
                    value={followerNameValue}
                    onChange={(event, newValue) => setValue('followerName', newValue || '')}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="GitHub User Name"
                            placeholder="Select or type GitHub User"
                        />
                    )}
                    freeSolo
                />

                {/* Depth input */}
                <LabeledInput
                    label="Traversal Depth (e.g. 1 or 2)"
                    name="depth"
                    placeholder="Enter Depth"
                    type="number"
                    {...register('depth', { required: true, valueAsNumber: true })}
                />

                <Button type="submit" variant="contained">Fetch</Button>
            </MuiResponsiveness>
        </Box>
    );
});

export default FetchForm;
