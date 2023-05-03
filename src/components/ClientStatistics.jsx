import React from 'react';
import {Typography, Box, Grid} from '@mui/material';

const ClientStatistics = ({mediaCount, favoritesCount, otherCount}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {mediaCount}
          </Typography>
          <Typography variant="subtitle1">Media Items</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {favoritesCount}
          </Typography>
          <Typography variant="subtitle1">Favorites</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: {xs: '1rem', sm: '2rem'},
            borderRadius: '0.5rem',
            backgroundColor: 'primary.main',
            color: 'background.paper',
            width: '100%',
            maxWidth: '100%',
            margin: {xs: '1rem 0', sm: '1rem'},
          }}
        >
          <Typography variant="h4" component="div">
            {otherCount}
          </Typography>
          <Typography variant="subtitle1">Other Data</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ClientStatistics;
