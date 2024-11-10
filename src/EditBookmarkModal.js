import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

const EditBookmarkModal = ({ bookmark, onSave, onClose }) => {
  const [updatedBookmark, setUpdatedBookmark] = useState({
    ...bookmark,
    urls: Array.isArray(bookmark.urls) ? bookmark.urls : [bookmark.url || ''],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBookmark({ ...updatedBookmark, [name]: value });
  };

  const handleUrlChange = (value) => {
    setUpdatedBookmark({ ...updatedBookmark, urls: [value] });
  };

  const handleSubmit = () => {
    if (updatedBookmark.title && updatedBookmark.urls.length > 0) {
      onSave(updatedBookmark);
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
          value={updatedBookmark.title || ''}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          label="URL"
          type="url"
          fullWidth
          name="url"
          value={updatedBookmark.urls[0] || ''}
          onChange={(e) => handleUrlChange(e.target.value)}
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