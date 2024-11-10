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

const SearchBar = ({ addBookmark }) => {
  const [open, setOpen] = useState(false);
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    description: '',
    tags: '',
    url: '',
  });

  // Open/Close modal
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBookmark({ ...newBookmark, [name]: value });
  };

  // Handle form submission
  const handleSubmit = () => {
    if (newBookmark.title && newBookmark.url) {
      addBookmark({
        ...newBookmark,
        tags: newBookmark.tags.split(',').map((tag) => tag.trim()), // Split tags by commas
      });
      handleClose(); // Close modal after submission
    }
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
        <TextField
          variant="outlined"
          placeholder="Search"
          InputProps={{
            startAdornment: <Search />,
          }}
          sx={{ width: '40%' }}
        />
        <Box display="flex" alignItems="center">
          <FormControlLabel control={<Checkbox defaultChecked />} label="Only unread" />
          <FormControlLabel control={<Checkbox />} label="Only flagged" />
          <Button variant="contained" startIcon={<Add />} sx={{ ml: 2 }} onClick={handleClickOpen}>
            Add Bookmark
          </Button>
        </Box>
      </Box>

      {/* Add Bookmark Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Bookmark</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            name="title"
            value={newBookmark.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            name="description"
            value={newBookmark.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Tags (comma-separated)"
            type="text"
            fullWidth
            name="tags"
            value={newBookmark.tags}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            name="url"
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
