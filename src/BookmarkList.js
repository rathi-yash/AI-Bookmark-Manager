import React from 'react';
import { Grid } from '@mui/material';
import BookmarkCard from './BookmarkCard';

const BookmarkList = ({ bookmarks, onEdit, onDragStart, onDragOver, onDrop }) => {
  return (
    <Grid container spacing={3} mt={3}>
      {bookmarks.map((bookmark) => (
        <Grid item xs={12} sm={6} md={4} key={bookmark.id}>
          <BookmarkCard 
            {...bookmark} 
            onEdit={() => onEdit(bookmark)}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, bookmark.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default BookmarkList;