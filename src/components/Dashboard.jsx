import React, { useState } from 'react';
import { getFollowers } from '../api/mockGithubApi';
import { resolveFollowers, calculateRanks } from '../utils/rankCalculator';
import UserCard from './UserCard';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [depth, setDepth] = useState(1);
  const [users, setUsers] = useState([]);
  const [usersMap, setUsersMap] = useState({});

  async function enrichUsers(usernames) {
    return usernames.map((name, idx) => ({
      login: name,
      avatar_url: `https://avatars.githubusercontent.com/u/${idx + 1}?v=4`,
      html_url: `https://github.com/${name}`,
      created_at: new Date().toISOString(),
    }));
  }

  // Handles the main logic: fetches all followers up to given depth, computes ranking, and updates UI
  const handleSubmit = async () => {
    // Step 1: Recursively collect followers up to the specified depth
    const followers = await resolveFollowers(username, depth, getFollowers);
    // Step 2: Construct a full map of each user to their direct followers
    const fullMap = { [username]: await getFollowers(username) };
    console.log("fullMap:", fullMap);
    for (const user of followers) {
      fullMap[user] = await getFollowers(user);
    }

    // Step 3: Calculate total follower ranks for each user (including indirect followers)
    const ranks = calculateRanks(fullMap);

    // Step 4: Enrich user data with profile details (simulated for mock API)
    const allUsers = [username, ...followers];
    const enriched = await enrichUsers(allUsers);

    // Step 5: Merge enriched data with calculated ranks and update state
    const ranked = enriched.map((u) => ({ ...u, followersRank: ranks[u.login] || 0 }));

    setUsers(ranked);
    setUsersMap(fullMap);
  };

  return (
    <div className='dashboard'>

      <div className='controls'>
        <div>
          <label htmlFor="username">GitHub Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter GitHub username"
          />
        </div>

        <div>
          <label htmlFor="depth">Traversal Depth (e.g. 1 or 2):</label>
          <input
            id="depth"
            type="number"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}

            min="1"
          />
        </div>
      </div>

      <button onClick={handleSubmit}>Fetch</button>
      <div>
        {users.map((user) => <UserCard key={user.login} user={user} />)}
      </div>
    </div>
  );
}
