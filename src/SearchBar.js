import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
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
    description: '',
    tags: '',
    url: '',
  });
  const [searchQuery, setSearchQuery] = useState('');

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBookmark({ ...newBookmark, [name]: value });
  };

  const handleSubmit = () => {
    if (newBookmark.title && newBookmark.url) {
      addBookmark({
        ...newBookmark,
        tags: newBookmark.tags.split(',').map((tag) => tag.trim()),
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
          sx={{ width: '40%' }}
        />
        <FormControlLabel control={<Checkbox />} label="Only unread" />
        <FormControlLabel control={<Checkbox />} label="Only flagged" />
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ ml: 2 }}
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
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={newBookmark.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="tags"
            label="Tags (comma-separated)"
            type="text"
            fullWidth
            variant="standard"
            value={newBookmark.tags}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="url"
            label="URL"
            type="url"
            fullWidth
            variant="standard"
            value={newBookmark.url}
            onChange={handleChange}
          />
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