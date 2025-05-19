export const sortFollowers = (a,b, sortBy) => {
    if (sortBy === 'followerName') {
        return a?.name.localeCompare(b.name);
      } else if (sortBy === 'created_at') {
        return new Date(a.createdAt) - new Date(b?.createdAt);
      } else if (sortBy === 'followersRank') {
        return b.followersRank - a.followersRank;
      }
      return 0;
}