import React from 'react';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={user.login} width="50" />
      <div>
        <a href={user.html_url} target="_blank" rel="noreferrer">{user.login}</a>
        <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
        <p>Rank: {user.followersRank}</p>
      </div>
    </div>
  );
}