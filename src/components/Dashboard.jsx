import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { getFollowers } from '../api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../utils/rankCalculator';
import UserCard from './UserCard';
import { enrichUsers } from '../utils/enrichUsers';

export default function Dashboard() {

  const [users, setUsers] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { isLoading },
  } = useForm();
  

  // Handles the main logic: fetches all followers up to given depth, computes ranking, and updates UI
  const onSubmit = async (data) => {

    const { username, depth } = data;
    console.log('data', data)
    // Step 1: Recursively collect followers up to the specified depth
    const followers = await resolveFollowers(username, depth, getFollowers);
    // Step 2: Construct a full map of each user to their direct followers
    const fullMap = { [username]: await getFollowers(username) };
    console.log('fullMap', fullMap)
    for (const user of followers) {
      fullMap[user] = await getFollowers(user);
    }

    // Step 3: Calculate total follower ranks for each user (including indirect followers)
    const ranks = calculateRanks(fullMap);

    // Step 4: Enrich user data with profile details (simulated for mock API)
    const allUsers = [username, ...followers];
    const enriched = enrichUsers(allUsers);

    // Step 5: Merge enriched data with calculated ranks and update state
    const ranked = enriched.map((u) => ({ ...u, followersRank: ranks[u.name] || 0 }));

    setUsers(ranked);

  };

  return (
    <div className='dashboard'>
      <form method='post' onSubmit={handleSubmit((data) => onSubmit(data))}>
        <div className='controls'>
          <div>
            <label htmlFor="username">GitHub Username:</label>
            <input

              {...register('username')}
              placeholder="Enter GitHub username"
            />
          </div>

          <div>
            <label htmlFor="depth">Traversal Depth (e.g. 1 or 2):</label>
            <input
              {...register('depth')}
              type="number"

            />
          </div>
        </div>

        <button type='submit'>Fetch</button>
      </form>
      <div>
        {users.map((user) => <UserCard key={user.login} user={user} />)}
      </div>
    </div>
  );
}
