export function enrichUsers(usernames, users) {
  const userMap = new Map(users.map(user => [user.name, user]));
  return usernames.map((name, idx) => userMap.get(name));
}