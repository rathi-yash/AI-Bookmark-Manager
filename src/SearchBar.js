import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { Search, Add } from '@mui/icons-material';

const SearchBar = ({ addBookmark, onSearch }) => {
  const [open, setOpen] = useState(false);
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    urls: [''],
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBookmark({ ...newBookmark, [name]: value });
  };

  const handleUrlChange = (index, value) => {
    const updatedUrls = [...newBookmark.urls];
    updatedUrls[index] = value;
    setNewBookmark({ ...newBookmark, urls: updatedUrls });
  };

  const addUrlField = () => {
    setNewBookmark({ ...newBookmark, urls: [...newBookmark.urls, ''] });
  };

  const removeUrlField = (index) => {
    const updatedUrls = newBookmark.urls.filter((_, i) => i !== index);
    setNewBookmark({ ...newBookmark, urls: updatedUrls });
  };

  const handleSubmit = () => {
    if (newBookmark.title && newBookmark.urls.some(url => url.trim() !== '')) {
      addBookmark({
        ...newBookmark,
        urls: newBookmark.urls.filter(url => url.trim() !== ''),
      });
      handleClose();
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{ flexGrow: 1, mr: 2 }}
        />
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleClickOpen}
        >
          Add Bookmark
        </Button>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Bookmark</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newBookmark.title}
            onChange={handleChange}
          />
          {newBookmark.urls.map((url, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                margin="dense"
                label={`URL ${index + 1}`}
                type="url"
                fullWidth
                variant="standard"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
              />
              <Button onClick={() => removeUrlField(index)}>Remove</Button>
            </Box>
          ))}
          <Button onClick={addUrlField}>Add URL</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SearchBar;