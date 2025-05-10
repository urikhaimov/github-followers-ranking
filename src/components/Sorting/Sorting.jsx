import React, { useContext } from 'react';
import { DashboardContext } from '../../context/DashboardContext';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';


const Sorting = () => {
    const { sortBy, handleSortChange } = useContext(DashboardContext)

    return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="Sort by">Sort by</InputLabel>
            <Select
                labelId="sort-label"
                id="sort-select"
                value={sortBy}
                label="Sort by"
                onChange={handleSortChange}
            >
                <MenuItem value="">None</MenuItem>
                <MenuItem value="followerName">Follower Name</MenuItem>
                <MenuItem value="created_at">Profile Creation Date</MenuItem>
                <MenuItem value="followersRank">Follower Rank</MenuItem>
            </Select>
        </FormControl>
    )
}
export default Sorting;