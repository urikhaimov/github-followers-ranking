import React from 'react';

export default function UserCard({ user }) {
  return (
    <div className="user-card">
      <img src={user.avatar} alt={user.name} width="50" />
      <div>
        <a href={user.profileUrl} target="_blank" rel="noreferrer">{user.name}</a>
        <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
        <p>Rank: {user.followersRank}</p>
      </div>
    </div>
  );
}