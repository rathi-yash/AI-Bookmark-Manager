import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import BookmarkList from './BookmarkList';
import FilterBar from './FilterBar';
import EditBookmarkModal from './EditBookmarkModal';
import { Box, CssBaseline, Container } from '@mui/material';
import logo from "./Pictures/Logo.jpg";
import './App.css';

function App() {
  const [bookmarks, setBookmarks] = useState([]);
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:9999/getClusters');
        const clusters = response.data;
        
        setBookmarks(prevBookmarks => {
          const updatedBookmarks = [...prevBookmarks];
          
          Object.entries(clusters).forEach(([title, urls]) => {
            const existingBookmarkIndex = updatedBookmarks.findIndex(
              bookmark => bookmark.title.toLowerCase() === title.toLowerCase()
            );
            
            if (existingBookmarkIndex !== -1) {
              // Append URLs to existing bookmark
              updatedBookmarks[existingBookmarkIndex].urls = [
                ...new Set([...updatedBookmarks[existingBookmarkIndex].urls, ...urls])
              ];
            } else {
              // Create new bookmark
              updatedBookmarks.push({
                id: Date.now() + Math.random(), // Generate a unique ID
                title,
                urls,
              });
            }
          });
          
          return updatedBookmarks;
        });
      } catch (error) {
        console.error('Error fetching clusters:', error);
      }
    };

    fetchClusters();
  }, []);

  const addBookmark = (newBookmark) => {
    setBookmarks(prevBookmarks => [...prevBookmarks, { ...newBookmark, id: Date.now() }]);
  };

  const updateBookmark = (updatedBookmark) => {
    setBookmarks(prevBookmarks =>
      prevBookmarks.map((bookmark) =>
        bookmark.id === updatedBookmark.id ? updatedBookmark : bookmark
      )
    );
    setEditingBookmark(null);
  };

  const deleteBookmark = (bookmarkId) => {
    setBookmarks(prevBookmarks => prevBookmarks.filter(bookmark => bookmark.id !== bookmarkId));
  };

  const handleDragStart = (e, url) => {
    e.dataTransfer.setData('text/plain', url);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetBookmarkId) => {
    e.preventDefault();
    const url = e.dataTransfer.getData('text');
    
    setBookmarks(prevBookmarks => prevBookmarks.map(bookmark => {
      if (bookmark.id === targetBookmarkId) {
        return { ...bookmark, urls: [...new Set([...bookmark.urls, url])] };
      }
      return {
        ...bookmark,
        urls: bookmark.urls.filter(bookmarkUrl => bookmarkUrl !== url)
      };
    }));
  };

  const filteredBookmarks = bookmarks.filter((bookmark) =>
    bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bookmark.urls.some(url => url.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div style={{ backgroundColor: '#D3D9D4', minHeight: '100vh', paddingTop: '20px' }}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <img src={logo} alt="MindVault Logo" style={{ height: '100px' }} />
          </Box>
          <SearchBar addBookmark={addBookmark} onSearch={setSearchQuery} />
          <FilterBar />
          <BookmarkList
            bookmarks={filteredBookmarks}
            onEdit={(bookmark) => setEditingBookmark(bookmark)}
            onDelete={deleteBookmark}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
          {editingBookmark && (
            <EditBookmarkModal
              bookmark={editingBookmark}
              onSave={updateBookmark}
              onClose={() => setEditingBookmark(null)}
            />
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;