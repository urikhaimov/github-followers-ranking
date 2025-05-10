import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';


export default function UserCard({ user }) {
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Box
          component="img"
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            objectFit: 'cover',
            boxShadow: 2,
          }}
        />

        <Typography variant="h6" component="div">
          <a
            href={user.profileUrl}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none', color: '#1976d2' }}
          >
            {user.name}
          </a>
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Created: {new Date(user.createdAt).toLocaleDateString()}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Rank: {user.followersRank}
        </Typography>
      </CardContent>

    </Card>



  );
}