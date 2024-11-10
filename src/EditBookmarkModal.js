import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const EditBookmarkModal = ({ bookmark, onSave, onClose }) => {
  const [updatedBookmark, setUpdatedBookmark] = useState(bookmark);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBookmark({ ...updatedBookmark, [name]: value });
  };

  const handleSubmit = () => {
    if (updatedBookmark.title && updatedBookmark.url) {
      onSave({
        ...updatedBookmark,
        tags: updatedBookmark.tags.split(',').map((tag) => tag.trim()), // Split tags by commas
      });
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Edit Bookmark</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          type="text"
          fullWidth
          name="title"
          value={updatedBookmark.title}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Description"
          type="text"
          fullWidth
          name="description"
          value={updatedBookmark.description}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="Tags (comma-separated)"
          type="text"
          fullWidth
          name="tags"
          value={updatedBookmark.tags.join(', ')}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="URL"
          type="url"
          fullWidth
          name="url"
          value={updatedBookmark.url}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditBookmarkModal;
