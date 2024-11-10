import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { Link, StarBorder, VisibilityOff, Edit } from '@mui/icons-material';

const BookmarkCard = ({ title, description, tags, url, onEdit }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        {/* Tag */}
        <Chip label="UI" color="primary" size="small" sx={{ mb: 1 }} />

        {/* Title */}
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>

        {/* Description */}
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {/* Tags */}
        <div style={{ marginTop: '8px' }}>
          {tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" sx={{ mr: 0.5 }} />
          ))}
        </div>
      </CardContent>

      {/* Actions */}
      <CardActions disableSpacing>
        {/* Open URL */}
        <IconButton aria-label="open link" href={url} target="_blank">
          <Link />
        </IconButton>

        {/* Star/Flag */}
        <IconButton aria-label="flag">
          <StarBorder />
        </IconButton>

        {/* Hide */}
        <IconButton aria-label="hide">
          <VisibilityOff />
        </IconButton>

        {/* Edit */}
        <IconButton aria-label="edit" onClick={onEdit}>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookmarkCard;
