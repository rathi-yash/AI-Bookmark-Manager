import React from 'react';
import { Grid } from '@mui/material';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({ bookmarks }) => {
  return (
    <Grid container spacing={3} mt={3}>
      {bookmarks.map((bookmark) => (
        <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
          <BookmarkCard {...bookmark} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookmarkList;
