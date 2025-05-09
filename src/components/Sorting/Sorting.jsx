import React, { useContext } from 'react';
import './style.css';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';

const Sorting = () => {
    const {  sortBy, handleSortChange} = useContext(DashboardContext)
        
    return (<div className="sort-group">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
            <option value="">None</option>
            <option value="username">Username</option>
            <option value="created_at">Profile Creation Date</option>
            <option value="followersRank">Followers Rank</option>
        </select>
    </div>)
}
export default Sorting;