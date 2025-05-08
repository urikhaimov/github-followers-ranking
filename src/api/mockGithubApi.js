import MOCK_DATA from '../mock-data/followers.json';
const { users } = MOCK_DATA;
const userMap = new Map(users.map(user => [user.name, user]));

export function getFollowers(username) {
 
  return new Promise((resolve) => {
    setTimeout(() => {
      const found = userMap.get(username)
      resolve(found.followers || []);
    }, 200);
  });
}



