import MOCK_DATA from '../mock-data/followers.json';
const { users } = MOCK_DATA;
const userMap = new Map(users.map(user => [user.name, user]));

export function enrichUsers(usernames) {
    return usernames.map((name, idx) =>  userMap.get(name));
  }