import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Edit } from '@mui/icons-material';

const BookmarkCard = ({ title, urls, onEdit, onDragStart, onDragOver, onDrop }) => {
  
  const handleClick = () => {
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #333; }
              .url-list { padding-left: 0; list-style-type: none; }
              .url { word-break: break-all; }
            </style>
          </head>
          <body>
            <h1>${title}</h1>
            <ul class="url-list">
              ${urls.map(url => `<li class="url"><a href="${url}" target="_blank">${url}</a></li>`).join('')}
            </ul>
          </body>
        </html>
      `);
      newWindow.document.close();
    }
  };

  return (
    <Card
      onClick={handleClick}
      onDragOver={onDragOver}
      onDrop={onDrop}
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <List dense>
          {urls.map((url, index) => (
            <ListItem 
              key={index} 
              disablePadding
              draggable
              onDragStart={(e) => onDragStart(e, url)}
            >
              <ListItemText
                primary={
                  <Typography 
                    variant="body2" 
                    component="a" 
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    {url}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions>
        <IconButton aria-label="edit" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
          <Edit />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookmarkCard;