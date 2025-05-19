import MOCK_DATA from '../../../mock-data/followers.json';
const { followers } = MOCK_DATA;
const userMap = new Map(followers && followers.map(user => [user.name, user]));


export function getUsers() {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(followers || []);
    }, 200);
  });
}


export function getFollowers(followerName) {

  return new Promise((resolve) => {
    setTimeout(() => {
      const found = userMap.get(followerName)
      resolve(found?.followers || []);
    }, 200);
  });
}



