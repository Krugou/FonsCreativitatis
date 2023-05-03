import {Box, Grid, Typography} from '@mui/material';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';
const ClientStatistics = ({targetId}) => {
  const [mediaCount, setMediaCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch media count, favorites count, and other count for the user
      // Replace these lines with actual API calls to fetch the data
      setMediaCount(Math.floor(Math.random() * 100));
      setFavoritesCount(Math.floor(Math.random() * 100));
      setOtherCount(Math.floor(Math.random() * 100));
    };

    fetchData();
  }, [targetId]);

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={2}>
      {/* Media count */}
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
      {/* Favorites count */}
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
      {/* Other data */}
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
ClientStatistics.propTypes = {
  targetId: PropTypes.string.isRequired,
};

export default ClientStatistics;