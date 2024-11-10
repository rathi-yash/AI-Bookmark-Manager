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
import { Edit, Delete } from '@mui/icons-material';

const BookmarkCard = ({ id, title, urls, onEdit, onDelete, onDragStart, onDragOver, onDrop }) => {
  
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
      onDrop={(e) => onDrop(e, id)}
      sx={{
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        },
        '&:active': {
          transform: 'scale(0.95)',
        },
        paddingRight: '16px', // Add right padding here
      }}
    >
      <CardContent>
        {/* Title with Bold Font, Larger Size, and Center Alignment */}
        <Typography 
          variant="h6" 
          component="div" 
          gutterBottom 
          sx={{
            paddingRight: '16px', // Add right padding
            wordBreak: 'break-word', // Ensure long text wraps
            fontSize: '1.5rem', // Increase font size
            fontWeight: 'bold', // Make font bold
            textAlign: 'center', // Center align the title
          }}
        >
          {title}
        </Typography>

        {/* List of URLs */}
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
                    sx={{
                      wordBreak: 'break-word', // Ensure URLs wrap properly
                      paddingRight: '16px', // Add right padding for URLs as well
                      color: 'black', // Change link color to black
                      textDecoration: 'none', // Remove underline from links
                      '&:hover': {
                        textDecoration: 'underline', // Optional hover effect for links
                      },
                    }}
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

      {/* Actions */}
      <CardActions>
        <IconButton 
          aria-label="edit" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onEdit(); 
          }}
        >
          <Edit />
        </IconButton>
        <IconButton 
          aria-label="delete" 
          onClick={(e) => { 
            e.stopPropagation(); 
            onDelete(id); 
          }}
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookmarkCard;
