export async function resolveFollowers(username, depth, getFollowers) {
  
    const visited = new Set();
    const result = new Set();
  
    async function depthSearchFollowers(user, currentDepth) {
      if (currentDepth === 0 || visited.has(user)) return;
      visited.add(user);
      const followers = await getFollowers(user);
      for (const follower of followers) {
        result.add(follower);
        await depthSearchFollowers(follower, currentDepth - 1);
      }
    }
  
    await depthSearchFollowers(username, depth);
    return Array.from(result);
  }
  
  export function calculateRanks(usersMap) {
    const ranks = {};
    
    for (const user in usersMap) {
    
      const visited = new Set();
      
      function depthSearchFollowers(u) {
        if (visited.has(u)) return;
        visited.add(u);
        const followers = usersMap[u] || [];
        for (const f of followers) depthSearchFollowers(f);
      }
  
      depthSearchFollowers(user);
      ranks[user] = visited.size - 1; // exclude self
    }
  
    return ranks;
  }
  