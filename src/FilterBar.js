import React from 'react';
import { Box, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import { Sort } from '@mui/icons-material';

const FilterBar = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
      <Box display="flex" alignItems="center">
        {/* Sort Button */}
        <Button startIcon={<Sort />} variant="text">
          domain (desc)
        </Button>

        {/* Filters */}
        <FormControlLabel control={<Checkbox defaultChecked />} label="Only unread" />
        <FormControlLabel control={<Checkbox />} label="Only flagged" />
      </Box>

      {/* Showing X of Y */}
      <Typography>Showing 12 out of 13</Typography>
    </Box>
  );
};

export default FilterBar;
