import React, { useContext } from 'react';

import UserCard from '../userCard/UserCard';
import  Sorting  from '../../components/Sorting/Sorting';
import Pagination from '../../components/Pagination/Pagination';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';


export const UserList = () => {
    const { users, isSubmitting, sortBy, handleSortChange, currentPage, itemsPerPage, handlePageChange } = useContext(DashboardContext)
    return (
        <div>
            <Sorting/>

            {isSubmitting && <p>Loading..</p>}
            {users && users.map((user) => <UserCard key={user.name} user={user} />)}
            <Pagination/>
        </div>
    )
}