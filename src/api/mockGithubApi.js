import MOCK_DATA from '../mock-data/followers.json';

export function getFollowers(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_DATA[username] || []);
    }, 200);
  });
}