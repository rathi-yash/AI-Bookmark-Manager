import React, { useState } from 'react';
import { Box, CssBaseline, Container, Typography } from '@mui/material';
import SearchBar from './SearchBar';
import BookmarkList from './BookmarkList';
import FilterBar from './FilterBar';
import EditBookmarkModal from './EditBookmarkModal';

function App() {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      title: 'Tailwind CSS - Rapidly build modern websites',
      description:
        'Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.',
      tags: ['flex', 'css'],
      url: 'https://tailwindcss.com',
    },
    {
      id: 2,
      title: 'Svelte French Toast',
      description:
        'Buttery smooth toast notifications for Svelte. Lightweight, customizable, and beautiful by default.',
      tags: ['svelte', 'toaster'],
      url: 'https://svelte-french-toast.com',
    },
  ]);

  const [editingBookmark, setEditingBookmark] = useState(null);

  // Function to add a new bookmark
  const addBookmark = (newBookmark) => {
    setBookmarks([...bookmarks, { ...newBookmark, id: Date.now() }]);
  };

  // Function to update an existing bookmark
  const updateBookmark = (updatedBookmark) => {
    setBookmarks(
      bookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
    setEditingBookmark(null); // Close edit modal after updating
  };

  return (
    <Box>
      <CssBaseline />
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          grimoire
        </Typography>
        <SearchBar addBookmark={addBookmark} />
        <FilterBar />
        <BookmarkList
          bookmarks={bookmarks}
          onEdit={(bookmark) => setEditingBookmark(bookmark)}
        />
        {editingBookmark && (
          <EditBookmarkModal
            bookmark={editingBookmark}
            onSave={updateBookmark}
            onClose={() => setEditingBookmark(null)}
          />
        )}
      </Container>
    </Box>
  );
}

export default App;
