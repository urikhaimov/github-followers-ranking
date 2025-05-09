import React, { useContext } from 'react';

import UserCard from '../UserCard';
import  Sorting  from '../Sorting';
import Pagination from '../Pagination';
import { DashboardContext } from '../../pages/DashboardPage/DashboardContext';

const UserList = () => {
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

export default UserList